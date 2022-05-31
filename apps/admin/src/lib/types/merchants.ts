import type { definitions, paths } from '~/lib/types/database';

export type Merchant = definitions['merchants'];

export type AddMerchantProps = Omit<
  paths['/merchants']['post']['parameters']['body']['merchants'],
  'id'
>;
export type UpdateMerchantProps =
  paths['/merchants']['patch']['parameters']['body']['merchants'];
