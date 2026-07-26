import Link from "next/link";
import { CharacterDetail } from "@/src/components/CharacterDetail/CharacterDetail";
import { getAllResourceIds } from "@/src/util/rick-and-morty";

export async function generateStaticParams() {
  const ids = await getAllResourceIds("character");
  return ids.map((id) => ({ id }));
}

export default async function CharacterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <Link
        href="/characters"
        className="mb-4 inline-block text-sm text-gray-500 hover:underline dark:text-gray-400"
      >
        ✕ Cerrar
      </Link>
      <CharacterDetail id={id} />
    </div>
  );
}
