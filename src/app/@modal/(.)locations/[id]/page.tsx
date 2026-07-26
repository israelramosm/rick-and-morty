import { DetailModal } from "@/src/components/DetailModal/DetailModal";
import LocationDetail from "@/src/components/LocationDetail/LocationDetail";

export default async function LocationModalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <DetailModal title="Location">
      <LocationDetail id={id} />
    </DetailModal>
  );
}
