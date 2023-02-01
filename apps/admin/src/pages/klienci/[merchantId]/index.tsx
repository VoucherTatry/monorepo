import { PencilIcon } from '@heroicons/react/outline';
import { GetStaticPropsContext } from 'next';
import Link from 'next/link';
import { dehydrate, QueryClient } from 'react-query';
import { Button, Spinner } from 'ui';

import Campaigns from '~/components/campaigns/CampaignsTable';
import WithSidebar from '~/components/layouts/WithSidebar';
import NewMerchant from '~/components/merchants/new';
import { findMerchantById } from '~/lib/db/merchants';
import {
  useQueryFindMerchantById,
  useRouterMerchantId,
} from '~/lib/hooks/merchants';
import type { DehydratedStaticProps } from '~/lib/types/common';

export default function Merchant({ ssrError }: DehydratedStaticProps) {
  const merchantId = useRouterMerchantId();
  const isNewMerchantFormPage = merchantId === 'nowy_klient';

  const {
    data: merchant,
    error,
    isLoading,
    isSuccess,
  } = useQueryFindMerchantById(merchantId, {
    enabled: !ssrError && !isNewMerchantFormPage,
  });

  if (isNewMerchantFormPage) {
    return <NewMerchant />;
  }

  if (merchant && isSuccess) {
    return (
      <WithSidebar title={`Voucher Tatry - Klient - ${merchant.name}`}>
        <div className="space-y-12">
          <div className="space-y-6">
            <div className="flex flex-col justify-between space-y-2 rounded-xl bg-stone-50 px-6 py-8 shadow-lg lg:flex-row lg:space-y-0 lg:space-x-4">
              <div className="flex items-end">
                <h2 className="text-2xl font-semibold">{merchant.name}</h2>
              </div>
              {/* <div className="divider lg:divider-horizontal" /> */}
              <div className="flex flex-col space-y-2 overflow-x-auto lg:text-right">
                <div className="flex flex-shrink-0 flex-col">
                  <span className="text-sm font-semibold">
                    Dane kontatkowe:
                  </span>
                  <span>
                    {merchant.phone}
                    {merchant.address && merchant.phone && ' | '}
                    {merchant.email}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">Adres:</span>
                  <span>{merchant.address}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end">
              <Link href={`/klienci/${merchant.id}/edytuj`}>
                <Button>
                  <PencilIcon className="h-4 w-4" />
                  <span>Edytuj dane</span>
                </Button>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Kampanie: </h3>
            <Campaigns />
          </div>
        </div>
      </WithSidebar>
    );
  }

  if (isLoading) {
    return (
      <WithSidebar title="Voucher Tatry - Klient - ładowanie">
        <div className="flex h-full items-center justify-center">
          <Spinner />
        </div>
      </WithSidebar>
    );
  }

  if (error || ssrError) {
    return (
      <WithSidebar title="Voucher Tatry - Klient - błąd">
        <span className="text-error text-2xl font-semibold">
          {ssrError && ssrError.message}
          {error && error.message}
        </span>
      </WithSidebar>
    );
  }

  return (
    <WithSidebar title="Voucher Tatry - Klient - Brak klienta">
      <span>
        Nie udało się znaleźć klienta o podanym id. Wróć do listy klientów i
        wybierz istniejącego klienta.
      </span>
    </WithSidebar>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext): Promise<{ props: DehydratedStaticProps }> {
  if (!params?.merchantId || typeof params?.merchantId !== 'string') {
    return {
      props: {
        ssrError: {
          message: 'Brak identyfikatora klienta',
          code: 'INVALID_ARGUMENT',
          details: '',
          hint: '',
        },
      },
    };
  }

  const id = params.merchantId;
  if (id === 'nowy_klient')
    return {
      props: {
        ssrError: null,
        dehydratedState: { mutations: [], queries: [] },
      },
    };

  const queryClient = new QueryClient();

  console.log('Querying by id: ', id);
  await queryClient.prefetchQuery(['findMerchantById', id], () =>
    findMerchantById(id)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ssrError: null,
    },
  };
}
