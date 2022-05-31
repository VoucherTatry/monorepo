import clsx from 'clsx';

import InputCN from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  error?: string | null;
  id: string;
}

export function Input({ error, id, label, ...props }: InputProps) {
  return (
    <div className={InputCN.formControl}>
      <label htmlFor={id} className={InputCN.label}>
        {label}
      </label>
      <input
        className={clsx(InputCN.input, {
          [`${InputCN.primary}`]: !error,
          [`${InputCN.error}`]: error,
        })}
        id={id}
        name={props.name ?? id}
        {...props}
      />
      <div className="absolute -bottom-1 h-8 w-full text-right">
        {error && <span className={InputCN.errorText}>{error}</span>}
      </div>
    </div>
  );
}
