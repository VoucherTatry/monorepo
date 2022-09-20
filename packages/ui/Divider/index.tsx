import React from 'react';

export function Divider({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full items-center">
      <span
        aria-hidden
        className="w-full flex-shrink border-0 border-t border-stone-300"
      />
      <div className="flex-shrink-0 px-2 text-sm text-stone-600">
        {children}
      </div>
      <span
        aria-hidden
        className="w-full flex-shrink border-0 border-t border-solid border-stone-300"
      />
    </div>
  );
}
