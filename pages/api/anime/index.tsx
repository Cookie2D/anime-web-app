import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page = 1, limit = 10 } = req.query;

  const offset = (Number(page) - 1) * Number(limit);

  try {
    const { data, error, count } = await supabase
      .from('anime_list')
      .select('id, name, year, description, image', { count: 'exact' })
      .range(offset, offset + Number(limit) - 1)
      .limit(Number(limit))
      .order('id', { ascending: true });

    if (error) {
      throw error;
    }

    const animeWithUrls = await Promise.all(
      data.map(async (anime) => {
        const { data: publicUrlData } = await supabase.storage
          .from('anime-covers')
          .createSignedUrl(`cover_${anime.id}.jpg`, 60, {
            transform: { quality: 40 },
          });

        if (!publicUrlData) {
          anime.image = null;
        } else {
          anime.image = publicUrlData?.signedUrl;
        }
        return anime;
      })
    );

    res.status(200).json({ data: animeWithUrls, count });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
