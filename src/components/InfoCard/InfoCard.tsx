"use client";
import { Card } from "flowbite-react";
import Image from "next/image";
import { ReactNode } from "react";

export function InfoCard({
  children,
  name,
  image,
}: {
  children: ReactNode;
  name: string;
  image: string;
}) {
  return (
    <Card
      className="group w-full max-w-xs cursor-pointer overflow-hidden rounded-2xl portal dark:bg-gray-800"
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
  );
}
