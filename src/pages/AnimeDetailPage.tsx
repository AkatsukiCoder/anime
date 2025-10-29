import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { fetchAnimeDetail } from "../services/anime.service";

type AnimeDetail = {
  mal_id: number;
  title: string;
  images: { jpg: { image_url: string } };
  synopsis: string;
};

function AnimeDetailPage() {
  const { id } = useParams();
  const [anime, setAnime] = useState<AnimeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();
    const { signal } = controller;

    let ignore = false;

    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchAnimeDetail(id, signal);
        if (!ignore) setAnime(data);
      } catch (err: any) {
        if (!ignore && err.name !== "AbortError") {
          setError(err.message || "Unknown error");
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    load();

    return () => {
      ignore = true;
      controller.abort();
    };
  }, [id]);

  if (loading && !anime) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader loading={loading} />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 p-6">{error}</p>;
  }

  if (!anime) return null;

  return (
    <div className="p-6">
      <img
        src={anime.images.jpg.image_url}
        alt={anime.title}
        className="max-w-[300px] max-h-[450px] w-auto h-auto object-contain rounded-lg shadow"
      />

      <h1 className="text-2xl font-bold text-center mb-4">{anime.title}</h1>
      <p>{anime.synopsis || "No synopsis available"}</p>
    </div>
  );
}

export default AnimeDetailPage;
