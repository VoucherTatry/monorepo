import { useState } from 'react';

import { PostgrestError } from '@supabase/supabase-js';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { object, string } from 'yup';

import ErrorAlert from '~/components/ErrorAlert';
import Input from '~/components/Input';
import PhoneInput from '~/components/PhoneInput';
import Spinner from '~/components/Spinner';
import { PHONE_REGEXP } from '~/lib/constants';
import { addMerchant, updateMerchant } from '~/lib/db/merchants';

const validationSchema = object().shape({
  name: string().required('Nazwa klienta jest wymagana'),
  address: string(),
  email: string().email('Niepoprawny adres email'),
  phone: string().matches(PHONE_REGEXP, 'Niepoprawny numer telefonu'),
});

interface FormValues {
  name: string;
  email: string;
  address: string;
  phone: string;
}

export interface AddFormState extends FormValues {}

export interface EditFormState extends FormValues {
  id: number;
}

type FormProps =
  | {
      type: 'add';
      initialState: AddFormState;
    }
  | {
      type: 'edit';
      initialState: EditFormState;
    };

export default function Form({ type, initialState }: FormProps) {
  const { push } = useRouter();

  const [formError, setFormError] = useState<PostgrestError | null>(null);

  // const {
  //   mutateAsync: add,
  //   error: addError,
  //   data: addData,
  //   isLoading: adding,
  // } = useMutation<Campaign | null, PostgrestError, AddCampaignProps>(
  //   "addMerchant",
  //   addMerchant
  // );

  async function formAction(values: FormValues) {
    switch (type) {
      case 'add':
        return addMerchant(values);
      case 'edit':
        return updateMerchant({ ...values, id: initialState.id });
      default:
        return {
          data: null,
          error: {
            code: 'internal-wrong-form',
            message: `Passed form type: ${type} doesn't exist`,
            details: '',
            hint: '',
          },
        };
    }
  }

  return (
    <>
      <Formik
        initialValues={initialState}
        validationSchema={validationSchema}
        validateOnChange={false}
        onSubmit={async (values, { setSubmitting }) => {
          const data = await formAction(values);

          // if (error) {
          //   setSubmitting(false);
          //   if (error.code === "23505") {
          //     setFormError({
          //       code: "23505",
          //       message: "Klient o podanych danych już istnieje",
          //       details: "",
          //       hint: "",
          //     });
          //   } else {
          //     setFormError(error);
          //   }
          // }

          if (!data) {
            setSubmitting(false);
            setFormError({
              code: 'internal',
              message:
                'Wystąpił niespodziewany błąd podczas dodawania klienta, spróbuj ponownie później',
              details: '',
              hint: '',
            });
          }

          if (data) {
            if (type === 'add') push('/klienci');
            if (type === 'edit') push(`/klienci/${initialState.id}`);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isValid,
          isSubmitting,
        }) => (
          <form
            className="mx-auto w-11/12 space-y-6 lg:w-4/5"
            onSubmit={handleSubmit}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl lg:text-3xl">
                {type === 'add' && 'Dodaj nowego klienta'}
                {type === 'edit' && 'Edytuj dane klienta'}
              </h2>
              {isSubmitting && <Spinner className="text-primary h-6 w-6" />}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-12">
              <Input
                label="Nazwa klienta"
                type="text"
                id="name"
                placeholder=" "
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name ? errors.name : null}
              />
              <Input
                label="Adres"
                type="text"
                id="address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.address ? errors.address : null}
              />
              <Input
                label="Email"
                type="email"
                inputMode="email"
                id="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email ? errors.email : null}
              />
              <PhoneInput
                label="Numer telefonu"
                type="text"
                inputMode="tel"
                id="phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.phone ? errors.phone : null}
              />
            </div>

            <div className="flex justify-end">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={!isValid}
              >
                {type === 'add' && 'Dodaj klienta'}
                {type === 'edit' && 'Zapisz zmiany'}
              </button>
            </div>
          </form>
        )}
      </Formik>

      <ErrorAlert
        show={!!formError}
        onOpenChange={(open) => !open && setFormError(null)}
      >
        <span>{formError?.message}</span>
      </ErrorAlert>
    </>
  );
}
