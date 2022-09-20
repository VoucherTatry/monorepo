import * as React from "react";

import { json, redirect } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import { Form, useActionData, useTransition } from "@remix-run/react";
import { getFormData, useFormInputProps } from "remix-params-helper";
import { Input } from "ui";
import { z } from "zod";

import { requireAuthSession } from "~/core/auth/guards";
import { commitAuthSession } from "~/core/auth/session.server";
import { assertIsPost } from "~/core/utils/http.server";
import { createProfile } from "~/modules/user/mutations/create-profile.server";

export const ProfileFormSchema = z.object({
  firstName: z.string().min(2, "require-firstName"),
  lastName: z.string().min(2, "require-lastName"),
  companyName: z.string().min(2, "require-companyName"),
});

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
  const formValidation = await getFormData(request, ProfileFormSchema);

  if (!formValidation.success) {
    return json<ActionData>(
      {
        errors: formValidation.errors,
      },
      {
        status: 400,
        headers: {
          "Set-Cookie": await commitAuthSession(request, { authSession }),
        },
      }
    );
  }

  const { firstName, lastName, companyName } = formValidation.data;

  const profile = await createProfile({
    firstName,
    lastName,
    companyName,
    userId: authSession.userId,
  });

  return redirect(`/profile/${profile.userId}`, {
    headers: {
      "Set-Cookie": await commitAuthSession(request, { authSession }),
    },
  });
};

export default function NewProfilePage() {
  const actionData = useActionData() as ActionData;

  const firstNameRef = React.useRef<HTMLInputElement>(null);
  const lastNameRef = React.useRef<HTMLInputElement>(null);
  const companyNameRef = React.useRef<HTMLInputElement>(null);

  const inputProps = useFormInputProps(ProfileFormSchema);
  const transition = useTransition();
  const disabled =
    transition.state === "submitting" || transition.state === "loading";

  React.useEffect(() => {
    switch (actionData?.errors) {
      case "firstName":
        return firstNameRef.current?.focus();
      case "lastName":
        return lastNameRef.current?.focus();
      case "companyName":
        return companyNameRef.current?.focus();
    }
    // if (actionData?.errors?.title) {
    //   titleRef.current?.focus();
    // } else if (actionData?.errors?.body) {
    //   bodyRef.current?.focus();
    // }
  }, [actionData]);

  return (
    <Form
      method="post"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
      }}
    >
      <div className="flex space-x-2">
        <Input
          id="firstName"
          label="Imię"
          error={actionData?.errors?.firstName}
          {...inputProps("firstName")}
          ref={firstNameRef}
          aria-invalid={actionData?.errors?.firstName ? true : undefined}
          aria-errormessage={
            actionData?.errors?.firstName ? "firstName-error" : undefined
          }
          disabled={disabled}
        />

        <Input
          id="lastName"
          label="Nazwisko"
          {...inputProps("lastName")}
          ref={lastNameRef}
          aria-invalid={actionData?.errors?.lastName ? true : undefined}
          aria-errormessage={
            actionData?.errors?.lastName ? "lastName-error" : undefined
          }
          disabled={disabled}
        />
      </div>

      <Input
        id="companyName"
        label="Nazwa firmy"
        {...inputProps("companyName")}
        ref={companyNameRef}
        aria-invalid={actionData?.errors?.companyName ? true : undefined}
        aria-errormessage={
          actionData?.errors?.companyName ? "companyName-error" : undefined
        }
        disabled={disabled}
      />

      <div className="text-right">
        <button
          type="submit"
          className="rounded bg-primary-500 py-2 px-4 font-semibold text-white hover:bg-primary-600 focus:bg-primary-400"
          disabled={disabled}
        >
          Stwórz profil
        </button>
      </div>
    </Form>
  );
}
