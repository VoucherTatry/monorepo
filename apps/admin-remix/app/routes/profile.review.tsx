import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Form, Outlet } from "@remix-run/react";
import clsx from "clsx";

export default function Review() {
  return (
    <div className="flex flex-col space-y-24">
      <Outlet />
      <Form
        action="/logout"
        method="post"
      >
        <button
          className="text-primary-500 flex space-x-2 items-center group"
          type="submit"
        >
          <ArrowLeftIcon className="w-4 h-4 transition-transform group-hover:-translate-x-2 duration-500" />
          <span
            className={clsx(
              "bg-gradient-to-r from-primary-500 to-primary-500",
              "bg-[length:0%_1px] bg-no-repeat bg-left-bottom",
              "group-hover:bg-[length:100%_1px]",
              "transition-all duration-500 ease-out"
            )}
          >
            Wróć do panelu logowania/rejestracji
          </span>
        </button>
      </Form>
    </div>
  );
}
