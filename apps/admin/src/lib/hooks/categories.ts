import type { PostgrestError } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { useQuery, UseQueryOptions } from 'react-query';

import { findCategoryById } from '~/lib/db/categories';
import type { Category } from '~/lib/types/categories';

export function useRouterCategoryId() {
  const { query } = useRouter();

  return typeof query.categoryId === 'string' ? query.categoryId : undefined;
}

export function useQueryFindCategoryById(
  categoryId?: string | number,
  options?: Omit<
    UseQueryOptions<Category | null, PostgrestError>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery<Category | null, PostgrestError>(
    ['findCategoryById', categoryId],
    () => findCategoryById(categoryId),
    options
  );
}
