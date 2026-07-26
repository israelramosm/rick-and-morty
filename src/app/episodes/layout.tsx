"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import PageHeader from "@/src/components/PageHeader/PageHeader";
import Section from "@/src/components/Section/Section";
import { MasterDetailLayout } from "@/src/components/MasterDetailLayout/MasterDetailLayout";
import { CustomPagination } from "@/src/components/CustomPagination/CustomPagination";
import { CardSkeletonGrid } from "@/src/components/CardSkeleton/CardSkeleton";
import { DetailCard, DetailRow } from "@/src/components/InfoCard/DetailCard";
import { Badge } from "flowbite-react";
import { useFetch } from "@/src/hooks/useFetch";
import RickAndMortyAPIResponse from "@/src/models/api/rickAndMorty/RickAndMortyAPIResponse";
import EpisodeI from "@/src/models/episode/EpisodeI";
import EpisodeT from "@/src/models/episode/EpisodeT";
import { IMAGE_PATH } from "@/src/util/constants";

const EPISODES_URL = "https://rickandmortyapi.com/api/episode";

const toEpisode = (episode: EpisodeI): EpisodeT => ({
  id: episode.id,
  name: episode.name,
  code: episode.episode,
  airDate: episode.air_date,
  charactersCount: episode.characters.length,
});

export default function EpisodesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams<{ id?: string }>();
  const selectedId = params?.id;
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
    <Section id="main" className="flex flex-col gap-6">
      <PageHeader title="Episodes" />
      <MasterDetailLayout
        list={
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 justify-items-center gap-4 @sm:grid-cols-2 @3xl:grid-cols-3 @5xl:grid-cols-4">
              {loading ? (
                <CardSkeletonGrid />
              ) : (
                episodes.map((episode) => (
                <DetailCard
                  key={episode.id}
                  title={episode.name}
                  href={`/episodes/${episode.id}`}
                  image={`${IMAGE_PATH}/images/episodes.jpg`}
                  badge={<Badge color="green">{episode.code}</Badge>}
                  selected={selectedId === String(episode.id)}
                >
                  <DetailRow label="Air date:" value={episode.airDate} />
                  <DetailRow
                    label="Characters:"
                    value={episode.charactersCount}
                  />
                </DetailCard>
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
