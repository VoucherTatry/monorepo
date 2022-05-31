import clsx from 'clsx';

import ButtonClassNames from './Button.module.css';

type ILinkButtonProps = {
  xl?: boolean;
  children: string;
};

const LinkButton = (props: ILinkButtonProps) => {
  const btnClass = clsx(
    ButtonClassNames.btn,
    ButtonClassNames['btn-primary'],
    props.xl && ButtonClassNames['btn-xl'],
    !props.xl && ButtonClassNames['btn-base']
  );

  return <div className={btnClass}>{props.children}</div>;
};

export { LinkButton };
