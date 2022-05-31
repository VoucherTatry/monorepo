import { useMemo } from 'react';

import { dehydrate, QueryClient } from 'react-query';
import { ScrollXContainer, Voucher } from 'ui';

import PrintMarkdown from '../components/PrintMarkdown';
import { useHomePageQuery } from '../generated/graphql';
import { graphqlClient } from '../graphql/client';
import { Section } from '../layout/Section';
import { Banner } from '../templates/Banner';
import { Base } from '../templates/Base';
import { Hero } from '../templates/Hero';
import { slugify } from '../utils/helpers';

const PLACEHOLDER_ITEMS = [1, 2, 3, 4, 5];

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    useHomePageQuery.getKey(),
    useHomePageQuery.fetcher(graphqlClient)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const Index = () => {
  const { data, isLoading } = useHomePageQuery(graphqlClient);

  const hero = data?.stronaDomowa?.data?.attributes?.hero;
  const oNas = data?.stronaDomowa?.data?.attributes?.oNas;
  const categories = data?.stronaDomowa?.data?.attributes?.kategorie?.data;
  const finalCategories = useMemo(
    () =>
      categories?.filter((cat) => {
        if (!cat) return;
        if (!cat.attributes) return;

        const { placeholder, vouchery } = cat.attributes;
        const hasVouchers = (vouchery?.data?.length || 0) > 0;

        if (!placeholder && !hasVouchers) return;

        // eslint-disable-next-line consistent-return
        return true;
      }),
    [categories]
  );

  const banner = data?.stronaDomowa?.data?.attributes?.baner;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Base>
      <Hero {...hero} />
      <Section
        id={slugify(oNas?.tytul ?? 'O nas')}
        title={oNas?.tytul ?? 'O nas'}
        description={
          <PrintMarkdown
            markdown={
              oNas?.opis ??
              'Czym tak naprawdę jest nasza platforma? To najlepsze miejsce do odnalezienia najciekawszych ofert na spędzenie czasu w Tatrach. :)'
            }
          />
        }
      />
      {finalCategories?.map((category) => {
        const categoryData = category?.attributes;
        if (!categoryData) return null;

        return (
          <Section
            key={category.id}
            id={slugify(categoryData.nazwa)}
            title={categoryData.nazwa}
            titleAlign="text-left"
          >
            <ScrollXContainer>
              {PLACEHOLDER_ITEMS.map((_, index) => (
                <Voucher
                  key={index}
                  href="#"
                  isPlaceholder
                  title={categoryData.placeholder?.tytul ?? categoryData.nazwa}
                  image={
                    categoryData.placeholder?.zdjecie?.data?.attributes?.url ??
                    ''
                  }
                  alt={
                    categoryData.placeholder?.zdjecie?.data?.attributes
                      ?.alternativeText ??
                    categoryData.placeholder?.tytul ??
                    'Zdjęcie'
                  }
                />
              ))}
            </ScrollXContainer>
          </Section>
        );
      })}
      {banner && <Banner {...banner} />}
    </Base>
  );
};

export default Index;
