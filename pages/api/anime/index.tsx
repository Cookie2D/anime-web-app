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
      .order('name', { ascending: true });

    if (error) {
      throw error;
    }
    res.status(200).json({ data, count });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
