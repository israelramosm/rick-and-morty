import { DetailModal } from "@/src/components/DetailModal/DetailModal";
import { CharacterDetail } from "@/src/components/CharacterDetail/CharacterDetail";

export default async function CharacterModalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <DetailModal title="Character">
      <CharacterDetail id={id} />
    </DetailModal>
  );
}
