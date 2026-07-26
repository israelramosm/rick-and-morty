"use client";
import Image from "next/image";
import Link from "next/link";
import { useFetch } from "@/src/hooks/useFetch";
import CharacterI from "@/src/models/character/CharacterI";
import { StatusBadge } from "@/src/components/StatusBadge/StatusBadge";
import { CardSkeleton } from "@/src/components/CardSkeleton/CardSkeleton";
import { getIdFromResourceUrl } from "@/src/util/rick-and-morty";

const CHARACTER_URL = "https://rickandmortyapi.com/api/character";

export function CharacterDetail({ id }: { id: string }) {
  const { data, loading, error } = useFetch<CharacterI>(`${CHARACTER_URL}/${id}`);

  if (loading) {
    return <CardSkeleton withImage />;
  }

  if (error !== "") {
    return <p>{error}</p>;
  }

  if (!data) {
    return null;
  }

  const locationId = getIdFromResourceUrl(data.location.url);
  const originId = getIdFromResourceUrl(data.origin.url);

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-2xl">
        <Image
          width={350}
          height={350}
          src={data.image}
          alt={data.name}
          className="h-auto w-full object-cover"
        />
      </div>
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {data.name}
        </h2>
        <StatusBadge status={data.status} />
      </div>
      <p className="text-gray-700 dark:text-gray-400">
        <span className="font-bold">Species: </span>
        {data.species}
      </p>
      <p className="text-gray-700 dark:text-gray-400">
        <span className="font-bold">Gender: </span>
        {data.gender}
      </p>
      {data.type !== "" && (
        <p className="text-gray-700 dark:text-gray-400">
          <span className="font-bold">Type: </span>
          {data.type}
        </p>
      )}
      <p className="text-gray-700 dark:text-gray-400">
        <span className="font-bold">Origin: </span>
        {originId ? (
          <Link href={`/locations/${originId}`} className="underline">
            {data.origin.name}
          </Link>
        ) : (
          data.origin.name
        )}
      </p>
      <p className="text-gray-700 dark:text-gray-400">
        <span className="font-bold">Last known location: </span>
        {locationId ? (
          <Link href={`/locations/${locationId}`} className="underline">
            {data.location.name}
          </Link>
        ) : (
          data.location.name
        )}
      </p>
      <div>
        <p className="font-bold text-gray-700 dark:text-gray-400">Episodes</p>
        <div className="flex flex-wrap gap-2">
          {data.episode.map((episodeUrl) => {
            const episodeId = getIdFromResourceUrl(episodeUrl);
            return (
              <Link
                key={episodeId}
                href={`/episodes/${episodeId}`}
                className="rounded bg-gray-200 px-2 py-1 text-sm text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                {episodeId}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
