import { memo, useCallback } from 'react';

import { useToast, Thead, Tbody, Tr, Th, Td, Checkbox } from '@chakra-ui/react';
import { PostgrestError } from '@supabase/supabase-js';
import { formatISO9075 } from 'date-fns';
import Link from 'next/link';
import { useQuery } from 'react-query';
import { LinkButton, Spinner } from 'ui';

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
    <Tr backgroundColor="gray.50">
      <Td className="w-16">
        <Checkbox
          colorScheme="primary"
          checked={checked}
          onChange={() => onChecked()}
          // disabled={isEmpty}
        />
      </Td>
      <Td>
        <Link href={`/kampanie/${campaign.id}`} passHref>
          <a className="btn btn-ghost text-left font-bold">{campaign.name}</a>
        </Link>
      </Td>
      <Td>{formatISO9075(new Date(campaign.date_start))}</Td>
      <Td>{campaign.date_end}</Td>
      <Td>
        {isCategoryLoading && <Spinner size="md" />}
        {!isCategoryLoading && isCategorySuccess && category && category.name}
        {!isCategorySuccess || (!category && 'Brak kategorii')}
      </Td>
      <Td>
        <Link href={`/kampanie/${campaign.id}`} passHref>
          <LinkButton size="sm">więcej</LinkButton>
        </Link>
      </Td>
    </Tr>
  );
});

function CampaignsTableBody() {
  const toast = useToast();
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

  if (isError && !!error) {
    toast({
      title: 'Błąd:',
      description: `Wystąpił błąd podczas ładowania kampanii: ${error?.message}`,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
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
    </>
  );
}

function CampaignsTable() {
  return (
    <Table>
      <Thead>
        <Tr className="bg-stone-300">
          <Th className="w-16 bg-stone-300">
            <Checkbox
              colorScheme="primary"
              // disabled={isEmpty}
            />
          </Th>
          <Th className="bg-stone-300">Nazwa</Th>
          <Th className="bg-stone-300">Początek</Th>
          <Th className="bg-stone-300">Koniec</Th>
          <Th className="bg-stone-300">Kategoria</Th>
          <Th className="bg-stone-300" />
        </Tr>
      </Thead>
      <Tbody>
        <CampaignsTableBody />
      </Tbody>
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
