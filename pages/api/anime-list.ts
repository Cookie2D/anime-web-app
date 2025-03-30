import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';
import { supabase } from '@/lib/supabase';

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const result: string[] = [];
  try {
    // Fetch the first 1000 anime records where cover_image is null
    const { data, error } = await supabase
      .from('anime_list')
      .select('image, id, cover_image')
      .is('cover_image', 'null')
      .order('id', { ascending: true })
      .limit(1000);

    if (error) {
      throw error;
    }

    // Loop through each anime and fetch the image
    for (let anime of data) {
      const imageUrl = `cover_${anime.id}.jpg`;
      console.time(imageUrl);
      const imageResponse = await fetch(anime.image);
      if (!imageResponse.ok) {
        result.push(`image not found for ${imageUrl}`);
        console.timeEnd(imageUrl);
        continue;
      }
      const imageBuffer = await imageResponse.buffer();

      const { data: existingImage } = await supabase.storage.from('anime-covers').info(imageUrl);

      // If the image already exists, we can either skip the upload or replace the file
      if (existingImage) {
        const { error: updateDbError } = await supabase
          .from('anime_list')
          .update({ cover_image: imageUrl })
          .eq('id', anime.id);
        continue; // You can also replace the image here if desired
      }

      // Upload the image to Supabase storage if it doesn't exist
      const { error: uploadError } = await supabase.storage
        .from('anime-covers')
        .upload(imageUrl, imageBuffer, {
          contentType: 'image/jpeg',
        });

      if (uploadError) {
        console.error(`Failed to upload image for anime ID ${anime.id}:`, uploadError.message);
        result.push(`Failed to upload image for anime ID ${anime.id}:`, uploadError.message);
        continue;
      }

      const { error: updateDbError } = await supabase
        .from('anime_list')
        .update({ cover_image: imageUrl })
        .eq('id', anime.id);

      if (updateDbError) {
        console.error(`Failed to update anime record for ID ${anime.id}:`, updateDbError.message);
        result.push(`Failed to update anime record for ID ${anime.id}:`, updateDbError.message);
      } else {
        result.push(`Image ${imageUrl} uploaded successfully`);
        console.timeEnd(imageUrl);
      }
    }

    result.push('Images uploaded successfully');
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
