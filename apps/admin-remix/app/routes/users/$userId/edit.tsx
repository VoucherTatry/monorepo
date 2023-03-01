import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useTransition } from "@remix-run/react";
import { useZorm } from "react-zorm";
import { Button, Input } from "ui";

import type { ActionFunction } from "@remix-run/node";
import type { ZodError } from "zod";
import type { UserData } from "~/routes/users/$userId";

import { useMatchesData } from "~/hooks";
import { requireAuthSession } from "~/modules/auth";
import { commitAuthSession } from "~/modules/auth/session.server";
import { updateProfile } from "~/modules/profile/mutations";
import { ProfileSchema } from "~/schemas";
import { assertIsPost } from "~/utils/http.server";

type ActionData = {
  errors?: ZodError<typeof ProfileSchema._type>;
};

export const action: ActionFunction = async ({ request }) => {
  assertIsPost(request);
  const authSession = await requireAuthSession(request);

  const formPayload = Object.fromEntries(await request.formData());
  // const formSchema = ProfileSchema.merge(LocationSchema);

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

    const { organization, taxId, phone } = newProfile.data;

    const profile = await updateProfile({
      organization,
      taxId,
      phone,
      userId: authSession.userId,
      // locationId,
    });

    return redirect(`/users/${profile.userId}`, {
      headers: {
        "Set-Cookie": await commitAuthSession(request, {
          authSession: {
            ...authSession,
            user: { ...authSession.user, profile },
          },
        }),
      },
    });
  } catch (error) {
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

export default function EditProfile() {
  const actionData = useActionData() as ActionData;
  const zo = useZorm("create-profile", ProfileSchema);
  const transition = useTransition();
  const loading =
    transition.state === "submitting" || transition.state === "loading";
  const invalid = zo.validation?.success === false;
  const disabled = loading || invalid;

  const fieldErrors = actionData?.errors?.formErrors.fieldErrors;

  const profileData = useMatchesData<UserData>("routes/users/$userId");
  const user = profileData?.user;

  return (
    <>
      <div className="flex items-end justify-between">
        <h2 className="text-3xl font-bold">Profil użytkownika {user?.email}</h2>
      </div>
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
            fieldErrors?.organization?.join(", ")
          }
          disabled={loading}
        />

        <Input
          label="Numer NIP"
          required
          type="text"
          pattern="[0-9]+"
          maxLength={6}
          title="Numer NIP może się składać wyłącznie z cyfr"
          autoComplete="off"
          id={zo.fields.taxId()}
          name={zo.fields.taxId()}
          error={zo.errors.taxId()?.message || fieldErrors?.taxId?.join(", ")}
          disabled={loading}
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
          error={zo.errors.phone()?.message || fieldErrors?.phone?.join(", ")}
          disabled={loading}
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
    </>
  );
}
