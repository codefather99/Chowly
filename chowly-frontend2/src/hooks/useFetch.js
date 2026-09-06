import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Generic data-fetching hook.
 * fetcher: (signal) => Promise<AxiosResponse>
 * deps: dependency array to re-run the fetch
 */
export default function useFetch(fetcher, deps = [], { skip = false, fallback = null } = {}) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(!skip);
  const [error, setError] = useState(null);
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  const refetch = useCallback(() => {
    if (skip) return;
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    fetcherRef
      .current(controller.signal)
      .then((res) => setData(res.data))
      .catch((err) => {
        if (err?.name !== "CanceledError" && err?.name !== "AbortError") {
          setError(err);
        }
      })
      .finally(() => setLoading(false));
    return controller;
  }, [skip]);

  useEffect(() => {
    const controller = refetch();
    return () => controller?.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error, refetch };
}
