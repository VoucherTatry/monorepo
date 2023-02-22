import { useState } from "react";

import { json, redirect } from "@remix-run/node";
import { Form, useTransition } from "@remix-run/react";
import { useZorm } from "react-zorm";
import { Button, Input } from "ui";

import type { ActionFunction } from "@remix-run/node";

import { AuthFormWrapper } from "~/components/layouts/auth-form-wrapper";
import { requireAuthSession } from "~/core/auth/guards";
import { commitAuthSession } from "~/core/auth/session.server";
import { mapAuthSession } from "~/core/auth/utils/map-auth-session";
import { ProfileSchema } from "~/core/schemas";
import { createProfile } from "~/modules/user/mutations/create-profile.server";
import { assertIsPost } from "~/utils/http.server";
import { validateNIP } from "~/utils/validateNIP";

type ActionData = {
  errors?: {
    firstName?: string;
    lastName?: string;
    companyName?: string;
  };
};

export const action: ActionFunction = async ({ request }) => {
  assertIsPost(request);
  const authSession = await requireAuthSession(request);

  const formPayload = Object.fromEntries(await request.formData());

  try {
    const newProfile = ProfileSchema.parse(formPayload);

    const { organization, phone, taxId } = newProfile;

    const profile = await createProfile({
      organization,
      phone,
      taxId,
      userId: authSession.userId,
    });

    const updatedAuthSession = mapAuthSession(authSession, {
      ...authSession.user!,
      profile,
    });

    return redirect("/profile/review-pending", {
      headers: {
        "Set-Cookie": await commitAuthSession(request, {
          authSession: updatedAuthSession,
        }),
      },
    });
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));

    return json<ActionData>(
      {
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
  const [validationErrors, setValidationErrors] = useState<
    Record<"organization" | "taxId" | "phone", string | undefined>
  >({
    organization: undefined,
    taxId: undefined,
    phone: undefined,
  });
  const zo = useZorm("create-profile", ProfileSchema);
  const transition = useTransition();
  const disabled =
    transition.state === "submitting" || transition.state === "loading";

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
            required
            type="text"
            autoComplete="organization"
            id={zo.fields.organization()}
            name={zo.fields.organization()}
            error={
              zo.errors.organization()?.message ||
              validationErrors?.organization
            }
            disabled={disabled}
          />

          <Input
            label="Numer NIP"
            required
            type="text"
            pattern="[0-9]+"
            title="Numer NIP może się składać wyłącznie z cyfr"
            autoComplete="off"
            onChange={() => {
              if (validationErrors?.taxId) {
                setValidationErrors((errors) => ({
                  ...errors,
                  taxId: undefined,
                }));
              }
            }}
            onBlur={(e) => {
              if (e.target.value.trim() === "") {
                return setValidationErrors((errors) => ({
                  ...errors,
                  taxId: "Numer NIP jest polem wymaganym",
                }));
              }

              if (!validateNIP(e.target.value)) {
                return setValidationErrors((errors) => ({
                  ...errors,
                  taxId: "Nieprawidłowy numer NIP",
                }));
              }
            }}
            id={zo.fields.taxId()}
            name={zo.fields.taxId()}
            error={zo.errors.taxId()?.message || validationErrors?.taxId}
            disabled={disabled}
          />

          <Input
            label="Numer telefonu"
            required
            type="tel"
            pattern="(+48)?[0-9]{9}"
            title="Proszę podać prawidłowy numer telefonu"
            autoComplete="tel"
            id={zo.fields.phone()}
            name={zo.fields.phone()}
            error={zo.errors.phone()?.message || validationErrors?.phone}
            disabled={disabled}
          />

          <Button
            type="submit"
            size="md"
            width="w-full"
            disabled={disabled}
            loading={disabled}
          >
            Zapisz dane
          </Button>
        </Form>
      </div>
    </AuthFormWrapper>
  );
}
