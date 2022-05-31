import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs';
import { UserProvider } from '@supabase/supabase-auth-helpers/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import '../styles/globals.css';

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider supabaseClient={supabaseClient}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Head>
            <meta
              key="viewport"
              name="viewport"
              content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width"
            />
          </Head>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider>
    </UserProvider>
  );
}
