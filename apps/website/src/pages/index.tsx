import { useMemo } from 'react';

import Image from 'next/image';
import { dehydrate, QueryClient } from 'react-query';
import { ScrollXContainer, Voucher } from 'ui';

import { PrintMarkdown } from '../components/PrintMarkdown';
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

  const hero = data?.homePage?.hero;
  const oNas = data?.homePage?.aboutSection;
  const categories = data?.homePage?.categories;
  const finalCategories = useMemo(
    () =>
      categories?.filter((cat) => {
        if (!cat) return false;
        if (!cat.kafelek) return false;

        return true;
      }),
    [categories]
  );

  const banner = data?.homePage?.banner;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Base>
      <Hero {...hero} />
      <Section
        id={slugify(oNas?.title ?? 'O nas')}
        title={oNas?.title ?? 'O nas'}
        description={
          <PrintMarkdown
            markdown={
              oNas?.description ??
              'Czym tak naprawdę jest nasza platforma? To najlepsze miejsce do odnalezienia najciekawszych ofert na spędzenie czasu w Tatrach. :)'
            }
          />
        }
      />
      {finalCategories?.map((category) => {
        if (!category) return null;

        return (
          <Section
            key={category.id}
            id={slugify(category.title)}
            title={category.title}
            titleAlign="text-left"
          >
            <ScrollXContainer>
              {PLACEHOLDER_ITEMS.map((_, index) => (
                <Voucher
                  key={index}
                  href="#"
                  isPlaceholder
                  title={category.kafelek?.title ?? category.title}
                  image={
                    <Image
                      layout="fill"
                      alt={
                        category.kafelek?.photo?.alt ??
                        category.kafelek?.title ??
                        'Zdjęcie'
                      }
                      src={category.kafelek?.photo?.url ?? ''}
                    />
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
