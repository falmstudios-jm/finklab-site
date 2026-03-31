/**
 * Generate birds-full.json — bird names + head/side SVG URLs for animations.
 * Run: npx tsx scripts/generate-birds-full.ts
 */
import { createClient } from '@supabase/supabase-js';
import { writeFileSync } from 'fs';
import { join } from 'path';

const SUPABASE_URL = 'https://owbldmllqeyehsegcvgi.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93YmxkbWxscWV5ZWhzZWdjdmdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1NDY2NTQsImV4cCI6MjA5MDEyMjY1NH0.Bo4bhklwPsYoIEjXDy-Ox1y2FZjkpw_gdsEQWJtQowQ';
const STORAGE_BASE = `${SUPABASE_URL}/storage/v1/object/public/bird-illustrations`;

function cleanPath(p: string) {
  return p.replace(/^share\//, '').replace(/\/svg\//, '/');
}

async function main() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  const { data, error } = await supabase
    .from('birds')
    .select('common_name_en, latin_name, svg_paths, abundance')
    .not('svg_paths', 'is', null);

  if (error) {
    console.error('Error:', error);
    process.exit(1);
  }

  const birds = (data ?? [])
    .filter((b) => b.svg_paths?.head || b.svg_paths?.side)
    .map((b) => ({
      name: b.common_name_en,
      latin: b.latin_name,
      head: b.svg_paths?.head ? `${STORAGE_BASE}/${cleanPath(b.svg_paths.head)}` : null,
      side: b.svg_paths?.side ? `${STORAGE_BASE}/${cleanPath(b.svg_paths.side)}` : null,
      rarity: b.abundance ?? 'common',
    }));

  const outPath = join(__dirname, '..', 'public', 'birds-full.json');
  writeFileSync(outPath, JSON.stringify(birds));
  console.log(`✅ Generated birds-full.json with ${birds.length} birds → ${outPath}`);
}

main();
