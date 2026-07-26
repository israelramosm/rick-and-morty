"use client";
import {
  DetailCard,
  DetailRow,
} from "@/src/components/InfoCard/DetailCard";
import PageHeader from "@/src/components/PageHeader/PageHeader";
import Section from "@/src/components/Section/Section";
import { useState } from "react";
import Link from "next/link";
import { CustomPagination } from "@/src/components/CustomPagination/CustomPagination";
import RickAndMortyAPIResponse from "@/src/models/api/rickAndMorty/RickAndMortyAPIResponse";
import LocationI from "@/src/models/location/LocationI";
import LocationT from "@/src/models/location/LocationT";
import { useFetch } from "@/src/hooks/useFetch";
import { CardGrid } from "@/src/components/CardGrid/CardGrid";
import { CardSkeletonGrid } from "@/src/components/CardSkeleton/CardSkeleton";
import { IMAGE_PATH } from "@/src/util/constants";

const LOCATIONS_URL = "https://rickandmortyapi.com/api/location";

const toLocation = (location: LocationI): LocationT => ({
  id: location.id,
  name: location.name,
  type: location.type,
  dimension: location.dimension,
  residentsCount: location.residents.length,
});

export default function Locations() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, loading, error, fetchData } = useFetch<
    RickAndMortyAPIResponse<LocationI>
  >(LOCATIONS_URL);
  const locations = data?.results.map(toLocation) ?? [];
  const totalPages = data?.info.pages ?? 1;

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    void fetchData({ page });
  };

  return (
    <Section id="main" className="h-full flex flex-col justify-evenly">
      <PageHeader title="Locations" />
      {error !== "" && <p>{error}</p>}
      <CardGrid>
        {loading ? (
          <CardSkeletonGrid />
        ) : (
          locations.map((location) => (
            <Link
              key={location.id}
              href={`/locations/${location.id}`}
              className="contents"
            >
              <DetailCard
                title={location.name}
                image={`${IMAGE_PATH}/images/locations.jpg`}
              >
                <DetailRow label="Type:" value={location.type || "Unknown"} />
                <DetailRow
                  label="Dimension:"
                  value={location.dimension || "Unknown"}
                />
                <DetailRow
                  label="Residents:"
                  value={location.residentsCount}
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
