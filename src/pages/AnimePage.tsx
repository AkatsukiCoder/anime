import { useEffect, useState, useRef } from "react";
import Loader from "../components/Loader";
import type { Anime } from "../types/anime";
import { fetchAnime } from "../services/anime.service";
import { Link } from "react-router-dom";

type AnimePageProps = {
  searchTerm: string;
};

function AnimePage({ searchTerm }: AnimePageProps) {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [firstPageLoaded, setFirstPageLoaded] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const loadAnime = async (
    pageNum: number,
    query: string,
    signal?: AbortSignal
  ) => {
    setLoading(true);
    try {
      const res = await fetchAnime(pageNum, "end_date", "desc", query, signal);

      setAnimeList(prev => {
        const combined = pageNum === 1 ? res.data : [...prev, ...res.data];

        // Deduplicate by mal_id
        const deduped = combined.filter(
          (a, i) => combined.findIndex(v => v.mal_id === a.mal_id) === i
        );

        return deduped;
      });

      setHasNextPage(res.pagination?.has_next_page ?? false);
      if (pageNum === 1) setFirstPageLoaded(true);
    } catch (err: any) {
      if (err.name !== "AbortError") {
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    } finally {
      setLoading(false);
    }
  };

  // Debounce search refresh
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    setAnimeList([]);
    setPage(1);
    setHasNextPage(true);
    setFirstPageLoaded(false);

    const delay = setTimeout(() => {
      loadAnime(1, searchTerm, signal);
    }, 250);

    return () => {
      clearTimeout(delay);
      controller.abort();
    };
  }, [searchTerm]);

  // Pagination for page > 1
  useEffect(() => {
    if (page === 1) return;

    const controller = new AbortController();
    loadAnime(page, searchTerm, controller.signal);
    return () => controller.abort();
  }, [page]);

  // Infinite scroll observer
  useEffect(() => {
    if (!bottomRef.current || !firstPageLoaded) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !loading && hasNextPage) {
          setPage(prev => prev + 1);
        }
      },
      { rootMargin: "150px" }
    );

    observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, [firstPageLoaded, loading, hasNextPage]);

  return (
    <div className="relative p-6">
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {animeList.map(anime => (
          <Link
            key={anime.mal_id}
            to={`/anime/${anime.mal_id}`}
            className="overflow-hidden"
          >
            <div className="w-full h-64">
              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                className="w-full h-full object-contain cursor-pointer"
              />
            </div>
            <p className="p-2 text-center font-semibold cursor-pointer">
              {anime.title}
            </p>
          </Link>
        ))}
      </div>

      <div ref={bottomRef} />
      <Loader loading={loading} />
    </div>
  );
}

export default AnimePage;
