import Link from "next/link";
import LocationDetail from "@/src/components/LocationDetail/LocationDetail";

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
