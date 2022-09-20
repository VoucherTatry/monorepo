import { ButtonHTMLAttributes } from 'react';

import clsx from 'clsx';

interface IHamburgerMenuButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  isToggled: boolean;
  onToggle: () => void;
}

export const HamburgerMenuButton = ({
  isToggled,
  onToggle,
  className,
  ...props
}: IHamburgerMenuButton) => (
  <button
    className={clsx('relative z-10 h-6 w-6 flex-shrink-0', className)}
    onClick={onToggle}
    {...props}
  >
    <span className="sr-only">Open menu</span>
    <span
      aria-hidden="true"
      className={clsx(
        'absolute block h-0.5 w-6 transform bg-current transition duration-500 ease-in-out',
        {
          '-translate-y-1': !isToggled,
          'rotate-45': isToggled,
        }
      )}
    ></span>
    <span
      aria-hidden="true"
      className={clsx(
        'absolute block h-0.5 w-6 transform bg-current transition duration-500 ease-in-out',
        {
          'translate-y-1': !isToggled,
          '-rotate-45': isToggled,
        }
      )}
    ></span>
  </button>
);
