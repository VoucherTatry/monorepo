import { useState } from 'react';

import { Stack } from '@chakra-ui/react';
import { Button, Input } from 'ui';
import { string } from 'yup';

const INVALID_EMAIL_MESSAGE = 'Nieprawidłowy adres email';

const validator = {
  email: (val: string) => string().email().required().isValid(val),
};

export function MagicLinkForm({ onSubmit }: { onSubmit(): void }) {
  const [email, setEmail] = useState<string>('');
  const [emailInvalid, setEmailInvalid] = useState<string>();

  return (
    <Stack
      as="form"
      onSubmit={() => {
        onSubmit();
      }}
      spacing={2}
    >
      <Input
        name="magic-email"
        id="magic-email"
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
        required
        autoComplete="email"
        aria-invalid={emailInvalid ? true : undefined}
        error={emailInvalid}
      />
      {/* <FormControl id="password">
      <FormLabel>Password</FormLabel>
      <Input type="password" />
    </FormControl> */}
      <Stack spacing={6}>
        {/* <Stack
      direction={{ base: 'column', sm: 'row' }}
      align={'start'}
      justify={'space-between'}
      >
      <Checkbox>Remember me</Checkbox>
      <Link color={'blue.500'}>Forgot password?</Link>
    </Stack> */}
        <Button size="md" type="submit">
          Wyślij magiczny link
        </Button>
      </Stack>
    </Stack>
  );
}
