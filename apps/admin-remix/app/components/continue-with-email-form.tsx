import React from "react";

import { useFetcher } from "@remix-run/react";
import { Button, Input } from "ui";

export const ContinueWithEmailForm = () => {
  const ref = React.useRef<HTMLFormElement>(null);
  const sendMagicLink = useFetcher();
  const { data, state, type } = sendMagicLink;
  const isSuccessfull = type === "done" && !data?.error;
  const isLoading = state === "submitting" || state === "loading";
  const buttonLabel = isLoading
    ? "Wysyłanie magicznego linku..."
    : "Wyślij magiczny link";

  React.useEffect(() => {
    if (isSuccessfull) {
      ref.current?.reset();
    }
  }, [isSuccessfull]);

  return (
    <sendMagicLink.Form
      method="post"
      action="/send-magic-link"
      replace={false}
      ref={ref}
    >
      <Input
        type="email"
        required
        autoComplete="email"
        name="email"
        id="magic-link"
        disabled={isLoading}
        inputOnly
      />
      <div
        className={`mb-2 h-6 text-sm ${data?.error ? "text-red-500" : ""} ${
          isSuccessfull ? "text-green-600" : ""
        }`}
      >
        {!isSuccessfull ? data?.error : "Sprawdź email! ✌️"}
      </div>
      <Button
        type="submit"
        size="md"
        width="w-full"
        disabled={isLoading}
      >
        {buttonLabel}
      </Button>
    </sendMagicLink.Form>
  );
};
