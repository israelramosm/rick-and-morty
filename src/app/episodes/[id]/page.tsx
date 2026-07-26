import Link from "next/link";
import { EpisodeDetail } from "@/src/components/EpisodeDetail/EpisodeDetail";
import { getAllResourceIds } from "@/src/util/rick-and-morty";

export async function generateStaticParams() {
  const ids = await getAllResourceIds("episode");
  return ids.map((id) => ({ id }));
}

export default async function EpisodePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <Link
        href="/episodes"
        className="mb-4 inline-block text-sm text-gray-500 hover:underline dark:text-gray-400"
      >
        ✕ Cerrar
      </Link>
      <EpisodeDetail id={id} />
    </div>
  );
}
