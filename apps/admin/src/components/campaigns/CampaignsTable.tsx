import { memo, useCallback } from 'react';

import { PostgrestError } from '@supabase/supabase-js';
import { formatISO9075 } from 'date-fns';
import Link from 'next/link';
import { useQuery } from 'react-query';

import ErrorAlert from '~/components/ErrorAlert';
import Spinner from '~/components/Spinner';
import { findCampaignsByMerchantId, getAllCampaigns } from '~/lib/db/campaigns';
import { useQueryFindCategoryById } from '~/lib/hooks/categories';
import { useRouterMerchantId } from '~/lib/hooks/merchants';
import type { Campaign } from '~/lib/types/campaigns';

import Table, { EmptyRow, LoadingRow } from '../layouts/Table';

const CampaignDataRow: React.FC<{
  campaign: Campaign;
  checked: boolean;
  onChecked: () => void;
}> = memo(function CampaignDataRow({ campaign, checked, onChecked }) {
  const {
    isLoading: isCategoryLoading,
    isSuccess: isCategorySuccess,
    data: category,
  } = useQueryFindCategoryById(campaign.fk_category_id);

  return (
    <tr>
      <th className="w-16">
        <label>
          <input
            type="checkbox"
            className="checkbox"
            checked={checked}
            onChange={() => onChecked()}
          />
        </label>
      </th>
      <td>
        <Link href={`/kampanie/${campaign.id}`}>
          <a className="btn btn-ghost text-left font-bold">{campaign.name}</a>
        </Link>
      </td>
      <td>{formatISO9075(new Date(campaign.date_start))}</td>
      <td>{campaign.date_end}</td>
      <td>
        {isCategoryLoading && <Spinner className="h-6 w-6" />}
        {!isCategoryLoading && isCategorySuccess && category && category.name}
        {!isCategorySuccess || (!category && 'Brak kategorii')}
      </td>
      <th>
        <div className="flex justify-end">
          <Link href={`/kampanie/${campaign.id}`}>
            <a className="btn btn-ghost btn-xs">więcej</a>
          </Link>
        </div>
      </th>
    </tr>
  );
});

function CampaignsTableBody() {
  const merchantId = useRouterMerchantId();

  const fetchCampaigns = useCallback(() => {
    if (merchantId) {
      return findCampaignsByMerchantId(merchantId);
    }
    return getAllCampaigns();
  }, [merchantId]);

  const { data, isError, error, isLoading } = useQuery<
    Campaign[] | null,
    PostgrestError
  >('campaigns', fetchCampaigns);

  if (isLoading) {
    return <LoadingRow colSpan={6} />;
  }

  const emptyCampaigns = !data || data?.length === 0;
  if (emptyCampaigns) {
    return (
      <EmptyRow
        colSpan={6}
        message="Wybrany klient nie posiadasz jeszcze kampanii które mogłyby się tutaj pojawić. Dodaj pierwszą kampanię, a pojawi się na tej liście."
      />
    );
  }

  return (
    <>
      {data.map((campaign) => (
        <CampaignDataRow
          key={campaign.id}
          campaign={campaign}
          checked={false}
          onChecked={() => {}}
        />
      ))}

      <ErrorAlert show={isError} onOpenChange={(open) => !open}>
        <span>Wystąpił błąd podczas ładowania kampanii: {error?.message}</span>
      </ErrorAlert>
    </>
  );
}

function CampaignsTable() {
  return (
    <Table>
      <thead>
        <tr className="bg-stone-300">
          <th className="w-16 bg-stone-300">
            <label>
              <input
                type="checkbox"
                className="checkbox"
                // disabled={isEmpty}
              />
            </label>
          </th>
          <th className="bg-stone-300">Nazwa</th>
          <th className="bg-stone-300">Początek</th>
          <th className="bg-stone-300">Koniec</th>
          <th className="bg-stone-300">Kategoria</th>
          <th className="bg-stone-300" />
        </tr>
      </thead>
      <tbody>
        <CampaignsTableBody />
      </tbody>
    </Table>
  );
}

export default function Campaigns() {
  return (
    <div className="space-y-6">
      <CampaignsTable />
    </div>
  );
}
