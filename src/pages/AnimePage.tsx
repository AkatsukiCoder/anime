import { useEffect, useState } from "react";

type Anime = {
  mal_id: number;
  title: string;
};

type ApiResponse = {
  data: Anime[];
};

function AnimePage() {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://api.jikan.moe/v4/anime")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json() as Promise<ApiResponse>;
      })
      .then((data) => {
        setAnimeList(data.data || []);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error");
        }
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading anime...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1 className="bg-red-500">Anime List</h1>
      <ul>
        {animeList.map((anime) => (
          <li key={anime.mal_id}>{anime.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default AnimePage;
