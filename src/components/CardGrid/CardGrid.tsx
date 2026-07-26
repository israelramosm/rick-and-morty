import { ReactNode } from "react";

export function CardGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 justify-items-center gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 xl:grid-cols-4">
      {children}
    </div>
  );
}
