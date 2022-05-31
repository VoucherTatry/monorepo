import WithSidebar from '~/components/layouts/WithSidebar';
import type { AddFormState } from '~/components/merchants/Form';
import Form from '~/components/merchants/Form';

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
