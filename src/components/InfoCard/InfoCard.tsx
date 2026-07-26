"use client";
import { Card } from "flowbite-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { KeyboardEvent, MouseEvent, ReactNode } from "react";

export function InfoCard({
  children,
  name,
  image,
  href,
}: {
  children: ReactNode;
  name: string;
  image: string;
  href: string;
}) {
  const router = useRouter();

  const navigate = () => router.push(href);

  const onClick = (event: MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("a")) return;
    navigate();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("a")) return;
    if (event.key === "Enter") navigate();
  };

  return (
    <Card
      className="group w-full max-w-xs cursor-pointer overflow-hidden rounded-2xl portal dark:bg-gray-800"
      onClick={onClick}
      onKeyDown={onKeyDown}
      role="link"
      tabIndex={0}
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
