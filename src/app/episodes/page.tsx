"use client";
import {
  DetailCard,
  DetailRow,
} from "@/src/components/InfoCard/DetailCard";
import PageHeader from "@/src/components/PageHeader/PageHeader";
import Section from "@/src/components/Section/Section";
import { useState } from "react";
import { CustomPagination } from "@/src/components/CustomPagination/CustomPagination";
import RickAndMortyAPIResponse from "@/src/models/api/rickAndMorty/RickAndMortyAPIResponse";
import EpisodeI from "@/src/models/episode/EpisodeI";
import EpisodeT from "@/src/models/episode/EpisodeT";
import { Badge } from "flowbite-react";
import Link from "next/link";
import { useFetch } from "@/src/hooks/useFetch";
import { CardGrid } from "@/src/components/CardGrid/CardGrid";
import { CardSkeletonGrid } from "@/src/components/CardSkeleton/CardSkeleton";
import { IMAGE_PATH } from "@/src/util/constants";

const EPISODES_URL = "https://rickandmortyapi.com/api/episode";

const toEpisode = (episode: EpisodeI): EpisodeT => ({
  id: episode.id,
  name: episode.name,
  code: episode.episode,
  airDate: episode.air_date,
  charactersCount: episode.characters.length,
});

export default function Episodes() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, loading, error, fetchData } = useFetch<
    RickAndMortyAPIResponse<EpisodeI>
  >(EPISODES_URL);
  const episodes = data?.results.map(toEpisode) ?? [];
  const totalPages = data?.info.pages ?? 1;

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    void fetchData({ page });
  };

  return (
    <Section id="main" className="h-full flex flex-col justify-evenly">
      <PageHeader title="Episodes" />
      {error !== "" && <p>{error}</p>}
      <CardGrid>
        {loading ? (
          <CardSkeletonGrid />
        ) : (
          episodes.map((episode) => (
            <Link
              key={episode.id}
              href={`/episodes/${episode.id}`}
              className="contents"
            >
              <DetailCard
                title={episode.name}
                badge={<Badge color="green">{episode.code}</Badge>}
                image={`${IMAGE_PATH}/images/episodes.jpg`}
              >
                <DetailRow label="Air date:" value={episode.airDate} />
                <DetailRow
                  label="Characters:"
                  value={episode.charactersCount}
                />
              </DetailCard>
            </Link>
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
