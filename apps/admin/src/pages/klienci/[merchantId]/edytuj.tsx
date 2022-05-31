import { GetStaticPropsContext } from 'next';
import { dehydrate, QueryClient } from 'react-query';

import WithSidebar from '~/components/layouts/WithSidebar';
import type { EditFormState } from '~/components/merchants/Form';
import Form from '~/components/merchants/Form';
import Spinner from '~/components/Spinner';
import { findMerchantById } from '~/lib/db/merchants';
import {
  useQueryFindMerchantById,
  useRouterMerchantId,
} from '~/lib/hooks/merchants';
import type { DehydratedStaticProps } from '~/lib/types/common';

export default function EditMerchant({ ssrError }: DehydratedStaticProps) {
  const merchantId = useRouterMerchantId();

  const {
    isSuccess,
    isLoading,
    data: merchant,
    error,
  } = useQueryFindMerchantById(merchantId);

  if (merchant && isSuccess) {
    return (
      <WithSidebar title={`Voucher Tatry - Edycja klienta - ${merchant.name}`}>
        <Form type="edit" initialState={merchant as EditFormState} />
      </WithSidebar>
    );
  }

  if (isLoading) {
    return (
      <WithSidebar title="Voucher Tatry - Edycja klienta - ładowanie">
        <div className="flex h-full items-center justify-center">
          <Spinner className="text-primary h-12 w-12" />
        </div>
      </WithSidebar>
    );
  }

  if (error || ssrError) {
    return (
      <WithSidebar title="Voucher Tatry - Edycja klienta - błąd">
        <span className="text-error text-2xl font-semibold">
          {ssrError && ssrError.message}
          {error && error.message}
        </span>
      </WithSidebar>
    );
  }

  return (
    <WithSidebar title="Voucher Tatry - Klient - Brak klienta">
      <span>Wystąpił nieoczekiwany błąd. Nic tutaj nie znaleziono.</span>
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
  if (typeof params?.merchantId !== 'string') {
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

  const queryClient = new QueryClient();

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
