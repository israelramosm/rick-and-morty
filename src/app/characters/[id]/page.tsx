import Link from "next/link";
import PageHeader from "@/src/components/PageHeader/PageHeader";
import Section from "@/src/components/Section/Section";
import { CharacterDetail } from "@/src/components/CharacterDetail/CharacterDetail";

export default async function CharacterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Section id="main" className="flex flex-col">
      <PageHeader title="Character" />
      <Link href="/characters" className="mb-4 inline-block underline">
        ← Volver
      </Link>
      <CharacterDetail id={id} />
    </Section>
  );
}
