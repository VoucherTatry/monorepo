import type { definitions, paths } from '~/lib/types/database';

export type Category = definitions['categories'];

export type AddCampaignProps = Omit<
  paths['/categories']['post']['parameters']['body']['categories'],
  'id'
>;
export type UpdateCampaignProps =
  paths['/categories']['patch']['parameters']['body']['categories'];
