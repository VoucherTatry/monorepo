import clsx from 'clsx';
import { AnchorHTMLAttributes } from 'react';

import ButtonCN from './Button.module.css';

interface ILinkButton extends AnchorHTMLAttributes<HTMLAnchorElement> {
  sm?: boolean;
}

export const LinkButton = ({ className, ...props }: ILinkButton) => (
  <a
    className={clsx(ButtonCN.btn, className, {
      [`${ButtonCN.btnSm}`]: props.sm,
    })}
    {...props}
  >
    {props.children}
  </a>
);
