import * as React from "react";

import { Decimal } from "@prisma/client/runtime";
import { json, redirect } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import { Form, useActionData, useTransition } from "@remix-run/react";
import { getFormData, useFormInputProps } from "remix-params-helper";
import { z } from "zod";

import { requireAuthSession } from "~/core/auth/guards";
import { commitAuthSession } from "~/core/auth/session.server";
import type { Location } from "~/core/database";
import { assertIsPost } from "~/core/utils/http.server";
import { createCampaign } from "~/modules/campaign/mutations";
import { Input } from "ui";

export const NewCampaignFormSchema = z.object({
  title: z.string().min(2, "require-title"),
  body: z.string().min(1, "require-body"),
  price: z.number().optional(),
  discount: z.number().int().positive("require-discount"),
  startDate: z.date(),
  endDate: z.date().optional(),
  lat: z.number(),
  lng: z.number(),
  zoom: z.number(),
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
  const formValidation = await getFormData(request, NewCampaignFormSchema);

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

  const { title, body, price, discount, startDate, endDate, lat, lng, zoom } =
    formValidation.data;
  const hasPrice = price !== undefined;

  const campaign = await createCampaign({
    title,
    body,
    price: hasPrice ? new Decimal(price) : null,
    discount,
    startDate,
    endDate: endDate ?? null,
    location: { lat, lng, zoom },
    userId: authSession.userId,
  });

  return redirect(`/campaigns/${campaign.id}`, {
    headers: {
      "Set-Cookie": await commitAuthSession(request, { authSession }),
    },
  });
};

export default function NewCampaignPage() {
  const actionData = useActionData() as ActionData;

  const titleRef = React.useRef<HTMLInputElement>(null);
  const bodyRef = React.useRef<HTMLTextAreaElement>(null);
  const priceRef = React.useRef<HTMLInputElement>(null);
  const discountRef = React.useRef<HTMLInputElement>(null);
  const startDateRef = React.useRef<HTMLInputElement>(null);
  const endDateRef = React.useRef<HTMLInputElement>(null);
  const latRef = React.useRef<HTMLInputElement>(null);
  const lngRef = React.useRef<HTMLInputElement>(null);
  const zoomRef = React.useRef<HTMLInputElement>(null);

  const inputProps = useFormInputProps(NewCampaignFormSchema);
  const transition = useTransition();
  const disabled =
    transition.state === "submitting" || transition.state === "loading";

  React.useEffect(() => {
    switch (actionData?.errors) {
      case "title":
        return titleRef.current?.focus();
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
          id="title"
          label="Tytuł"
          error={actionData?.errors?.title}
          {...inputProps("title")}
          ref={titleRef}
          aria-invalid={actionData?.errors?.title ? true : undefined}
          aria-errormessage={
            actionData?.errors?.title ? "title-error" : undefined
          }
          disabled={disabled}
        />
      </div>

      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Opis: </span>
          <textarea
            {...inputProps("body")}
            ref={bodyRef}
            rows={8}
            aria-invalid={actionData?.errors?.body ? true : undefined}
            aria-errormessage={
              actionData?.errors?.body ? "body-error" : undefined
            }
            disabled={disabled}
          />
        </label>
        {actionData?.errors?.body && (
          <div
            className="pt-1 text-red-700"
            id="body-error"
          >
            {actionData?.errors.body}
          </div>
        )}
      </div>

      <Input
        id="price"
        inputMode="decimal"
        label="Cena"
        {...inputProps("price")}
        required={false}
        ref={titleRef}
        disabled={disabled}
      />

      <Input
        label="Zniżka"
        id="discount"
        error={actionData?.errors?.discount}
        {...inputProps("discount")}
        ref={titleRef}
        aria-invalid={actionData?.errors?.discount ? true : undefined}
        aria-errormessage={
          actionData?.errors?.discount ? "discount-error" : undefined
        }
        disabled={disabled}
      />

      <Input
        label="Data początkowa"
        id="startDate"
        error={actionData?.errors?.startDate}
        {...inputProps("startDate")}
        ref={titleRef}
        aria-invalid={actionData?.errors?.startDate ? true : undefined}
        aria-errormessage={
          actionData?.errors?.startDate ? "discount-error" : undefined
        }
        disabled={disabled}
        defaultValue={new Date().toISOString().split("T")[0]}
      />

      <Input
        label="Data końcowa"
        id="endDate"
        {...inputProps("endDate")}
        required={false}
        ref={titleRef}
        disabled={disabled}
      />

      <div className="flex space-x-2">
        <Input
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
        />
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
