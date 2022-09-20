import { Logo } from "~/core/components";

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-h-100vh flex h-full overflow-hidden bg-stone-50">
      <div className="flex flex-1 flex-col items-center space-y-8 overflow-auto p-8 lg:justify-center">
        <div className="block lg:hidden">
          <Logo className="h-32 w-32 flex-shrink-0" />
        </div>
        {children}
      </div>
      <div className="hidden flex-1 items-center justify-center bg-stone-200 lg:flex">
        <Logo className="h-48 w-48" />
      </div>
    </div>
  );
}
