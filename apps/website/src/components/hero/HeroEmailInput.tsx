import { ReactNode, useState } from 'react';

import clsx from 'clsx';

import ButtonClassNames from '../Button.module.css';
import { Button, Input } from 'ui';

type IHeroEmailInputProps = {
  title: {
    firstLine: ReactNode;
    secondLine: ReactNode;
  };
  description: string;
  buttonText: ReactNode;
};

const HeroEmailInput = (props: IHeroEmailInputProps) => {
  const [email, setEmail] = useState('');
  const hasEmail =
    email.trim().length > 0 && email.trim() !== '' && email.includes('@');

  async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await fetch('/api/mail', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  return (
    <>
      <h1 className="whitespace-pre-line text-3xl font-bold leading-tight text-stone-900 md:text-4xl xl:text-5xl">
        {props.title.firstLine}
        {'\n'}
        {props.title.secondLine}
      </h1>
      <div className="mt-4 mb-8 text-lg md:text-xl xl:mb-16 xl:text-2xl">
        {props.description}
      </div>

      <form onSubmit={handleOnSubmit} className="flex flex-col">
        <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <label className="w-full sm:w-auto">
            <span className="sr-only">E-mail</span>
            <Input
              inputOnly={true}
              id="email"
              placeholder="Podaj swój adres email"
              type="email"
              inputMode="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <Button disabled={!hasEmail} type="submit">
            {props.buttonText}
          </Button>
        </div>
        <div className="flex justify-center py-4"></div>
        {/* <span className="text-sm">Wpisz się już dziś na listę oczekujących.</span> */}
      </form>
    </>
  );
};

export { HeroEmailInput };
