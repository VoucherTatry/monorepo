import { memo, useCallback, useState } from 'react';

import { TrashIcon } from '@heroicons/react/outline';
import { PostgrestError } from '@supabase/supabase-js';
import Link from 'next/link';
import { useMutation, useQuery } from 'react-query';

import AlertDialog from '~/components/AlertDialog';
import ErrorAlert from '~/components/ErrorAlert';
import Table, { EmptyRow, LoadingRow } from '~/components/layouts/Table';
import Spinner from '~/components/Spinner';
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
        <Link href={`/klienci/${merchant.id}`}>
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
      </td>
      <td>{merchant.address}</td>
      <td>
        {campaignsCountLoading ? (
          <Spinner className="text-primary h-8 w-8" />
        ) : (
          count?.length ?? 0
        )}
      </td>
      <th>
        <div className="flex justify-end">
          <Link href={`/klienci/${merchant.id}`}>
            <a className="btn btn-ghost btn-xs">więcej</a>
          </Link>
        </div>
      </th>
    </tr>
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
  const { data, error, isLoading } = useQuery<
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
    deleteMerchants.mutate({ ids: selectedMerchantIds });
  }

  return (
    <>
      <Table>
        <thead>
          <tr className="bg-stone-300">
            <th className="w-16 bg-stone-300">
              <label>
                <input
                  type="checkbox"
                  className="checkbox"
                  disabled={emptyData}
                  checked={allMerchantsChecked}
                  onChange={() => {
                    if (allMerchantsChecked) {
                      setSelectedMerchantIds(null);
                    } else {
                      setSelectedMerchantIds(availableMerchantIds);
                    }
                  }}
                />
              </label>
            </th>
            <th className="bg-stone-300">Klient</th>
            <th className="bg-stone-300">Adres</th>
            <th className="bg-stone-300">Liczba kampanii</th>
            <th className="bg-stone-300"></th>
          </tr>
        </thead>
        <tbody>
          <MerchantTableBody
            merchants={data ?? []}
            selectedMerchantIds={selectedMerchantIds}
            onMerchantChecked={toggleMerchantId}
            loading={isLoading}
          />
        </tbody>
      </Table>
      <div className="flex justify-between">
        <div className="flex items-center">
          {selectedMerchantIdsCount > 0 && !isLoading && (
            <button
              className="btn btn-error btn-sm flex items-center space-x-2"
              onClick={showDeleteAlert}
            >
              <TrashIcon className="h-5 w-5" />
              <span>Usuń</span>
            </button>
          )}
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

      <ErrorAlert show={!!error} onOpenChange={(open) => !open}>
        <span>{error?.message}</span>
      </ErrorAlert>
    </>
  );
}
