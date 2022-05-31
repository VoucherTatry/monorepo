import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

import ButtonCN from './Button.module.css';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  sm?: boolean;
}

export const Button = ({ children, className, ...props }: IButton) => (
  <button
    className={clsx(ButtonCN.btn, className, {
      [`${ButtonCN.btnSm}`]: props.sm,
    })}
    {...props}
  >
    {children}
  </button>
);
