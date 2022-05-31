import type { PostgrestError } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { useQuery, UseQueryOptions } from 'react-query';

import { findCampaignById } from '~/lib/db/campaigns';
import type { Campaign } from '~/lib/types/campaigns';

export function useRouterCampaignId() {
  const { query } = useRouter();

  return typeof query.campaignId === 'string' ? query.campaignId : undefined;
}

export function useQueryFindCampaignById(
  campaignId?: string | number,
  options?: Omit<
    UseQueryOptions<Campaign | null, PostgrestError>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery<Campaign | null, PostgrestError>(
    ['findCampaignById', campaignId],
    () => findCampaignById(campaignId),
    options
  );
}
