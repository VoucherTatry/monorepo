import React from 'react';

import clsx from 'clsx';

import { ComponentWithAs, PolymorphicProps } from '../PolymorphicComponent';
import { TWidth } from '../tailwind-types';

type CustomProps = {
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs';
  width?: TWidth;
};

type LinkButtonProps = CustomProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & CustomProps;

const getSizeCN = (size?: string) => {
  switch (size) {
    case 'xl':
      return 'px-5 py-4 text-lg font-bold';
    case 'lg':
      return 'px-4 py-3 text-base font-semibold';
    case 'sm':
      return 'px-2 py-1 text-sm font-medium ';
    case 'xs':
      return 'px-2 py-1 text-xs font-medium ';
    case 'md':
    default:
      return 'px-3 py-2 text-sm font-semibold';
  }
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ children, width = 'w-auto', ...props }, ref) {
    return (
      <button
        className={clsx(
          'border-primary-500 bg-primary-500 hover:border-primary-600 hover:bg-primary-600 focus:border-primary-300 focus:ring-primary-300 inline-flex cursor-pointer select-none appearance-none items-center justify-center space-x-1 rounded border text-white transition focus:outline-none focus:ring-2',
          getSizeCN(props.size),
          width
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

export const LinkButton: ComponentWithAs<'a', LinkButtonProps> =
  function LinkButton({
    children,
    width = 'w-auto',
    as,
    ...props
  }: PolymorphicProps<'a', LinkButtonProps>) {
    const Component = as || 'a';

    return (
      <Component
        className={clsx(
          'border-primary-500 bg-primary-500 hover:border-primary-600 hover:bg-primary-600 focus:border-primary-300 focus:ring-primary-300 inline-flex cursor-pointer select-none appearance-none items-center justify-center space-x-1 rounded border text-white transition focus:outline-none focus:ring-2',
          getSizeCN(props.size),
          width
        )}
        {...props}
      >
        {children}
      </Component>
    );
  };
