import PageHeader from "../components/PageHeader/PageHeader";
import Section from "../components/Section/Section";

export default function Home() {
  return (
    <Section id="main" className="h-full flex flex-col justify-evenly">
      <PageHeader title="Home" />
    </Section>
  );
}
