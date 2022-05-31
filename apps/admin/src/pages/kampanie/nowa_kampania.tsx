import type { AddFormState } from '~/components/campaigns/Form';
import Form from '~/components/campaigns/Form';
import WithSidebar from '~/components/layouts/WithSidebar';

const initialFormState: AddFormState = {
  name: '',
  email: '',
  address: '',
  phone: '',
};

export default function NewMerchant() {
  return (
    <WithSidebar title="Voucher Tatry - Nowy klient">
      <Form type="add" initialState={initialFormState} />
    </WithSidebar>
  );
}
