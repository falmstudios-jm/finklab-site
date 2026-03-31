import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// In-memory rate limiting (per IP, 5 submissions per 10 minutes)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

export async function POST(request: Request) {
  try {
    // Rate limiting by IP
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0]?.trim() ?? 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const body = await request.json();
    const { name, email, message, website } = body;

    // Honeypot field — if filled, it's a bot
    if (website) {
      // Silently accept to not reveal the trap
      return NextResponse.json({ success: true });
    }

    // Validate required fields
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    // Sanitize
    const sanitizedName = name.trim().slice(0, 200).replace(/<[^>]*>/g, '');
    const sanitizedEmail = email.trim().slice(0, 200).toLowerCase();
    const sanitizedMessage = message.trim().slice(0, 5000).replace(/<[^>]*>/g, '');

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedEmail)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    // Block obvious spam patterns
    if (/https?:\/\//i.test(sanitizedMessage) && sanitizedMessage.length < 100) {
      return NextResponse.json({ success: true }); // Silent accept
    }

    // Store in Supabase
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { error } = await supabase.from('contact_messages').insert({
      name: sanitizedName,
      email: sanitizedEmail,
      message: sanitizedMessage,
      source: 'finklab.eu',
      ip_address: ip,
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: 'Failed to save message.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
