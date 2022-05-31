import { UserAddIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { LinkButton } from 'ui';

import WithSidebar from '~/components/layouts/WithSidebar';
import MerchantsTable from '~/components/merchants/MerchantsTable';

export default function Merchants() {
  return (
    <WithSidebar title="Voucher Tatry - Klienci">
      <div className="space-y-8">
        <div className="flex justify-between">
          <h2 className="text-3xl">Klienci</h2>

          <Link href="/klienci/nowy_klient">
            <LinkButton sm className="space-x-1">
              <UserAddIcon className="h-6 w-6" />
              <span>Dodaj</span>
            </LinkButton>
          </Link>
        </div>
        <div className="space-y-6">
          <MerchantsTable />
        </div>
      </div>
    </WithSidebar>
  );
}
