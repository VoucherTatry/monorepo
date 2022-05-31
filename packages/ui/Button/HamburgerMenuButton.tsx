import clsx from 'clsx';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import ButtonCN from './HamburgerMenuButton.module.css';

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
    className={clsx(ButtonCN.button, className)}
    onClick={onToggle}
    {...props}
  >
    <span className="sr-only">Open menu</span>
    <span
      aria-hidden="true"
      className={clsx(ButtonCN.barIcon, {
        '-translate-y-1': !isToggled,
        'rotate-45': isToggled,
      })}
    ></span>
    <span
      aria-hidden="true"
      className={clsx(ButtonCN.barIcon, {
        'translate-y-1': !isToggled,
        '-rotate-45': isToggled,
      })}
    ></span>
  </button>
);
