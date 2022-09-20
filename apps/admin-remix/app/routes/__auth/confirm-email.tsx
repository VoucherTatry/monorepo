import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <main className="flex h-full flex-col sm:items-center sm:justify-center">
      <span>Potwierdź swój adres email, aby móc korzystać z konta.</span>
      <Link
        className="cursor-pointer text-red-500 hover:underline"
        to="/login"
      >
        Powrót do logowania
      </Link>
    </main>
  );
}
