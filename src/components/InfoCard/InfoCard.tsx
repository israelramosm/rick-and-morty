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
      className={`group max-w-[15rem] cursor-pointer m-4 rounded-t-3xl portal`}
      renderImage={() => (
        <Image
          width={250}
          height={350}
          src={image}
          alt={name}
          className="rounded-t-3xl hover:scale-105"
        />
      )}
    >
      {children}
    </Card>
  );
}
