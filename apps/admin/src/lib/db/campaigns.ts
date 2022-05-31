import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs';

import type { Campaign } from '~/lib/types/campaigns';

export async function findCampaignById(id?: number | string) {
  return supabaseClient
    .from<Campaign>('campaigns')
    .select('*')
    .eq('id', id)
    .then((res) => res.data?.[0] ?? null);
}

export async function getAllCampaigns() {
  return supabaseClient
    .from<Campaign>('campaigns')
    .select('*')
    .then((res) => res.data);
}

export async function findCampaignsByMerchantId(id?: number | string) {
  return supabaseClient
    .from<Campaign>('campaigns')
    .select('*')
    .eq('fk_merchant_id', id)
    .then((res) => res.data);
}
