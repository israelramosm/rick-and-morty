"use client";
import { InfoCard } from "@/src/components/InfoCard/InfoCard";
import ShowCardEpisodes from "@/src/components/InfoCard/ShowCardEpisodes";
import ShowCardLocation from "@/src/components/InfoCard/ShowCardLocation";
import PageHeader from "@/src/components/PageHeader/PageHeader";
import Section from "@/src/components/Section/Section";
import { useState } from "react";
import { CustomPagination } from "@/src/components/CustomPagination/CustomPagination";
import RickAndMortyAPIResponse from "@/src/models/api/rickAndMorty/RickAndMortyAPIResponse";
import CharacterI from "@/src/models/character/CharacterI";
import CharacterT from "@/src/models/character/CharacterT";
import { useFetch } from "@/src/hooks/useFetch";
import { CardGrid } from "@/src/components/CardGrid/CardGrid";
import { CardSkeletonGrid } from "@/src/components/CardSkeleton/CardSkeleton";
import { StatusBadge } from "@/src/components/StatusBadge/StatusBadge";

const CHARACTERS_URL = "https://rickandmortyapi.com/api/character";

const toCharacter = (character: CharacterI): CharacterT => ({
  id: character.id,
  name: character.name,
  episodes: character.episode.map((episode) => episode.split("/").at(-1) ?? ""),
  image: character.image,
  location: character.location.name,
  status: character.status,
});

export default function Characters() {
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
    <Section id="main" className="h-full flex flex-col justify-evenly">
      <PageHeader title="Characters" />
      {error !== "" && <p>{error}</p>}
      <CardGrid>
        {loading ? (
          <CardSkeletonGrid withImage />
        ) : (
          characters.map((character) => (
            <InfoCard
              key={character.id}
              name={character.name}
              image={character.image}
            >
              <div className="flex items-center gap-2">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {character.name}
                </h5>
                <StatusBadge status={character.status} />
              </div>
              <ShowCardLocation location={character.location} />
              <ShowCardEpisodes episodes={character.episodes} />
            </InfoCard>
          ))
        )}
      </CardGrid>
      <CustomPagination
        onPageChange={onPageChange}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </Section>
  );
}
