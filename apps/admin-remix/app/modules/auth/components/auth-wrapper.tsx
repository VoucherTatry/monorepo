import { Logo, LogoHorizontal } from "~/components";

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-h-100vh flex h-full overflow-hidden bg-stone-50">
      <div className="flex flex-1 flex-col items-center space-y-12 overflow-auto px-8 py-6 md:py-8 md:justify-center">
        <div className="block md:hidden">
          <LogoHorizontal className="w-3/5 flex-shrink-0" />
        </div>
        {children}
      </div>
      <div className="hidden md:flex flex-1 items-center justify-center bg-stone-200 ">
        <Logo className="h-48 w-48" />
      </div>
    </div>
  );
}
