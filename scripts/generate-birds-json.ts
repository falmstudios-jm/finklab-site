/**
 * Generate birds.json — a list of bird head SVG URLs from Supabase.
 * Run: npx tsx scripts/generate-birds-json.ts
 */
import { createClient } from '@supabase/supabase-js';
import { writeFileSync } from 'fs';
import { join } from 'path';

const SUPABASE_URL = 'https://owbldmllqeyehsegcvgi.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93YmxkbWxscWV5ZWhzZWdjdmdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1NDY2NTQsImV4cCI6MjA5MDEyMjY1NH0.Bo4bhklwPsYoIEjXDy-Ox1y2FZjkpw_gdsEQWJtQowQ';

const STORAGE_BASE = `${SUPABASE_URL}/storage/v1/object/public/bird-illustrations`;

async function main() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  const { data, error } = await supabase
    .from('birds')
    .select('svg_paths')
    .not('svg_paths', 'is', null);

  if (error) {
    console.error('Error fetching birds:', error);
    process.exit(1);
  }

  const urls: string[] = [];

  for (const bird of data ?? []) {
    const headPath = bird.svg_paths?.head ?? bird.svg_paths?.side ?? bird.svg_paths?.full;
    if (!headPath) continue;
    const cleanPath = headPath.replace(/^share\//, '').replace(/\/svg\//, '/');
    urls.push(`${STORAGE_BASE}/${cleanPath}`);
  }

  const outPath = join(__dirname, '..', 'public', 'birds.json');
  writeFileSync(outPath, JSON.stringify(urls, null, 0));
  console.log(`✅ Generated birds.json with ${urls.length} bird URLs → ${outPath}`);
}

main();
