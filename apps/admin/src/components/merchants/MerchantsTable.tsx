import { memo, useCallback, useEffect, useState } from 'react';

import {
  useToast,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  ScaleFade,
} from '@chakra-ui/react';
import { TrashIcon } from '@heroicons/react/outline';
import { PostgrestError } from '@supabase/supabase-js';
import Link from 'next/link';
import { useMutation, useQuery } from 'react-query';
import { Button, Spinner } from 'ui';

import AlertDialog from '~/components/AlertDialog';
import Table, { EmptyRow, LoadingRow } from '~/components/layouts/Table';
import { findCampaignsByMerchantId } from '~/lib/db/campaigns';
import { deleteMerchantsByIds, getAllMerchants } from '~/lib/db/merchants';
import type { Merchant } from '~/types/merchants';

const MerchantDataRow: React.FC<{
  merchant: Merchant;
  checked: boolean;
  onChecked: () => void;
}> = memo(function MerchantDataRow({ merchant, checked, onChecked }) {
  const { data: count, isLoading: campaignsCountLoading } = useQuery(
    ['campaignsCountForMerchantId', merchant.id],
    () => findCampaignsByMerchantId(merchant.id)
  );

  return (
    <Tr backgroundColor="gray.50">
      <Td className="w-16">
        <Checkbox
          colorScheme="primary"
          isChecked={checked}
          onChange={() => onChecked()}
        />
      </Td>
      <Td>
        <Link href={`/klienci/${merchant.id}`} passHref>
          <a className="btn btn-ghost text-left">
            <div className="space-y-1">
              <div className="font-bold">{merchant.name}</div>
              <div className="text-sm opacity-50">
                {merchant.phone}
                {merchant.address && merchant.phone && ' | '}
                {merchant.email}
              </div>
            </div>
          </a>
        </Link>
      </Td>
      <Td>{merchant.address}</Td>
      <Td>
        {campaignsCountLoading ? (
          <Spinner size="lg" thickness="3px" />
        ) : (
          count?.length ?? 0
        )}
      </Td>
      <Td>
        <div className="flex justify-end">
          <Link href={`/klienci/${merchant.id}`} passHref>
            <a>więcej</a>
          </Link>
        </div>
      </Td>
    </Tr>
  );
});

export function MerchantTableBody({
  merchants,
  loading,
  selectedMerchantIds,
  onMerchantChecked,
}: {
  merchants?: Merchant[];
  selectedMerchantIds: number[] | null;
  onMerchantChecked: (id: number) => void;
  loading: boolean;
}) {
  if (loading) {
    return <LoadingRow colSpan={5} />;
  }

  const emptyMerchants = !merchants || merchants.length === 0;
  if (emptyMerchants) {
    return (
      <EmptyRow
        colSpan={5}
        message="Obecnie nie posiadasz klientów którzy mogliby się tutaj pojawić. Dodaj pierwszego klienta, a pojawi się na tej liście."
      />
    );
  }

  return (
    <>
      {merchants.map((merchant) => (
        <MerchantDataRow
          checked={selectedMerchantIds?.includes(merchant.id) ?? false}
          onChecked={() => onMerchantChecked(merchant.id)}
          merchant={merchant}
          key={merchant.id}
        />
      ))}
    </>
  );
}

export default function MerchantsTable() {
  const toast = useToast();

  const { data, error, isError, isLoading } = useQuery<
    Merchant[] | null,
    PostgrestError
  >('merchants', getAllMerchants);

  const deleteMerchants = useMutation(
    'deleteMerchantsByIds',
    ({ ids }: { ids: number[] | null }) => {
      if (!ids)
        return new Promise((resolve) => {
          resolve({ error: 'No ids provided' });
        });

      return deleteMerchantsByIds(ids);
    }
  );

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedMerchantIds, setSelectedMerchantIds] = useState<
    number[] | null
  >(null);

  const errorMessage = error?.message;
  useEffect(() => {
    if (isError || errorMessage) {
      toast({
        title: 'Błąd:',
        description:
          errorMessage ?? 'Nieoczekiwany błąd. Proszę spróbować później.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isError, errorMessage, toast]);

  function showDeleteAlert() {
    setIsAlertOpen(true);
  }

  function hideDeleteAlert() {
    setIsAlertOpen(false);
  }

  const emptyData = !data || data.length === 0;

  const availableMerchantIds = data?.map((merchant) => merchant.id) ?? [];
  const selectedMerchantIdsCount = selectedMerchantIds?.length ?? 0;
  const allMerchantsChecked =
    selectedMerchantIdsCount > 0 &&
    selectedMerchantIds?.length === availableMerchantIds.length;

  const toggleMerchantId = useCallback((id: number) => {
    setSelectedMerchantIds((prev) => {
      if (prev === null) return [id];
      if (prev.includes(id)) return prev.filter((i) => i !== id);
      return [...prev, id];
    });
  }, []);

  function deleteConfirm() {
    hideDeleteAlert();
    deleteMerchants
      .mutateAsync({ ids: selectedMerchantIds })
      .then((res) => console.log(res))
      .catch((e) => console.error(e));
  }

  return (
    <>
      <Table>
        <Thead>
          <Tr className="bg-stone-300">
            <Th className="w-16 bg-stone-300">
              <Checkbox
                colorScheme="primary"
                disabled={emptyData}
                isChecked={allMerchantsChecked}
                onChange={() => {
                  if (allMerchantsChecked) {
                    setSelectedMerchantIds(null);
                  } else {
                    setSelectedMerchantIds(availableMerchantIds);
                  }
                }}
              />
            </Th>
            <Th className="bg-stone-300">Klient</Th>
            <Th className="bg-stone-300">Adres</Th>
            <Th className="bg-stone-300">Liczba kampanii</Th>
            <Th className="bg-stone-300"></Th>
          </Tr>
        </Thead>
        <Tbody>
          <MerchantTableBody
            merchants={data ?? []}
            selectedMerchantIds={selectedMerchantIds}
            onMerchantChecked={toggleMerchantId}
            loading={isLoading}
          />
        </Tbody>
      </Table>
      <div className="flex justify-between">
        <div className="flex items-center">
          <ScaleFade
            initialScale={0.9}
            in={selectedMerchantIdsCount > 0 && !isLoading}
          >
            <Button
              size="sm"
              className="btn btn-error btn-sm flex items-center space-x-2"
              onClick={showDeleteAlert}
            >
              <TrashIcon className="h-5 w-5" />
              <span>Usuń</span>
            </Button>
          </ScaleFade>
        </div>
      </div>

      {/* <div className="btn-group justify-end">
            <button className="btn">«</button>
            <button className="btn">1</button>
            <button className="btn btn-active">2</button>
            <button className="btn">3</button>
            <button className="btn">4</button>
            <button className="btn">»</button>
          </div> */}
      <AlertDialog
        isOpen={isAlertOpen}
        onCancel={hideDeleteAlert}
        onConfirm={deleteConfirm}
        variant="danger"
        text={{
          title: 'Jesteś absolutnie pewien?',
          description:
            'Usunięcie klienta nie może zostać cofnięte. Wszystkie kampanie powiązane z tym klientem zostaną również usunięte.',
          confirm: 'Rozumiem, usuń klienta',
          cancel: 'Anuluj',
        }}
      />
    </>
  );
}
