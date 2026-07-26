"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import PageHeader from "@/src/components/PageHeader/PageHeader";
import Section from "@/src/components/Section/Section";
import { MasterDetailLayout } from "@/src/components/MasterDetailLayout/MasterDetailLayout";
import { CustomPagination } from "@/src/components/CustomPagination/CustomPagination";
import { CardSkeletonGrid } from "@/src/components/CardSkeleton/CardSkeleton";
import { InfoCard } from "@/src/components/InfoCard/InfoCard";
import ShowCardEpisodes from "@/src/components/InfoCard/ShowCardEpisodes";
import ShowCardLocation from "@/src/components/InfoCard/ShowCardLocation";
import { StatusBadge } from "@/src/components/StatusBadge/StatusBadge";
import { useFetch } from "@/src/hooks/useFetch";
import RickAndMortyAPIResponse from "@/src/models/api/rickAndMorty/RickAndMortyAPIResponse";
import CharacterI from "@/src/models/character/CharacterI";
import CharacterT from "@/src/models/character/CharacterT";
import { getIdFromResourceUrl } from "@/src/util/rick-and-morty";

const CHARACTERS_URL = "https://rickandmortyapi.com/api/character";

const toCharacter = (character: CharacterI): CharacterT => ({
  id: character.id,
  name: character.name,
  episodes: character.episode.map((episode) => getIdFromResourceUrl(episode)),
  image: character.image,
  location: character.location.name,
  locationId: getIdFromResourceUrl(character.location.url),
  status: character.status,
});

export default function CharactersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams<{ id?: string }>();
  const selectedId = params?.id;
  const [currentPage, setCurrentPage] = useState(1);
  const { data, loading, error, fetchData } = useFetch<
    RickAndMortyAPIResponse<CharacterI>
  >(CHARACTERS_URL);
  const characters = data?.results.map(toCharacter) ?? [];
  const totalPages = data?.info.pages ?? 1;

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    void fetchData({ page });
  };

  return (
    <Section id="main" className="flex flex-col gap-6">
      <PageHeader title="Characters" />
      <MasterDetailLayout
        list={
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 justify-items-center gap-4 @sm:grid-cols-2 @3xl:grid-cols-3 @5xl:grid-cols-4">
              {loading ? (
                <CardSkeletonGrid withImage />
              ) : (
                characters.map((character) => (
                <InfoCard
                  key={character.id}
                  name={character.name}
                  image={character.image}
                  href={`/characters/${character.id}`}
                  selected={selectedId === String(character.id)}
                >
                  <div className="flex items-center gap-2">
                    <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {character.name}
                    </h5>
                    <StatusBadge status={character.status} />
                  </div>
                  <ShowCardLocation
                    location={character.location}
                    locationId={character.locationId}
                  />
                  <ShowCardEpisodes episodes={character.episodes} />
                </InfoCard>
                ))
              )}
            </div>
            {error !== "" && <p className="text-red-500">{error}</p>}
            <CustomPagination
              onPageChange={onPageChange}
              totalPages={totalPages}
              currentPage={currentPage}
            />
          </div>
        }
      >
        {selectedId ? children : null}
      </MasterDetailLayout>
    </Section>
  );
}
