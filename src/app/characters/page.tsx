"use client";

import { InfoCard } from "@/src/components/InfoCard/InfoCard";
import ShowCardEpisodes from "@/src/components/InfoCard/ShowCardEpisodes";
import ShowCardLocation from "@/src/components/InfoCard/ShowCardLocation";
import PageHeader from "@/src/components/PageHeader/PageHeader";
import Section from "@/src/components/Section/Section";
import { useEffect, useState } from "react";
import axios from "axios";
import { CustomPagination } from "@/src/components/CustomPagination/CustomPagination";
import RickAndMortyAPIResponse from "@/src/models/api/rickAndMorty/RickAndMortyAPIResponse";
import CharacterI from "@/src/models/character/CharacterI";
import CharacterT from "@/src/models/character/CharacterT";
import { Spinner } from "flowbite-react";

export default function Characters() {
  const [characters, setCharacters] = useState<Array<CharacterT>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fethCharacters = async (params?: {
    [key: string]: string | number;
  }) => {
    try {
      setLoading(true);
      const { data } = await axios.get<RickAndMortyAPIResponse<CharacterI>>(
        "https://rickandmortyapi.com/api/character",
        { params }
      );
      const results = data.results.map<CharacterT>((character) => ({
        id: character.id,
        name: character.name,
        episodes: character.episode.map((e) => e.split("/").reverse()[0]),
        image: character.image,
        location: character.location.name,
      }));
      setTotalPages(data.info.pages);
      setCharacters(results);
    } catch (error: any) {
      setError(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onPageChange = (page: number) => {
    const params = {
      page,
    };
    setCurrentPage(page);
    fethCharacters(params);
  };

  useEffect(() => {
    fethCharacters();
  }, []);

  return (
    <Section id="main" className="h-full flex flex-col justify-evenly">
      <PageHeader title="Characters" />
      <div className="flex flex-wrap justify-around">
        {loading && (
          <Spinner aria-label="Extra large spinner example" size="xl" />
        )}
        {error !== "" && <p>{error}</p>}
        {characters &&
          characters.map((character, i) => (
            <InfoCard key={i} name={character.name} image={character.image}>
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
