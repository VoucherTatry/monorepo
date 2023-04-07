import { useAppData } from "~/hooks";

export default function ReviewPending() {
  const { user } = useAppData();

  return (
    <div className="prose flex flex-col">
      <h2>Weryfikacja konta w trakcie</h2>
      <p>
        Weryfikacja konta <strong>{user.email}</strong> w trakcie, proszę
        spróbować później
      </p>
    </div>
  );
}
