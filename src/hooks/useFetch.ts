"use client";

import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";

type FetchParams = Record<string, string | number | boolean>;

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const activeRequest = useRef<AbortController | null>(null);

  const fetchData = useCallback(
    async (params?: FetchParams) => {
      activeRequest.current?.abort();

      const controller = new AbortController();
      activeRequest.current = controller;
      setLoading(true);
      setError("");

      try {
        const response = await axios.get<T>(url, {
          params,
          signal: controller.signal,
        });

        if (activeRequest.current === controller) {
          setData(response.data);
        }
      } catch (requestError: unknown) {
        if (axios.isCancel(requestError)) {
          return;
        }

        const message =
          requestError instanceof Error
            ? requestError.message
            : "An unknown error occurred";

        if (activeRequest.current === controller) {
          setError(message);
        }
        console.error(requestError);
      } finally {
        if (activeRequest.current === controller) {
          activeRequest.current = null;
          setLoading(false);
        }
      }
    },
    [url]
  );

  useEffect(() => {
    // The request is the external synchronization; state updates expose its lifecycle.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchData();

    return () => {
      activeRequest.current?.abort();
    };
  }, [fetchData]);

  return { data, loading, error, fetchData };
}
