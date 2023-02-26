import React from 'react';

import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  error?: string;
  id: string;
  helperText?: string;
  inputOnly?: boolean;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      error,
      id,
      label,
      helperText,
      inputOnly = false,
      leftAddon,
      rightAddon,
      ...props
    },
    ref
  ) {
    const ERROR_MESSAGE = `error-${id}`;

    return (
      <div className="w-full space-y-0.5">
        {/* isInvalid={!!error} */}
        {!inputOnly && label && (
          <label className="text-sm font-medium text-stone-900" htmlFor={id}>
            {label}
          </label>
        )}
        <div className="relative">
          {leftAddon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5 w-7 h-full">
              {leftAddon}
            </div>
          )}
          <input
            aria-describedby={ERROR_MESSAGE}
            aria-invalid={!!error}
            aria-errormessage={error ?? undefined}
            ref={ref}
            className={clsx(
              'block w-full rounded-md transition px-9',
              'focus:ring-2 focus:ring-offset-1',
              'disabled:cursor-not-allowed disabled:bg-stone-300 disabled:opacity-75 ',
              {
                'border-stone-300 focus:border-primary-500 focus:ring-primary-300':
                  !error,
                'border-red-600 focus:border-red-600 focus:ring-red-300':
                  !!error,
              }
            )}
            id={id}
            name={props.name ?? id}
            {...props}
          />
          {rightAddon && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 w-7 h-full">
              {rightAddon}
            </div>
          )}
        </div>
        {!inputOnly &&
          (error ? (
            <div id={``} className="text-xs text-red-600">
              {error}
            </div>
          ) : (
            <div className="text-xs">{helperText || <>&nbsp;</>}</div>
          ))}
      </div>
    );
  }
);

interface ExtendedCheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label: React.ReactNode;
  showLabel?: boolean;
}

export function Checkbox({
  label,
  showLabel = false,
  ...rest
}: React.PropsWithChildren<ExtendedCheckboxProps>) {
  return (
    <label>
      <span className={clsx({ 'sr-only': !showLabel })}>{label}</span>
      <input
        className="text-primary-500 focus:ring-primary-500 h-5 w-5 cursor-pointer rounded border-stone-300 transition disabled:cursor-not-allowed disabled:bg-stone-200 disabled:opacity-75"
        type="checkbox"
        {...rest}
      />
    </label>
  );
}
