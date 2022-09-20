import React, { Ref, PropsWithChildren, ReactNode, ReactPortal } from 'react';

import clsx from 'clsx';
import ReactDOM from 'react-dom';

interface BaseProps {
  className: string;
  [key: string]: unknown;
}

export const EditorValue = React.forwardRef(function EditorValue(
  {
    className,
    value,
    ...props
  }: PropsWithChildren<
    {
      value: any;
    } & BaseProps
  >,
  ref: Ref<HTMLDivElement>
) {
  const textLines = value.document.nodes
    .map((node: any) => node.text as string)
    .toArray()
    .join('\n');
  return (
    <div ref={ref} {...props} className={clsx('-mx-5 mt-7 mb-0', className)}>
      <div className="border-t-2 border-solid border-stone-200 bg-stone-100 py-1.5 px-5 text-sm text-stone-700">
        Slate&apos;s value as text
      </div>
      <div className="space-y-1 whitespace-pre-wrap py-2.5 px-5 font-mono text-xs text-stone-700">
        {textLines}
      </div>
    </div>
  );
});

export const Instruction = React.forwardRef(function Instruction(
  { className, ...props }: PropsWithChildren<BaseProps>,
  ref: Ref<HTMLDivElement>
) {
  return (
    <div
      {...props}
      ref={ref}
      className={clsx(
        '-mx-5 mt-0 mb-2.5 whitespace-pre-wrap bg-stone-200 text-sm',
        className
      )}
    />
  );
});

export const Portal: ({
  children,
}: {
  children: ReactNode;
}) => ReactPortal | null = ({ children }) =>
  typeof document === 'object'
    ? ReactDOM.createPortal(children, document.body)
    : null;

export const Toolbar = React.forwardRef(function Toolbar(
  { className, ...props }: PropsWithChildren<BaseProps>,
  ref: Ref<HTMLDivElement>
) {
  return (
    <div
      {...props}
      ref={ref}
      className={clsx(
        'bg-base-100 mt-0 mb-5 flex items-center justify-between space-x-3 overflow-x-auto border-b-2 border-solid border-stone-300 px-4 py-2',
        className
      )}
    />
  );
});

export const Button = React.forwardRef(function Button(
  {
    className,
    active,
    ...props
  }: PropsWithChildren<
    {
      active: boolean;
    } & BaseProps
  >,
  ref: Ref<HTMLButtonElement>
) {
  return (
    <button
      type="button"
      {...props}
      ref={ref}
      className={clsx(
        {
          'rounded-lg bg-stone-300 text-stone-900 hover:opacity-90': active,
          'opacity-50 hover:opacity-70': !active,
        },
        'cursor-pointer select-none p-1 transition-all hover:scale-110',
        className
      )}
    />
  );
});
