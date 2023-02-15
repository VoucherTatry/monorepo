import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useTransition } from "@remix-run/react";
import { useZorm } from "react-zorm";
import { Button, Input } from "ui";

import { AuthFormWrapper } from "~/components/layouts/auth-form-wrapper";
import { requireAuthSession } from "~/core/auth/guards";
import { commitAuthSession } from "~/core/auth/session.server";
import { mapAuthSession } from "~/core/auth/utils/map-auth-session";
import { ProfileSchema } from "~/core/schemas";
import { createProfile } from "~/modules/user/mutations/create-profile.server";
import { assertIsPost } from "~/utils/http.server";

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
  // const formSchema = ProfileSchema.merge(LocationSchema);

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
  const zo = useZorm("create-profile", ProfileSchema);
  const transition = useTransition();
  const disabled =
    transition.state === "submitting" || transition.state === "loading";

  return (
    <AuthFormWrapper
      title="Uzupełnij swój profil"
      subtitle="Do prawidłowego funkcjonowania platformy potrzebujemy kilka danych."
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
            error={zo.errors.organization()?.message}
            disabled={disabled}
          />

          <Input
            label="Numer NIP"
            required
            type="text"
            autoComplete="off"
            id={zo.fields.taxId()}
            name={zo.fields.taxId()}
            error={zo.errors.taxId()?.message}
            disabled={disabled}
          />

          <Input
            label="Numer telefonu"
            required
            type="tel"
            autoComplete="tel"
            id={zo.fields.phone()}
            name={zo.fields.phone()}
            error={zo.errors.phone()?.message}
            disabled={disabled}
          />

          <Button
            type="submit"
            size="md"
            width="w-full"
            disabled={disabled}
          >
            Zapisz dane
          </Button>
        </Form>
      </div>
    </AuthFormWrapper>
  );
}
