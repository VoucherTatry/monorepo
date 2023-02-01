import * as React from "react";

import { ArrowDownOnSquareIcon } from "@heroicons/react/24/outline";
import { json, redirect } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import { Form, useActionData, useTransition } from "@remix-run/react";
import { Button, Input } from "ui";

import { requireAuthSession } from "~/core/auth/guards";
import { commitAuthSession } from "~/core/auth/session.server";
import { useMatchesData } from "~/core/hooks";
import { ProfileSchema } from "~/core/schemas";
import { assertIsPost } from "~/core/utils/http.server";
import { createProfile } from "~/modules/user/mutations/create-profile.server";
import type { UserData } from "~/routes/users/$userId";

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

    const { firstName, lastName, companyName } = newProfile;

    const profile = await createProfile({
      firstName,
      lastName,
      companyName,
      userId: authSession.userId,
      // locationId,
    });

    return redirect(`/users/${profile.userId}`, {
      headers: {
        "Set-Cookie": await commitAuthSession(request, { authSession }),
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

export default function NewProfile() {
  const actionData = useActionData() as ActionData;

  const firstNameRef = React.useRef<HTMLInputElement>(null);
  const lastNameRef = React.useRef<HTMLInputElement>(null);
  const companyNameRef = React.useRef<HTMLInputElement>(null);

  const transition = useTransition();
  const disabled =
    transition.state === "submitting" || transition.state === "loading";

  React.useEffect(() => {
    if (!actionData?.errors) return;

    console.error(actionData?.errors);

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

  const profileData = useMatchesData<UserData>("routes/users/$userId");
  const user = profileData?.user;

  return (
    <>
      <div className="flex items-end justify-between">
        <h2 className="text-3xl font-bold">Profil użytkownika {user?.email}</h2>
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
            type="text"
            id="firstName"
            label="Imię"
            ref={firstNameRef}
            disabled={disabled}
          />

          <Input
            type="text"
            id="lastName"
            label="Nazwisko"
            ref={lastNameRef}
            disabled={disabled}
          />
        </div>

        <Input
          type="text"
          id="companyName"
          label="Nazwa firmy"
          ref={companyNameRef}
          disabled={disabled}
        />

        <div className="text-right">
          <Button
            type="submit"
            size="md"
            disabled={disabled}
          >
            <ArrowDownOnSquareIcon className="h-5 w-5" />
            <span>Zapisz</span>
          </Button>
        </div>
      </Form>
    </>
  );
}
