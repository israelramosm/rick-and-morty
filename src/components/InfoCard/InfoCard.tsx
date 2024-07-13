"use client";

import { InfoPropsT } from "@/src/models/character/CharacterT";
import { Card } from "flowbite-react";
import Image from "next/image";
import { ReactNode } from "react";

export function InfoCard({
  children,
  name,
  image,
  key,
}: InfoPropsT & { key: number; children: ReactNode }) {
  const hoverClass =
    "hover:bg-gradient-to-r hover:from-[#88e23b] hover:via-[#acfa70] hover:via-30% hover:via-[#69e882] hover:via-50% hover:via-[#acfa70] hover:via-70% hover:to-[#88e23b] hover:shadow-xl hover:shadow-[#88e23b]";

  return (
    <Card
      key={key}
      className={`group max-w-sm cursor-pointer m-4 rounded-t-3xl ${hoverClass}`}
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
