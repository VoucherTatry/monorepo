export function AuthFormWrapper({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: React.ReactNode;
}) {
  return (
    <div className="flex w-full max-w-md flex-col space-y-8 md:justify-center">
      <div className="flex flex-col space-y-4">
        <h1 className="text-4xl font-bold">{title}</h1>
        {subtitle && <p className="text-stone-500">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}
