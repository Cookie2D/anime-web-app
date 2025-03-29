import { HeaderLinks } from '@/components/share/header/types/header.types';
import { supabase } from '@/lib/supabase';

export async function getHeaderData(): Promise<HeaderLinks> {
  const { data: status = [] } = await supabase.from('anime_statuses').select();
  const { data: categories = [] } = await supabase.from('anime_categories').select('slug');

  return {
    status: status ?? [],
    categories: categories ?? [],
  };
}
