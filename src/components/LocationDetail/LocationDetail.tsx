"use client";

import Image from "next/image";
import Link from "next/link";
import { useFetch } from "@/src/hooks/useFetch";
import LocationI from "@/src/models/location/LocationI";
import CharacterI from "@/src/models/character/CharacterI";
import { getIdFromResourceUrl } from "@/src/util/rick-and-morty";

const CHARACTER_URL = "https://rickandmortyapi.com/api/character";

export default function LocationDetail({ id }: { id: string }) {
  const {
    data: location,
    loading: locationLoading,
    error: locationError,
  } = useFetch<LocationI>(`https://rickandmortyapi.com/api/location/${id}`);

  const residentIds =
    location?.residents.map(getIdFromResourceUrl).join(",") ?? "";

  if (locationLoading) {
    return <p>Loading...</p>;
  }

  if (locationError || !location) {
    return <p>{locationError || "Location not found"}</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        {location.name}
      </h2>
      <div className="flex flex-col gap-1">
        <p className="text-gray-700 dark:text-gray-300">
          <span className="font-bold text-gray-700 dark:text-gray-400">
            Type:{" "}
          </span>
          {location.type || "Unknown"}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          <span className="font-bold text-gray-700 dark:text-gray-400">
            Dimension:{" "}
          </span>
          {location.dimension || "Unknown"}
        </p>
      </div>

      <div>
        <p className="mb-2 font-bold text-gray-700 dark:text-gray-400">
          Residents:
        </p>
        {residentIds === "" ? (
          <p className="text-gray-700 dark:text-gray-300">No residents</p>
        ) : (
          <Residents ids={residentIds} />
        )}
      </div>
    </div>
  );
}

function Residents({ ids }: { ids: string }) {
  const { data, loading, error } = useFetch<CharacterI | CharacterI[]>(
    `${CHARACTER_URL}/${ids}`
  );

  if (loading) {
    return <p>Loading residents...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const residents = Array.isArray(data) ? data : data ? [data] : [];

  return (
    <div className="flex flex-wrap gap-3">
      {residents.map((character) => (
        <Link
          key={character.id}
          href={`/characters/${character.id}`}
          className="flex items-center gap-2 rounded-full bg-[#3fb63f]/10 py-1 pr-3 pl-1 dark:bg-[#3fb63f]/15"
        >
          <Image
            src={character.image}
            alt={character.name}
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="text-sm text-gray-800 dark:text-gray-200">
            {character.name}
          </span>
        </Link>
      ))}
    </div>
  );
}
