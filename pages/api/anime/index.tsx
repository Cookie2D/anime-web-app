import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';
import { AnimeListQuery } from '@/types/anime';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page = 1, limit = 10, category = null, search } = req.query as AnimeListQuery;

  const offset = (Number(page) - 1) * Number(limit);

  try {
    let query = supabase
      .from('anime_list')
      .select(
        `
        id, name, year, description, image, 
        anime_category_list!inner(
          category_id, 
          anime_categories!inner(id, slug)
        )
      `,
        { count: 'exact' }
      )
      .range(offset, offset + Number(limit) - 1)
      .order('id', { ascending: true });

    if (category) {
      query = query.eq('anime_category_list.anime_categories.slug', category);
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
    }

    const { data, error, count } = await query;

    if (error) {
      return res.status(500).json(error);
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
