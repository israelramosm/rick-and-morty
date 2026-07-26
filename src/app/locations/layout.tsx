"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import PageHeader from "@/src/components/PageHeader/PageHeader";
import Section from "@/src/components/Section/Section";
import { MasterDetailLayout } from "@/src/components/MasterDetailLayout/MasterDetailLayout";
import { CustomPagination } from "@/src/components/CustomPagination/CustomPagination";
import { CardSkeletonGrid } from "@/src/components/CardSkeleton/CardSkeleton";
import { DetailCard, DetailRow } from "@/src/components/InfoCard/DetailCard";
import { useFetch } from "@/src/hooks/useFetch";
import RickAndMortyAPIResponse from "@/src/models/api/rickAndMorty/RickAndMortyAPIResponse";
import LocationI from "@/src/models/location/LocationI";
import LocationT from "@/src/models/location/LocationT";
import { IMAGE_PATH } from "@/src/util/constants";

const LOCATIONS_URL = "https://rickandmortyapi.com/api/location";

const toLocation = (location: LocationI): LocationT => ({
  id: location.id,
  name: location.name,
  type: location.type,
  dimension: location.dimension,
  residentsCount: location.residents.length,
});

export default function LocationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams<{ id?: string }>();
  const selectedId = params?.id;
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
    <Section id="main" className="flex flex-col gap-6">
      <PageHeader title="Locations" />
      <MasterDetailLayout
        list={
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 justify-items-center gap-4 @sm:grid-cols-2 @3xl:grid-cols-3 @5xl:grid-cols-4">
              {loading ? (
                <CardSkeletonGrid />
              ) : (
                locations.map((location) => (
                <DetailCard
                  key={location.id}
                  title={location.name}
                  href={`/locations/${location.id}`}
                  image={`${IMAGE_PATH}/images/locations.jpg`}
                  selected={selectedId === String(location.id)}
                >
                  <DetailRow
                    label="Type:"
                    value={location.type || "Unknown"}
                  />
                  <DetailRow
                    label="Dimension:"
                    value={location.dimension || "Unknown"}
                  />
                  <DetailRow
                    label="Residents:"
                    value={location.residentsCount}
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
