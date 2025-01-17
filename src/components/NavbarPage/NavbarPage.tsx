import { IMAGE_PATH } from "@/src/util/constants";
import ROUTES from "@/src/util/routes";
import { DeepPartial } from "@/src/util/types";
import {
  FlowbiteNavbarTheme,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import Image from "next/image";
import Link from "next/link";

const customNavbarTheme: DeepPartial<FlowbiteNavbarTheme> = {
  root: {
    base: "p-4 dark:bg-gray-800 md:flex md:items-center md:justify-between",
  },
  brand: {
    base: "relative w-[2.25rem]",
  },
};

const NavbarPage = () => (
  <Navbar theme={customNavbarTheme} rounded>
    <NavbarBrand as={Link} href="/">
      <Image
        src={`${IMAGE_PATH}/images/logo.jpg`}
        className="rounded"
        alt="Home page"
        sizes="(max-width: 2.25rem) 2.25rem"
        fill
      />
      <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white ml-12">
        Rick and Morty Wiki
      </span>
    </NavbarBrand>
    <NavbarToggle />
    <NavbarCollapse>
      {Object.values(ROUTES).map(({ name, url }, i) => (
        <NavbarLink key={i} as={Link} href={url}>
          {name}
        </NavbarLink>
      ))}
    </NavbarCollapse>
  </Navbar>
);

export default NavbarPage;
