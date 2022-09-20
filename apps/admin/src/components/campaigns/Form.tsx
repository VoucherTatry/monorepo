import { useState } from 'react';

import {
  FormControl,
  FormLabel,
  Heading,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { PostgrestError } from '@supabase/supabase-js';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { Button, Input, Spinner } from 'ui';
import { object, string } from 'yup';

import Editor from '~/components/Editor';
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
  const toast = useToast();
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

  function addToast(message?: string) {
    toast({
      title: 'Błąd:',
      description:
        message ??
        'Wystąpił niespodziewany błąd podczas dodawania klienta, spróbuj ponownie później',
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  }

  return (
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
          addToast();
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
        <Stack
          as="form"
          spacing={6}
          px={12}
          py={6}
          backgroundColor="gray.50"
          borderRadius="2xl"
          boxShadow="base"
          maxW="container.lg"
          // @ts-expect-error chakra falls back to html div, it doesn't change the type based on "as" prop
          onSubmit={handleSubmit}
        >
          <div className="flex items-center justify-between">
            <Heading fontSize={{ base: 'xl', lg: '3xl' }}>
              {type === 'add' && 'Dodaj nową kampanię'}
              {type === 'edit' && 'Edytuj kampanię'}
            </Heading>
            {isSubmitting && <Spinner size="md" thickness="3px" />}
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
            <Input
              label="Numer telefonu"
              type="text"
              inputMode="tel"
              id="phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.phone ? errors.phone : null}
              leftAddon="+48"
            />

            <FormControl gridColumn="1/-1">
              <FormLabel htmlFor="description">* Opis kampanii</FormLabel>
              <Editor id="description" />
            </FormControl>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={!isValid}>
              {type === 'add' && 'Dodaj kampanię'}
              {type === 'edit' && 'Zapisz zmiany'}
            </Button>
          </div>
        </Stack>
      )}
    </Formik>
  );
}
