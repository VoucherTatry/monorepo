import { UserIcon } from '@heroicons/react/outline';
import { withPageAuth } from '@supabase/supabase-auth-helpers/nextjs';
import type { GetServerSideProps } from 'next';
import Link from 'next/link';

import WithSidebar from '~/components/layouts/WithSidebar';

export default function Homepage() {
  return (
    <WithSidebar title="Voucher Tatry - strona domowa">
      <div className="card card-side border-base-300 bg-base-100 border border-solid shadow-xl">
        <figure className="pl-8">
          <UserIcon className="h-20 w-20"></UserIcon>
        </figure>
        <div className="card-body">
          <h2 className="card-title">Klienci</h2>
          <p>Klinkij aby przejść do listy klientów.</p>
          <div className="card-actions justify-end">
            <Link href="/klienci">
              <a className="btn btn-primary">Idź</a>
            </Link>
          </div>
        </div>
      </div>
    </WithSidebar>
  );
}

export const getServerSideProps = withPageAuth({
  authRequired: true,
  redirectTo: '/auth',
}) as GetServerSideProps;
