import * as React from "react";

import { ArrowDownOnSquareIcon } from "@heroicons/react/24/outline";
import { json, redirect } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import { Form, useActionData, useTransition } from "@remix-run/react";
import { getFormData, useFormInputProps } from "remix-params-helper";
import { Button, Input } from "ui";

import { requireAuthSession } from "~/core/auth/guards";
import { commitAuthSession } from "~/core/auth/session.server";
import { assertIsPost } from "~/core/utils/http.server";
import { createProfile } from "~/modules/user/mutations/create-profile.server";
import { useMatchesData } from "~/core/hooks";
import { UserData } from "~/routes/users/$userId";
import { LocationSchema, ProfileSchema } from "~/core/schemas";
import { z } from "zod";

type ActionData = {
  errors?: Record<string, string>;
};

export const action: ActionFunction = async ({ request }) => {
  assertIsPost(request);
  const authSession = await requireAuthSession(request);

  const formPayload = Object.fromEntries(await request.formData());
  const formSchema = LocationSchema.merge(ProfileSchema);

  try {
    const newProfile = formSchema.parse(formPayload);

    const { firstName, lastName, companyName, locationId } = newProfile;

    const profile = await createProfile({
      firstName,
      lastName,
      companyName,
      userId: authSession.userId,
      locationId,
    });

    return redirect(`/users/${profile.userId}`, {
      headers: {
        "Set-Cookie": await commitAuthSession(request, { authSession }),
      },
    });
  } catch (error) {
    console.error(error);

    return json<ActionData>(
      {
        errors: error,
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

export default function NewProfilePage() {
  const actionData = useActionData() as ActionData;

  const firstNameRef = React.useRef<HTMLInputElement>(null);
  const lastNameRef = React.useRef<HTMLInputElement>(null);
  const companyNameRef = React.useRef<HTMLInputElement>(null);

  const transition = useTransition();
  const disabled =
    transition.state === "submitting" || transition.state === "loading";

  React.useEffect(() => {
    if (!actionData?.profile?.errors) return;

    // switch (Object.keys(actionData?.profile?.errors)) {
    //   case "firstName":
    //     return firstNameRef.current?.focus();
    //   case "lastName":
    //     return lastNameRef.current?.focus();
    //   case "companyName":
    //     return companyNameRef.current?.focus();
    // }

    // if (actionData?.errors?.title) {
    //   titleRef.current?.focus();
    // } else if (actionData?.errors?.body) {
    //   bodyRef.current?.focus();
    // }
  }, [actionData]);
  const profileData = useMatchesData<UserData>("routes/profiles/$profileId");
  const user = profileData?.user;

  return (
    <>
      <div className="flex items-end justify-between">
        <h2 className="text-3xl font-bold">Profil użytkownika {user?.email}</h2>

        <Button
          type="submit"
          size="sm"
        >
          <ArrowDownOnSquareIcon className="h-5 w-5" />
          <span>Zapisz</span>
        </Button>
      </div>
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
            // {...inputProps("firstName")}
            type="text"
            id="firstName"
            label="Imię"
            ref={firstNameRef}
            // error={actionData?.errors?.firstName}
            // aria-invalid={actionData?.errors?.firstName ? true : undefined}
            // aria-errormessage={
            //   actionData?.errors?.firstName ? "firstName-error" : undefined
            // }
            disabled={disabled}
          />

          <Input
            // {...inputProps("lastName")}
            type="text"
            id="lastName"
            label="Nazwisko"
            ref={lastNameRef}
            // aria-invalid={actionData?.errors?.lastName ? true : undefined}
            // aria-errormessage={
            //   actionData?.errors?.lastName ? "lastName-error" : undefined
            // }
            disabled={disabled}
          />
        </div>

        <Input
          // {...inputProps("companyName")}
          type="text"
          id="companyName"
          label="Nazwa firmy"
          ref={companyNameRef}
          // aria-invalid={actionData?.errors?.companyName ? true : undefined}
          // aria-errormessage={
          //   actionData?.errors?.companyName ? "companyName-error" : undefined
          // }
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
    </>
  );
}
