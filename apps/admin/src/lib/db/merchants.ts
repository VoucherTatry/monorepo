import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs';
import type { PostgrestError } from '@supabase/supabase-js';

import type {
  AddMerchantProps,
  UpdateMerchantProps,
} from '~/lib/types/merchants';

import type { definitions } from '../types/database';

type Merchant = definitions['merchants'];

export async function getAllMerchants() {
  return supabaseClient
    .from<Merchant>('merchants')
    .select('*')
    .then((res) => res.data);
}

export async function getAllMerchantIds(): Promise<{
  ids: number[] | null;
  error: PostgrestError | null;
}> {
  const { data, error } = await supabaseClient
    .from<Merchant>('merchants')
    .select('id');

  if (error) {
    return { ids: null, error };
  }

  const ids = data.map((merchant) => merchant.id);
  return { ids, error: null };
}

export async function findMerchantById(id: number | string | undefined) {
  return supabaseClient
    .from<Merchant>('merchants')
    .select('*')
    .eq('id', id)
    .then((res) => res.data?.[0] ?? null);
}

export async function addMerchant(props: AddMerchantProps) {
  return supabaseClient
    .from<Merchant>('merchants')
    .insert({ ...props })
    .then((res) => res.data?.[0] ?? null);
}

export async function updateMerchant(props: UpdateMerchantProps) {
  return supabaseClient
    .from<Merchant>('merchants')
    .update({ ...props })
    .eq('id', props?.id)
    .then((res) => res.data?.[0] ?? null);
}

export async function deleteMerchantsByIds(ids: number[]) {
  return supabaseClient
    .from<Merchant>('merchants')
    .delete()
    .in('id', ids)
    .then((res) => res.data);
}
