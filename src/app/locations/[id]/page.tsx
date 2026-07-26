import Link from "next/link";
import PageHeader from "@/src/components/PageHeader/PageHeader";
import Section from "@/src/components/Section/Section";
import LocationDetail from "@/src/components/LocationDetail/LocationDetail";

export default async function LocationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Section id="main" className="flex flex-col">
      <PageHeader title="Location" />
      <Link
        href="/locations"
        className="mb-4 inline-block text-gray-700 hover:underline dark:text-gray-300"
      >
        ← Volver
      </Link>
      <LocationDetail id={id} />
    </Section>
  );
}
