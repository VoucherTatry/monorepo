import type { PostgrestError } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { useQuery, UseQueryOptions } from 'react-query';

import { findMerchantById } from '~/lib/db/merchants';
import type { Merchant } from '~/lib/types/merchants';

export function useRouterMerchantId() {
  const { query } = useRouter();

  return typeof query.merchantId === 'string' ? query.merchantId : undefined;
}

export function useQueryFindMerchantById(
  merchantId?: string | number,
  options?: Omit<
    UseQueryOptions<Merchant | null, PostgrestError>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery<Merchant | null, PostgrestError>(
    ['findMerchantById', merchantId],
    () => findMerchantById(merchantId),
    options
  );
}
