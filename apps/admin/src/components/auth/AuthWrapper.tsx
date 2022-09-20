import Head from 'next/head';
import Link from 'next/link';

import Logo from '~/components/Logo';

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full max-h-screen flex-row overflow-hidden">
      <Head>
        <title key="title">Voucher Tatry - logowanie</title>
      </Head>
      <div className="flex h-full flex-1 items-start justify-center overflow-auto lg:items-center">
        <div className="flex w-full max-w-md flex-col space-y-8 overflow-auto p-8">
          <div className="flex flex-col space-y-4">
            <h1 className="text-3xl font-bold">Zaloguj się</h1>
            <p className="text-stone-500">
              Nie posiadasz jeszcze konta?{' '}
              <Link href="rejestracja" passHref>
                <a className="text-primary-500 hover:focus:underline">
                  Zarejestruj się
                </a>
              </Link>
            </p>
          </div>
          {children}
        </div>
      </div>
      <div className="hidden flex-1 items-center justify-center bg-stone-200 lg:flex">
        <div className="flex h-48 w-48 items-center">
          <Logo />
        </div>
      </div>
    </div>
  );
}
