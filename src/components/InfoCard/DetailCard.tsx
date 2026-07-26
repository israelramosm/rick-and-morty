"use client";
import { Card } from "flowbite-react";
import { ReactNode } from "react";

export function DetailCard({
  title,
  badge,
  children,
}: {
  title: string;
  badge?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Card className="group w-full max-w-xs cursor-pointer overflow-hidden rounded-2xl border-t-4 border-t-[#3fb63f] portal dark:bg-gray-800">
      <div className="-mx-6 -mt-6 mb-2 bg-[#3fb63f]/10 px-6 py-3 dark:bg-[#3fb63f]/15">
        {badge && <div className="mb-1">{badge}</div>}
        <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
      </div>
      <div className="flex flex-col gap-2">{children}</div>
    </Card>
  );
}

export function DetailRow({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <p className="font-bold text-gray-700 dark:text-gray-400">{label}</p>
      <p className="font-normal text-gray-700 dark:text-gray-300">{value}</p>
    </div>
  );
}
