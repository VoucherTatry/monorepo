import Form from '~/components/campaigns/Form';
import WithSidebar from '~/components/layouts/WithSidebar';

const initialFormState: {
  category: string;
  placeholder: { photo: string; title: string };
} = {
  category: '',
  placeholder: {
    photo: '',
    title: '',
  },
};

export default function NewMerchant() {
  return (
    <WithSidebar title="Voucher Tatry - Nowa kategoria">
      <Form type="add" initialState={initialFormState} />
    </WithSidebar>
  );
}
