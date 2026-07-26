import { ReactNode } from "react";

export function MasterDetailLayout({
  list,
  children,
}: {
  list: ReactNode;
  children?: ReactNode;
}) {
  const open = Boolean(children);

  return (
    <div className="flex w-full items-start gap-6">
      <div
        className={`@container min-w-0 ${open ? "flex-1" : "w-full"}`}
      >
        {list}
      </div>
      {open ? (
        <aside className="w-full shrink-0 sm:w-[400px] lg:sticky lg:top-4 lg:max-h-[calc(100vh-6rem)] lg:w-[440px] lg:overflow-y-auto">
          {children}
        </aside>
      ) : null}
    </div>
  );
}
