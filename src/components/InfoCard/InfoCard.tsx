import { Card } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

export function InfoCard({
  children,
  name,
  image,
  href,
  selected,
}: {
  children: ReactNode;
  name: string;
  image: string;
  href: string;
  selected?: boolean;
}) {
  return (
    <div
      className={`group relative w-full max-w-xs cursor-pointer overflow-hidden rounded-2xl portal dark:bg-gray-800 ${
        selected ? "ring-2 ring-[#3fb63f] ring-offset-2 dark:ring-offset-gray-900" : ""
      }`}
    >
      <Link
        href={href}
        className="absolute inset-0 z-10 rounded-2xl"
        aria-label={name}
      />
      <Card
        className="w-full max-w-xs overflow-hidden rounded-2xl portal dark:bg-gray-800"
        renderImage={() => (
          <div className="overflow-hidden rounded-t-2xl">
            <Image
              width={250}
              height={350}
              src={image}
              alt={name}
              className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
      >
        {children}
      </Card>
    </div>
  );
}
