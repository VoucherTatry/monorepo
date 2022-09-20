import { useState } from 'react';

// import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { Input, Button } from 'ui';
import { string } from 'yup';

const INVALID_EMAIL_MESSAGE = 'Nieprawidłowy adres email';

const validator = {
  email: (val: string) => string().email().required().isValid(val),
};

export function LoginForm() {
  const [email, setEmail] = useState<string>('');
  const [emailInvalid, setEmailInvalid] = useState<string>();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // setLoading(true);

    const isValid = await validator.email(email);
    if (!isValid) {
      setEmailInvalid(INVALID_EMAIL_MESSAGE);
    }

    // const res = await supabaseClient.auth.signIn({ email });

    // if (res.error) {
    //   if (res.error.message === 'Signups not allowed for this instance') {
    //     setStatus({
    //       id: 'error',
    //       error: {
    //         name: 'register-disabled',
    //         message:
    //           'Rejestracja jest wyłączona dla tej strony. Skontaktuj się z administratorem w celu założenia konta.',
    //       },
    //     });
    //   } else {
    //     setStatus({ id: 'error', error: res.error });
    //   }
    // } else {
    //   setStatus({ id: 'email-sent' });
    // }

    // setLoading(false);
  }

  return (
    <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
      <Input
        label="Adres email"
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
        id="email"
        type="email"
        required
        autoFocus={true}
        autoComplete="email"
        aria-invalid={emailInvalid ? true : undefined}
        error={emailInvalid}
      />

      <Input
        label="Hasło"
        // {...inputProps('password')}
        type="password"
        id="password"
        // ref={passwordRef}
        autoComplete="new-password"
        // aria-invalid={actionData?.errors?.password ? true : undefined}
        aria-describedby="password-error"
        // disabled={disabled}
        // error={actionData?.errors?.password}
      />
      <Button type="submit">Zaloguj się</Button>
    </form>
  );
}
