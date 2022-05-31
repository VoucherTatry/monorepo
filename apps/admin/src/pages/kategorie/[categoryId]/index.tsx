import { formatISO9075 } from 'date-fns';
import { GetStaticPropsContext } from 'next';
import { dehydrate, QueryClient } from 'react-query';

import WithSidebar from '~/components/layouts/WithSidebar';
import Spinner from '~/components/Spinner';
import { findCampaignById } from '~/lib/db/campaigns';
import {
  useQueryFindCampaignById,
  useRouterCampaignId,
} from '~/lib/hooks/campaigns';
import { useQueryFindCategoryById } from '~/lib/hooks/categories';
import type { DehydratedStaticProps } from '~/lib/types/common';

export default function Campaigns({ ssrError }: DehydratedStaticProps) {
  const campaignId = useRouterCampaignId();

  const {
    isLoading,
    isSuccess,
    error,
    data: campaign,
  } = useQueryFindCampaignById(campaignId);

  const {
    isLoading: isCategoryLoading,
    isSuccess: isCategorySuccess,
    data: category,
  } = useQueryFindCategoryById(campaign?.fk_category_id);

  if (campaign && isSuccess) {
    return (
      <WithSidebar title={`Kampanie - ${campaign.name}`}>
        <div className="flex flex-col space-y-6 px-3 py-4 lg:space-y-12 lg:px-6 lg:py-8">
          <div className="flex flex-col justify-between space-y-6 lg:flex-row lg:space-y-0">
            <div className="flex items-end justify-between lg:space-x-3">
              <h2 className="text-2xl font-semibold">{campaign.name}</h2>
              <span className="text-right opacity-80 lg:text-left">
                {isCategoryLoading && <Spinner className="h-6 w-6" />}

                {!isCategoryLoading &&
                  isCategorySuccess &&
                  category &&
                  category.name}

                {!isCategorySuccess || (!category && 'Brak kategorii')}
              </span>
            </div>
            <div className="flex items-center space-x-3 text-lg">
              <span>{formatISO9075(new Date(campaign.date_start))}</span>
              <span>-</span>
              {campaign.date_end && (
                <span>{formatISO9075(new Date(campaign.date_end))}</span>
              )}
              {!campaign.date_end && <span>Do odwołania</span>}
            </div>
          </div>
          <div className="flex w-full flex-col space-y-6 lg:mx-auto lg:w-3/5 lg:space-y-12">
            <div className="relative mx-auto h-60 w-[25rem] max-w-full overflow-hidden rounded-md bg-gray-300">
              <div className="absolute bottom-0 flex h-16 w-full items-center bg-black opacity-60">
                <span className="ml-auto flex space-x-1 px-4 text-right text-3xl font-bold text-white">
                  <span>{campaign.price}</span>
                  <span className="self-end text-xl">zł</span>
                </span>
              </div>
            </div>
            <div className="flex flex-col space-y-8">
              <div className="flex flex-col space-y-2">
                <h3 className="text-xl font-semibold opacity-60">Informacje</h3>
                <p>{campaign.description}</p>
              </div>
            </div>
          </div>
          <div>
            <div className="divider divider-vertical" />
            <h3 className="text-xl font-semibold">Wygenerowane vouchery</h3>
          </div>
        </div>
      </WithSidebar>
    );
  }

  if (isLoading) {
    return (
      <WithSidebar title="Kampanie - ładowanie">
        <div className="flex h-full items-center justify-center">
          <Spinner className="text-primary h-12 w-12" />
        </div>
      </WithSidebar>
    );
  }

  if (error || ssrError) {
    return (
      <WithSidebar title="Kampanie - błąd">
        <span className="text-error text-2xl font-semibold">
          {ssrError && ssrError.message}
          {error && error.message}
        </span>
      </WithSidebar>
    );
  }

  return (
    <WithSidebar title="Kampanie - brak kampanii">
      <span>Nie udało się znaleźć kampanii</span>
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
  if (!params?.campaignId || typeof params?.campaignId !== 'string') {
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

  const id = params.campaignId;

  const queryClient = new QueryClient();
  queryClient.prefetchQuery(['findCampaignById', id], () =>
    findCampaignById(id)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ssrError: null,
    },
  };
}
