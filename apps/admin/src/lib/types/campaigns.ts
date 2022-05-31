import type { definitions, paths } from '~/lib/types/database';

export type Campaign = definitions['campaigns'];

export type AddCampaignProps = Omit<
  paths['/campaigns']['post']['parameters']['body']['campaigns'],
  'id'
>;
export type UpdateCampaignProps =
  paths['/campaigns']['patch']['parameters']['body']['campaigns'];
