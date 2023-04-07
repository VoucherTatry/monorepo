import * as React from "react";

import { Decimal } from "@prisma/client/runtime";
import { json, redirect } from "@remix-run/node";
import { Form, useTransition } from "@remix-run/react";
import { parseFormAny, useZorm } from "react-zorm";
import { Input } from "ui";
import { z } from "zod";

import type { Location } from "@prisma/client";
import type { ActionFunction } from "@remix-run/node";

import { requireAuthSession } from "~/modules/auth";
import { commitAuthSession } from "~/modules/auth/session.server";
import { createCampaign } from "~/modules/campaign/mutations";
import { assertIsPost } from "~/utils/http.server";

export const NewCampaignFormSchema = z.object({
  title: z.string().min(2, "require-title"),
  body: z.string().min(1, "require-body"),
  price: z.number().optional(),
  discount: z.number().int().positive("require-discount"),
  startDate: z.date(),
  endDate: z.date().optional(),
  locationId: z.string().optional(),
  location: z.object({
    id: z.string(),
    lat: z.number(),
    lng: z.number(),
    address: z.string(),
    city: z.string(),
  }),
});

type ActionData = {
  errors?: {
    title?: string;
    body?: string;
    discount?: string;
    startDate?: string;
    location?: Location;
  };
};

export const action: ActionFunction = async ({ request }) => {
  assertIsPost(request);

  const authSession = await requireAuthSession(request);
  const formData = await request.formData();
  const formValidation = await NewCampaignFormSchema.safeParseAsync(
    parseFormAny(formData)
  );

  if (!formValidation.success) {
    return json<ActionData>(
      {
        errors: {},
      },
      {
        status: 400,
        headers: {
          "Set-Cookie": await commitAuthSession(request, { authSession }),
        },
      }
    );
  }

  const {
    title,
    body,
    price,
    discount,
    startDate,
    endDate,
    location,
    locationId,
  } = formValidation.data;
  const hasPrice = price !== undefined;

  const campaign = await createCampaign({
    title,
    body,
    price: hasPrice ? new Decimal(price) : null,
    discount,
    startDate,
    endDate: endDate ?? null,
    location: {
      connectOrCreate: {
        where: { id: locationId },
        create: {
          address: location.address,
          city: location.city,
          lat: location.lat,
          lng: location.lng,
          id: undefined,
          profile: undefined,
        },
      },
    },
    user: {
      connect: {
        id: authSession.userId,
      },
    },
  });

  return redirect(`/campaigns/${campaign.id}`, {
    headers: {
      "Set-Cookie": await commitAuthSession(request, { authSession }),
    },
  });
};

export default function NewCampaignPage() {
  const zo = useZorm("CreateCampaignForm", NewCampaignFormSchema);

  const transition = useTransition();
  const disabled =
    transition.state === "submitting" || transition.state === "loading";

  return (
    <Form
      method="post"
      ref={zo.ref}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
      }}
    >
      <div className="flex space-x-2">
        <Input
          label="Tytuł"
          id={zo.fields.title()}
          name={zo.fields.title()}
          error={zo.errors.title()?.message}
          disabled={disabled}
        />
      </div>

      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Opis: </span>
          <textarea
            id={zo.fields.body()}
            name={zo.fields.body()}
            rows={8}
            aria-invalid={zo.errors.body() ? true : undefined}
            aria-errormessage={zo.errors.body()?.message}
            disabled={disabled}
          />
        </label>
        {zo.errors.title()?.message && (
          <div
            className="pt-1 text-red-700"
            id="body-error"
          >
            {zo.errors.title()?.message}
          </div>
        )}
      </div>

      <Input
        label="Cena"
        inputMode="decimal"
        required={false}
        id={zo.fields.price()}
        name={zo.fields.price()}
        error={zo.errors.price()?.message}
        disabled={disabled}
      />

      <Input
        label="Zniżka"
        id={zo.fields.discount()}
        name={zo.fields.discount()}
        error={zo.errors.discount()?.message}
        disabled={disabled}
      />

      <Input
        label="Data początkowa"
        defaultValue={new Date().toISOString().split("T")[0]}
        id={zo.fields.startDate()}
        name={zo.fields.startDate()}
        error={zo.errors.startDate()?.message}
        disabled={disabled}
      />

      <Input
        label="Data końcowa"
        required={false}
        id={zo.fields.endDate()}
        name={zo.fields.endDate()}
        error={zo.errors.endDate()?.message}
        disabled={disabled}
      />

      <div className="flex space-x-2">
        {/* <Input
          label="Szerokość geograficzna"
          error={actionData?.errors?.location?.lat.toString()}
          id="lat"
          {...inputProps("lat")}
          ref={titleRef}
          aria-invalid={actionData?.errors?.location?.lat ? true : undefined}
          aria-errormessage={
            actionData?.errors?.location?.lat ? "discount-error" : undefined
          }
          disabled={disabled}
        />
        <Input
          label="Długość geograficzna"
          error={actionData?.errors?.location?.lng.toString()}
          id="lng"
          {...inputProps("lng")}
          ref={titleRef}
          aria-invalid={actionData?.errors?.location?.lng ? true : undefined}
          aria-errormessage={
            actionData?.errors?.location?.lng ? "discount-error" : undefined
          }
          disabled={disabled}
        />

        <Input
          label="Zoom"
          id="zoom"
          error={actionData?.errors?.location?.zoom.toString()}
          {...inputProps("zoom")}
          ref={titleRef}
          aria-invalid={actionData?.errors?.location?.zoom ? true : undefined}
          aria-errormessage={
            actionData?.errors?.location?.zoom ? "discount-error" : undefined
          }
          disabled={disabled}
        /> */}
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="rounded bg-primary-500 py-2 px-4 font-semibold text-white hover:bg-primary-600 focus:bg-primary-400"
          disabled={disabled}
        >
          Stwórz kampanię
        </button>
      </div>
    </Form>
  );
}
