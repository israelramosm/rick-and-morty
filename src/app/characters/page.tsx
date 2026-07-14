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
import { Spinner } from "flowbite-react";
import { useFetch } from "@/src/hooks/useFetch";

const CHARACTERS_URL = "https://rickandmortyapi.com/api/character";

const toCharacter = (character: CharacterI): CharacterT => ({
  id: character.id,
  name: character.name,
  episodes: character.episode.map((episode) => episode.split("/").at(-1) ?? ""),
  image: character.image,
  location: character.location.name,
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
      <div className="flex flex-wrap justify-around">
        {loading && (
          <Spinner aria-label="Extra large spinner example" size="xl" />
        )}
        {error !== "" && <p>{error}</p>}
        {characters.map((character) => (
          <InfoCard
            key={character.id}
            name={character.name}
            image={character.image}
          >
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-white">
              {character.name}
            </h5>
            <ShowCardLocation
              location={character.location}
              classText="group-hover:text-white"
            />
            <ShowCardEpisodes
              episodes={character.episodes}
              classText="group-hover:text-white"
            />
          </InfoCard>
        ))}
      </div>
      <CustomPagination
        onPageChange={onPageChange}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </Section>
  );
}
