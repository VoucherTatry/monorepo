import { InformationCircleIcon } from '@heroicons/react/outline';

import Spinner from '../Spinner';

export const LoadingRow: React.FC<{ colSpan: number }> = function LoadingRow({
  colSpan,
}) {
  return (
    <tr>
      <td colSpan={colSpan} className="text-center">
        <div className="p-1.5">
          <Spinner className="text-primary m-auto h-8 w-8" />
        </div>
      </td>
    </tr>
  );
};

export const EmptyRow: React.FC<{ message: string; colSpan: number }> =
  function EmptyRow({ message, colSpan }) {
    return (
      <tr>
        <td colSpan={colSpan} className="text-center">
          <div className="alert alert-sm">
            <div>
              <InformationCircleIcon className="h-6 w-6" />
              <span>{message}</span>
            </div>
          </div>
        </td>
      </tr>
    );
  };

const Table = function Table({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-theme="light"
      className="w-full overflow-x-auto rounded-md border border-solid border-stone-300"
    >
      <table className="table w-full">{children}</table>
    </div>
  );
};

export default Table;
