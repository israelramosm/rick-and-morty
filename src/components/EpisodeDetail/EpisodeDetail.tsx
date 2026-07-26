"use client";
import axios from "axios";
import { Badge, Spinner } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useFetch } from "@/src/hooks/useFetch";
import CharacterI from "@/src/models/character/CharacterI";
import EpisodeI from "@/src/models/episode/EpisodeI";
import { getIdFromResourceUrl } from "@/src/util/rick-and-morty";

const CHARACTER_URL = "https://rickandmortyapi.com/api/character";

export function EpisodeDetail({ id }: { id: string }) {
  const {
    data: episode,
    loading: episodeLoading,
    error: episodeError,
  } = useFetch<EpisodeI>(`https://rickandmortyapi.com/api/episode/${id}`);

  const [characters, setCharacters] = useState<CharacterI[]>([]);
  const [charactersLoading, setCharactersLoading] = useState(false);
  const [charactersError, setCharactersError] = useState("");

  const characterIds =
    episode?.characters.map(getIdFromResourceUrl).join(",") ?? "";

  const fetchCharacters = useCallback(
    (ids: string, signal: AbortSignal) => {
      setCharactersLoading(true);
      setCharactersError("");

      axios
        .get<CharacterI | CharacterI[]>(`${CHARACTER_URL}/${ids}`, {
          signal,
        })
        .then((response) => {
          const list = Array.isArray(response.data)
            ? response.data
            : response.data
              ? [response.data]
              : [];
          setCharacters(list);
        })
        .catch((requestError: unknown) => {
          if (axios.isCancel(requestError)) {
            return;
          }
          const message =
            requestError instanceof Error
              ? requestError.message
              : "An unknown error occurred";
          setCharactersError(message);
        })
        .finally(() => {
          setCharactersLoading(false);
        });
    },
    []
  );

  useEffect(() => {
    if (!characterIds) {
      return;
    }

    const controller = new AbortController();
    // The request is the external synchronization; state updates expose its lifecycle.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCharacters(characterIds, controller.signal);

    return () => {
      controller.abort();
    };
  }, [characterIds, fetchCharacters]);

  if (episodeLoading) {
    return (
      <div className="flex justify-center py-8">
        <Spinner size="xl" />
      </div>
    );
  }

  if (episodeError !== "" || !episode) {
    return (
      <p className="text-red-500">{episodeError || "Episode not found"}</p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Badge color="green" className="mb-2 inline-flex w-fit">
          {episode.episode}
        </Badge>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {episode.name}
        </h2>
        <p className="mt-1 font-normal text-gray-700 dark:text-gray-300">
          Air date: {episode.air_date}
        </p>
      </div>

      <div>
        <h3 className="mb-2 font-bold text-gray-700 dark:text-gray-400">
          Characters:
        </h3>
        {charactersLoading ? (
          <div className="flex justify-center py-4">
            <Spinner size="md" />
          </div>
        ) : charactersError !== "" ? (
          <p className="text-red-500">{charactersError}</p>
        ) : (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {characters.map((character) => (
              <Link
                key={character.id}
                href={`/characters/${character.id}`}
                className="flex items-center gap-2 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Image
                  src={character.image}
                  alt={character.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <span className="truncate text-sm font-normal text-gray-700 dark:text-gray-300">
                  {character.name}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
