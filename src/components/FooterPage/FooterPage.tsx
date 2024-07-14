import { DeepPartial } from "@/src/util/types";
import {
  FlowbiteFooterTheme,
  Footer,
  FooterLink,
  FooterLinkGroup,
} from "flowbite-react";

const customFooterTheme: DeepPartial<FlowbiteFooterTheme> = {
  root: {
    base: "mx-auto container border-solid border-2 w-full bg-white dark:bg-gray-800 md:flex md:items-center md:justify-center",
  },
};

const FooterPage = () => (
  <Footer container theme={customFooterTheme}>
    <FooterLinkGroup>
      <FooterLink href="https://pages.github.com/">Published with Gihub Pages</FooterLink>
    </FooterLinkGroup>
  </Footer>
);

export default FooterPage;
