import React from 'react';

import { InformationCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

import type { TBackgroundColor, TPadding } from '../../tailwind-types';
import { Alert, Spinner } from '../index';

export const LoadingRow: React.FC<{ colSpan?: number }> = function LoadingRow({
  colSpan,
}) {
  return (
    <tr>
      <td colSpan={colSpan} className="p-5 text-center">
        <div className="flex items-center justify-center p-1.5">
          <Spinner className="m-auto" size="md" />
        </div>
      </td>
    </tr>
  );
};

export const EmptyRow: React.FC<{ message: string; colSpan?: number }> =
  function EmptyRow({ message, colSpan }) {
    return (
      <tr className="bg-stone-50">
        <td colSpan={colSpan} className="p-5">
          <Alert
            icon={<InformationCircleIcon className="h-5 w-5" />}
            type="info"
            borderRadius="rounded-2xl"
          >
            <span>{message}</span>
          </Alert>
        </td>
      </tr>
    );
  };

interface ITHead
  extends Omit<React.HTMLAttributes<HTMLTableSectionElement>, 'className'> {
  className?: Omit<string, TBackgroundColor>;
}

export const THead: React.FC<ITHead> = function THead({
  children,
  className,
  ...rest
}) {
  return (
    <thead className={clsx('bg-stone-300', className)} {...rest}>
      <tr>{children}</tr>
    </thead>
  );
};

interface ITr
  extends Omit<React.HTMLAttributes<HTMLTableRowElement>, 'className'> {
  className?: Omit<string, 'group' | TBackgroundColor>;
}

export const Tr: React.FC<ITr> = function Tr({ children, className, ...rest }) {
  return (
    <tr className={clsx('group bg-white odd:bg-stone-50', className)} {...rest}>
      {children}
    </tr>
  );
};

interface ITd
  extends Omit<React.TdHTMLAttributes<HTMLTableDataCellElement>, 'className'> {
  padding?: TPadding;
  className?: Omit<string, TPadding>;
}

export const Td: React.FC<ITd> = function Td({
  padding = 'p-4',
  children,
  className,
  ...rest
}) {
  return (
    <td className={clsx(padding, className)} {...rest}>
      {children}
    </td>
  );
};

interface ITh extends React.ThHTMLAttributes<HTMLTableHeaderCellElement> {
  menu?: React.ReactNode;
}

export const Th: React.FC<ITh> = function Th({
  children,
  menu,
  colSpan,
  ...rest
}) {
  return (
    <th
      colSpan={colSpan}
      className="whitespace-nowrap p-4 text-left font-bold text-stone-900"
      {...rest}
    >
      <div className="flex items-center">
        {children}
        {menu && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-1.5 h-4 w-4 text-stone-700"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
    </th>
  );
};

export const Table: React.FC<{ children: React.ReactNode }> = function Table({
  children,
}) {
  return (
    <div className="overflow-x-auto rounded-2xl shadow">
      <table className="min-w-full divide-y divide-stone-300 overflow-hidden rounded-2xl text-sm">
        {children}
      </table>
    </div>
  );
};
