import { IMAGE_PATH } from "@/src/util/constants";
import ROUTES from "@/src/util/routes";
import { Card } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";

const sectionData = [
  {
    image: "/characters.jpg",
    alt: "Characters",
  },
  {
    image: "/locations.jpg",
    alt: "Locations",
  },
  {
    image: "/episodes.jpg",
    alt: "Episodes",
  },
];

const theme = {
  root: {
    children: "flex h-full flex-col justify-end items-end gap-4 p-6",
  },
};

export function MainPageSection() {
  return (
    <div className="flex flex-wrap justify-evenly items-center">
      {sectionData.map(({ image, alt }, i) => (
        <Link
          key={i}
          className="my-4 md:mx-8 portal"
          href={ROUTES[alt.toLowerCase()].url}
        >
          <Card
            className="relative w-48 h-48 md:w-80 md:h-80 rounded hover:scale-75"
            theme={theme}
            renderImage={() => (
              <Image
                className="rounded"
                src={`${IMAGE_PATH}/images${image}`}
                alt={alt}
                sizes="(max-width:50rem) 50rem"
                fill
              />
            )}
          >
            <h5 className="text-2xl font-bold tracking-tight text-white dark:text-white z-10">
              {alt}
            </h5>
          </Card>
        </Link>
      ))}
    </div>
  );
}
