import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Validate
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Sanitize
    const sanitizedName = name.trim().slice(0, 200).replace(/<[^>]*>/g, '');
    const sanitizedEmail = email.trim().slice(0, 200);
    const sanitizedMessage = message.trim().slice(0, 5000).replace(/<[^>]*>/g, '');

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedEmail)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Store in Supabase
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { error } = await supabase.from('contact_messages').insert({
      name: sanitizedName,
      email: sanitizedEmail,
      message: sanitizedMessage,
      source: 'finklab.eu',
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: 'Failed to save message' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
