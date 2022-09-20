import React from "react";

import { useFetcher } from "@remix-run/react";
import { Button, Input } from "ui";

export function ContinueWithEmailForm() {
  const ref = React.useRef<HTMLFormElement>(null);
  const sendMagicLink = useFetcher();
  const { data, state, type } = sendMagicLink;
  const isSuccessFull = type === "done" && !data?.error;
  const isLoading = state === "submitting" || state === "loading";
  const buttonLabel = isLoading
    ? "Wysyłanie magicznego linku..."
    : "Wyślij magiczny link";

  React.useEffect(() => {
    if (isSuccessFull) {
      ref.current?.reset();
    }
  }, [isSuccessFull]);

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
          isSuccessFull ? "text-green-600" : ""
        }`}
      >
        {!isSuccessFull ? data?.error : "Check your emails ✌️"}
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
}
