import React, { useEffect, useState } from 'react';

import { useUser } from '@supabase/auth-helpers-react';
import { ErrorPayload } from '@supabase/auth-helpers-shared';
import { useRouter } from 'next/router';
import { Button, Spinner } from 'ui';

import { AuthWrapper } from '~/components/auth/AuthWrapper';
import { LoginForm } from '~/components/auth/LoginForm';
import { MagicLinkForm } from '~/components/auth/MagicLinkForm';

export default function Auth() {
  const router = useRouter();
  const { user, error, isLoading } = useUser();

  const [loading, setLoading] = useState(isLoading);
  const [status, setStatus] = useState<
    { id: 'form' | 'email-sent' } | { id: 'error'; error: Error | ErrorPayload }
  >({ id: 'form' });

  useEffect(() => {
    if (user != null) router.replace('/');
  }, [user, router]);

  useEffect(() => {
    if (error) setStatus({ id: 'error', error });
    setLoading(false);
  }, [error]);

  if (loading) {
    return (
      <AuthWrapper>
        <div className="w-full items-center justify-center">
          <Spinner />
        </div>
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
          <Button
            size="md"
            type="button"
            onClick={() => setStatus({ id: 'form' })}
          >
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
          <h2 className="text-center text-xl font-semibold text-red-700">
            Błąd!
          </h2>
          <span className="pb-2">{status.error.message}</span>
          <Button
            size="md"
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
      <div className="flex flex-col space-y-8">
        <LoginForm />

        <div className="flex items-center">
          <span className="w-full flex-shrink border-0 border-t border-stone-300" />
          <span className="flex-shrink-0 px-2 text-sm text-stone-600">
            Kontynuuj bez hasła
          </span>
          <span className="w-full flex-shrink border-0 border-t border-solid border-stone-300" />
        </div>

        <MagicLinkForm onSubmit={() => setStatus({ id: 'email-sent' })} />
      </div>
    </AuthWrapper>
  );
}
