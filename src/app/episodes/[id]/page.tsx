import Link from "next/link";
import PageHeader from "@/src/components/PageHeader/PageHeader";
import Section from "@/src/components/Section/Section";
import { EpisodeDetail } from "@/src/components/EpisodeDetail/EpisodeDetail";

export default async function EpisodePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Section id="main" className="flex flex-col">
      <PageHeader title="Episode" />
      <Link href="/episodes" className="mb-4 text-[#3fb63f] hover:underline">
        ← Volver
      </Link>
      <EpisodeDetail id={id} />
    </Section>
  );
}
