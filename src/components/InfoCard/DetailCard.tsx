"use client";
import { Card } from "flowbite-react";
import Image from "next/image";
import { ReactNode } from "react";

export function DetailCard({
  title,
  badge,
  image,
  children,
}: {
  title: string;
  badge?: ReactNode;
  image?: string;
  children: ReactNode;
}) {
  return (
    <Card className="group w-full max-w-xs cursor-pointer overflow-hidden rounded-2xl border-t-4 border-t-[#3fb63f] portal dark:bg-gray-800">
      {image && (
        <div className="-mx-6 -mt-6 mb-2 h-32 w-[calc(100%+3rem)] overflow-hidden">
          <Image
            src={image}
            alt=""
            width={400}
            height={200}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div
        className={`-mx-6 mb-2 bg-[#3fb63f]/10 px-6 py-3 dark:bg-[#3fb63f]/15 ${image ? "" : "-mt-6"}`}
      >
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
