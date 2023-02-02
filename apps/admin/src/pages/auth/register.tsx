import Link from 'next/link';
import { Button, Input } from 'ui';

import { AuthLayout } from '~/components/auth-layout';

const Register = () => (
  <AuthLayout>
    <div className="flex w-full max-w-md flex-col space-y-8 md:justify-center">
      <div className="flex flex-col space-y-4">
        <h1 className="text-4xl font-bold">Zaloguj się</h1>

        <p className="text-stone-500 space-x-2">
          <span>Posiadasz konto?</span>
          <Link
            className="text-primary-500 hover:underline focus:text-primary-400"
            href="/auth/login"
          >
            Zaloguj się
          </Link>
        </p>
      </div>

      <form method="post" className="space-y-6">
        <div className="flex flex-col space-y-2">
          <Input
            label="Adres email"
            // {...inputProps('email')}
            // ref={emailRef}
            id="email"
            type="email"
            required
            autoComplete="email"
            // aria-invalid={actionData?.errors?.email ? true : undefined}
            aria-describedby="email-error"
            // disabled={disabled}
            // error={actionData?.errors?.email}
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
          type="submit"
          // disabled={disabled}
        >
          Zaloguj się
        </Button>
      </form>
    </div>
  </AuthLayout>
);

export default Register;
