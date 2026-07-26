import Link from "next/link";
import LocationDetail from "@/src/components/LocationDetail/LocationDetail";
import { getAllResourceIds } from "@/src/util/rick-and-morty";

export async function generateStaticParams() {
  const ids = await getAllResourceIds("location");
  return ids.map((id) => ({ id }));
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <Link
        href="/locations"
        className="mb-4 inline-block text-sm text-gray-500 hover:underline dark:text-gray-400"
      >
        ✕ Cerrar
      </Link>
      <LocationDetail id={id} />
    </div>
  );
}
