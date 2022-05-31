import React, { useEffect, useState } from 'react';

import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs';
import { useUser } from '@supabase/supabase-auth-helpers/react';
import { ApiError } from '@supabase/supabase-js';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button, Input } from 'ui';
import { string } from 'yup';

import LogoHorizontal from '~/components/LogoHorizontal';
import Spinner from '~/components/Spinner';
import ThemeChanger from '~/components/ThemeChanger';

const INVALID_EMAIL_MESSAGE = 'Nieprawidłowy adres email';

function AuthWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="m-auto flex h-full max-w-screen-lg items-center justify-center py-12 px-0 sm:px-8 md:py-24">
      <Head>
        <title key="title">Voucher Tatry - logowanie</title>
      </Head>
      <div className="fixed top-0 left-0 z-10 box-border p-4 text-stone-900">
        <LogoHorizontal className="w-60" />
      </div>
      <div className="flex w-full flex-col items-center space-y-4 sm:space-y-4">
        <h2 className="text-2xl sm:text-3xl">Zaloguj się!</h2>
        <div className="flex h-60 w-11/12 items-center justify-center rounded-xl bg-stone-50 px-8 shadow-xl sm:w-96 sm:px-4 sm:px-12">
          {children}
        </div>
      </div>
    </div>
  );
}

const validator = {
  email: (val: string) => string().email().required().isValid(val),
};

export default function Auth() {
  const router = useRouter();
  const { user, error, isLoading } = useUser();

  const [loading, setLoading] = useState(isLoading);
  const [status, setStatus] = useState<
    { id: 'form' | 'email-sent' } | { id: 'error'; error: Error | ApiError }
  >({ id: 'form' });
  const [email, setEmail] = useState<string>('');
  const [emailInvalid, setEmailInvalid] = useState<string>();

  useEffect(() => {
    if (user !== null) router.replace('/');
  }, [user, router]);

  useEffect(() => {
    // https://github.com/supabase-community/supabase-auth-helpers/issues/114
    //@ts-expect-error if error doesn't have status, it comes from Provider and we don't want to show it
    if (error && error.status) setStatus({ id: 'error', error });
    setLoading(false);
  }, [error]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const isValid = await validator.email(email);
    if (!isValid) {
      setEmailInvalid(INVALID_EMAIL_MESSAGE);
      return;
    }

    const res = await supabaseClient.auth.signIn({ email });

    if (res.error) {
      setStatus({ id: 'error', error: res.error });
    } else {
      setStatus({ id: 'email-sent' });
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <AuthWrapper>
        <Spinner className="text-primary h-12 w-12" />
      </AuthWrapper>
    );
  }

  if (status.id === 'email-sent') {
    return (
      <AuthWrapper>
        <div className="flex flex-col space-y-4">
          <span className="pb-2">
            Na Twój adres email został wysłany link. Kliknij w niego aby się
            zalogować.
          </span>
          <Button type="button" onClick={() => setStatus({ id: 'form' })}>
            Wróć do formularza
          </Button>
        </div>
      </AuthWrapper>
    );
  }

  if (status.id === 'error') {
    return (
      <AuthWrapper>
        <div className="flex flex-col space-y-4">
          <h2 className="text-error text-center text-xl font-semibold">
            Błąd!
          </h2>
          <span className="pb-2">{status.error.message}</span>
          <Button
            type="button"
            className="btn btn-primary"
            onClick={() => setStatus({ id: 'form' })}
          >
            Wróć do formularza
          </Button>
        </div>
      </AuthWrapper>
    );
  }

  return (
    <AuthWrapper>
      <form className="w-full sm:w-2/3" onSubmit={handleSubmit}>
        <Input
          label="Email"
          required
          name="email"
          id="email"
          placeholder=" "
          value={email}
          onChange={(e) => {
            setEmailInvalid(undefined);
            setEmail(e.target.value.trim());
          }}
          onBlur={async (e) => {
            if (e.target.value.trim().length === 0) return;

            const isValid = await validator.email(e.target.value);
            if (!isValid) {
              setEmailInvalid(INVALID_EMAIL_MESSAGE);
            } else {
              setEmailInvalid(undefined);
            }
          }}
          onInvalid={(e) => {
            e.preventDefault();
            setEmailInvalid(INVALID_EMAIL_MESSAGE);
          }}
          type="email"
          inputMode="email"
          error={emailInvalid}
        />
        <div className="flex items-center justify-center">
          <Button type="submit">Wyślij magiczny link</Button>
        </div>
      </form>
    </AuthWrapper>
  );
}
