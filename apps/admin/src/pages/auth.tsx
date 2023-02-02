import Link from 'next/link';
import { Button, Input } from 'ui';

import { AuthLayout } from '~/components/auth-layout';

const Auth = () => (
  <AuthLayout>
    <div className="flex w-full max-w-md flex-col space-y-8 md:justify-center">
      <div className="flex flex-col space-y-4">
        <h1 className="text-4xl font-bold">Witaj na platformie VoucherTatry</h1>

        <p className="text-stone-500 space-x-2">
          Podaj swój adres email aby założyć konto lub się zalogować. W obu
          wypadkach na Twój adres email zostanie wysłane jednorazowe hasło
          potrzebne w celu dalszej weryfikacji.
        </p>
      </div>

      <form method="post" className="space-y-6">
        <div className="flex flex-col space-y-2">
          <Input
            type="email"
            required
            autoComplete="email"
            name="email"
            id="magic-link"
            // disabled={disabled}
            inputOnly
          />

          {/* <Input
            label="Hasło"
            {...inputProps('password')}
            type="password"
            id="password"
            ref={passwordRef}
            autoComplete="new-password"
            aria-invalid={actionData?.errors?.password ? true : undefined}
            aria-describedby="password-error"
            disabled={disabled}
            error={actionData?.errors?.password}
          /> */}
        </div>

        <input
          type="hidden"
          name="redirectTo"
          // value={redirectTo}
        />
        <Button
          width="w-full"
          size="md"
          type="submit"
          // disabled={disabled}
        >
          Wyślij jednorazowe hasło
        </Button>
      </form>
    </div>
  </AuthLayout>
);

export default Auth;
