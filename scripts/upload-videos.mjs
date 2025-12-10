import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'fs';
import { resolve, basename } from 'path';
import { config } from 'dotenv';

config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const videos = [
  'public/billythelionboybookcover.mp4',
  'public/billyandblumabookcover.mp4',
  'public/secretherobookcover.mp4'
];

async function uploadVideos() {
  for (const videoPath of videos) {
    const fullPath = resolve(process.cwd(), videoPath);
    
    if (!existsSync(fullPath)) {
      console.log(`Skipping ${videoPath} - file not found`);
      continue;
    }

    const fileName = basename(videoPath);
    const fileBuffer = readFileSync(fullPath);

    console.log(`Uploading ${fileName}...`);

    const { data, error } = await supabase.storage
      .from('videos')
      .upload(fileName, fileBuffer, {
        contentType: 'video/mp4',
        upsert: true
      });

    if (error) {
      console.error(`Error uploading ${fileName}:`, error.message);
    } else {
      const { data: urlData } = supabase.storage
        .from('videos')
        .getPublicUrl(fileName);
      console.log(`Uploaded ${fileName}: ${urlData.publicUrl}`);
    }
  }
}

uploadVideos();
