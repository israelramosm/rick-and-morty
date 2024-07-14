import Image from "next/image";
import PageHeader from "../components/PageHeader/PageHeader";
import Section from "../components/Section/Section";

export default function Home() {
  return (
    <Section id="main" className="h-full flex flex-col justify-evenly">
      <PageHeader title="Home" />
      <div className="relative w-48 h-48">
        <Image
          src="/images/characters.jpg"
          className="rounded"
          alt="Home page"
          sizes="(max-width:20rem) 20rem"
          fill
        />
      </div>
      <div className="relative w-48 h-48">
        <Image
          src="/images/locations.jpg"
          className="rounded"
          alt="Home page"
          sizes="(max-width:50rem) 50rem"
          fill
        />
      </div>
      <div className="relative w-48 h-48">
        <Image
          src="/images/episodes.jpg"
          className="rounded"
          alt="Home page"
          sizes="(max-width:50rem) 50rem"
          fill
        />
      </div>      
    </Section>
  );
}
