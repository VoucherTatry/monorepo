import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { Form } from "@remix-run/react";
import { Button } from "ui";

export function LogoutButton() {
  return (
    <Form
      action="/logout"
      method="post"
    >
      <Button type="submit">
        <ArrowRightOnRectangleIcon className="mr-2 h-6 w-6" />
        Wyloguj się
      </Button>
    </Form>
  );
}
