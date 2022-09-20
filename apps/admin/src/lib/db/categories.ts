import { supabaseClient } from '@supabase/auth-helpers-nextjs';

import type { Category } from '~/lib/types/categories';

export async function findCategoryById(id?: number | string) {
  return supabaseClient
    .from<Category>('categories')
    .select('*')
    .eq('id', id)
    .then((res) => res.data?.[0] ?? null);
}
