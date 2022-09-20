import clsx from 'clsx';
import { TBorderRadius } from 'tailwindcss-classnames';

export function Alert({
  children,
  borderRadius = 'rounded',
  type,
  accent,
  icon,
}: {
  children: React.ReactNode;
  borderRadius: TBorderRadius;
  type: 'info' | 'warning' | 'success' | 'error';
  accent?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        'flex items-center space-x-4 rounded p-4',
        accent ? 'border-l-4' : 'border',
        {
          'border-sky-900/10 bg-sky-50 text-sky-700': type === 'info',
          'border-green-900/10 bg-green-50 text-green-700': type === 'success',
          'border-amber-900/10 bg-amber-50 text-amber-700': type === 'warning',
          'border-red-900/10 bg-red-50 text-red-700': type === 'error',
        },
        {
          'border-sky-700': type === 'info',
          'border-green-700': type === 'success',
          'border-amber-700': type === 'warning',
          'border-red-700': type === 'error',
        },
        borderRadius
      )}
      role="alert"
    >
      {icon && (
        <span
          className={clsx('rounded-full p-2 text-white', {
            'bg-sky-600': type === 'info',
            'bg-green-600': type === 'success',
            'bg-amber-600': type === 'warning',
            'bg-red-600': type === 'error',
          })}
        >
          {icon}
        </span>
      )}
      {children}
    </div>
  );
}
