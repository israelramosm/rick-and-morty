import RickAndMortyAPIResponse from "@/src/models/api/rickAndMorty/RickAndMortyAPIResponse";

export function getIdFromResourceUrl(url: string): string {
  return url.split("/").filter(Boolean).at(-1) ?? "";
}

type ResourceType = "character" | "location" | "episode";

export async function getAllResourceIds(
  resource: ResourceType
): Promise<string[]> {
  const ids: string[] = [];
  let url: string | null = `https://rickandmortyapi.com/api/${resource}`;

  while (url) {
    const res = await fetch(url);
    if (!res.ok) break;

    const json: RickAndMortyAPIResponse<{ id: number }> = await res.json();
    for (const item of json.results) {
      ids.push(String(item.id));
    }
    url = json.info.next;
  }

  return ids;
}
