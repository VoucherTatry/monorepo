import { dehydrate, QueryClient } from 'react-query';

import PrintMarkdown from '../components/PrintMarkdown';
import { useRegulaminQuery } from '../generated/graphql';
import { graphqlClient } from '../graphql/client';
import { Section } from '../layout/Section';
import { Base } from '../templates/Base';

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    useRegulaminQuery.getKey(),
    useRegulaminQuery.fetcher(graphqlClient)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function Regulamin() {
  const { data, isLoading } = useRegulaminQuery(graphqlClient);

  const sections = data?.page?.sections;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Base>
      <h2 className="text-center text-3xl font-black">Regulamin</h2>
      {sections?.map((section, idx) => {
        if (!section) {
          return idx === 0 ? 'Regulamin w trakcie budowy' : null;
        }

        return (
          <Section
            key={section.id}
            title={section.title}
            description={
              <div className="prose mx-auto text-left">
                <PrintMarkdown markdown={section.description.markdown} />
              </div>
            }
          />
        );
      })}
    </Base>
  );
}
