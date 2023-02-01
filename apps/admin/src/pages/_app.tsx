import { Suspense, useState } from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import Head from 'next/head';
// import { chakraTheme } from 'ui';

import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <QueryClientProvider client={queryClient} contextSharing={true}>
        <Hydrate state={pageProps.dehydratedState}>
          <Head>
            <meta
              key="viewport"
              name="viewport"
              content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width"
            />
          </Head>
          <ChakraProvider>
            <Suspense fallback={<div>Loading...</div>}>
              <Component {...pageProps} />
            </Suspense>
          </ChakraProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider>
    </SessionContextProvider>
  );
}
