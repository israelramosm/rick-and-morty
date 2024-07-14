'use client';
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
    base: 'relative w-[2.25rem]'
  }
};

const NavbarPage = () => (
  <Navbar theme={customNavbarTheme} rounded>
    <NavbarBrand as={Link} href="/">
      <Image
        src="/images/logo.jpg"
        className="rounded"
        alt="Home page"
        fill
      />
      <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white ml-12">
        Rick and Morty Wiki
      </span>
    </NavbarBrand>
    <NavbarToggle />
    <NavbarCollapse>
      <NavbarLink as={Link} href="/">
        Home
      </NavbarLink>
      <NavbarLink as={Link} href="/characters">
        Characters
      </NavbarLink>
      <NavbarLink as={Link} href="/episodes">
        Episodes
      </NavbarLink>
      <NavbarLink as={Link} href="/locations">
        Locations
      </NavbarLink>
    </NavbarCollapse>
  </Navbar>
);

export default NavbarPage;
