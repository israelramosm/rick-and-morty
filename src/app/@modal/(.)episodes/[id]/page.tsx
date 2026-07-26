import { DetailModal } from "@/src/components/DetailModal/DetailModal";
import { EpisodeDetail } from "@/src/components/EpisodeDetail/EpisodeDetail";

export default async function EpisodeModalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <DetailModal title="Episode">
      <EpisodeDetail id={id} />
    </DetailModal>
  );
}
