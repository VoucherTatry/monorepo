import { PhoneIcon } from "@heroicons/react/24/outline";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useTransition } from "@remix-run/react";
import { useZorm } from "react-zorm";
import { Button, Input } from "ui";

import type { ActionFunction } from "@remix-run/node";
import type { ZodError } from "zod";

import { requireAuthSession } from "~/modules/auth";
import { AuthFormWrapper } from "~/modules/auth/components/auth-form-wrapper";
import { mapAuthSession } from "~/modules/auth/mappers";
import { commitAuthSession } from "~/modules/auth/session.server";
import { createProfile } from "~/modules/profile/mutations";
import { phoneRegExp, ProfileSchema } from "~/schemas";
import { assertIsPost } from "~/utils/http.server";

type ActionData = {
  errors?: ZodError<typeof ProfileSchema._type>;
};

export const action: ActionFunction = async ({ request }) => {
  assertIsPost(request);
  const authSession = await requireAuthSession(request);

  const formPayload = Object.fromEntries(await request.formData());

  try {
    const newProfile = ProfileSchema.safeParse(formPayload);

    if (!newProfile.success) {
      throw json<ActionData>(
        {
          errors: newProfile.error,
        },
        {
          status: 400,
          headers: {
            "Set-Cookie": await commitAuthSession(request, { authSession }),
          },
        }
      );
    }

    const { organization, phone, taxId } = newProfile.data;

    const profile = await createProfile({
      organization,
      phone,
      taxId,
      userId: authSession.userId,
    });

    const updatedAuthSession = await mapAuthSession({
      ...authSession,
      user: {
        ...authSession.user!,
        profile,
      },
    });

    return redirect("/profile/review/pending", {
      headers: {
        "Set-Cookie": await commitAuthSession(request, {
          authSession: updatedAuthSession,
        }),
      },
    });
  } catch (error: unknown) {
    return json<ActionData>(
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        errors: error as any,
      },
      {
        status: 400,
        headers: {
          "Set-Cookie": await commitAuthSession(request, { authSession }),
        },
      }
    );
  }
};

export default function CreateProfile() {
  const actionData = useActionData<ActionData>();
  const zo = useZorm("create-profile", ProfileSchema);
  const transition = useTransition();
  const loading =
    transition.state === "submitting" || transition.state === "loading";
  const invalid = zo.validation?.success === false;
  const disabled = loading || invalid;

  const fieldErrors = actionData?.errors?.formErrors.fieldErrors;

  return (
    <AuthFormWrapper
      title="Uzupełnij swój profil"
      subtitle="Do poprawnego zweryfikowania i aktywacji Twojego konta, potrzebujemy poniższych danych."
    >
      <div className="mx-auto w-full">
        <Form
          method="post"
          className="space-y-2"
          ref={zo.ref}
          replace
        >
          <Input
            label="Nazwa firmy"
            // required
            type="text"
            autoComplete="organization"
            id={zo.fields.organization()}
            name={zo.fields.organization()}
            error={
              zo.errors.organization()?.message ||
              fieldErrors?.organization?.join(", ")
            }
            disabled={loading}
          />

          <Input
            label="Numer NIP"
            type="text"
            pattern="[\s\-\d]+"
            maxLength={10}
            title="Numer NIP może się składać wyłącznie z cyfr"
            autoComplete="off"
            id={zo.fields.taxId()}
            name={zo.fields.taxId()}
            error={zo.errors.taxId()?.message || fieldErrors?.taxId?.join(", ")}
            disabled={loading}
          />

          <Input
            label="Numer telefonu"
            type="tel"
            pattern={phoneRegExp.source}
            title="Proszę podać prawidłowy numer telefonu"
            autoComplete="tel"
            id={zo.fields.phone()}
            name={zo.fields.phone()}
            error={zo.errors.phone()?.message || fieldErrors?.phone?.join(", ")}
            disabled={loading}
            leftAddon={<PhoneIcon className="text-stone-500" />}
          />

          <Button
            type="submit"
            size="md"
            width="w-full"
            disabled={disabled}
            loading={loading}
          >
            Zapisz dane
          </Button>
        </Form>
      </div>
    </AuthFormWrapper>
  );
}
