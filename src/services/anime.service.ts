import type { ApiResponse } from "../types/anime";
import config from "../config";

export async function fetchAnime(
  page: number = 1,
  order_by: string = "end_date",
  sort: "asc" | "desc" = "desc",
  searchTerm?: string,
  signal?: AbortSignal
): Promise<ApiResponse> {
  const API_DOMAIN = config.jikanDomain;

  let url = `${API_DOMAIN}/v4/anime?page=${page}&order_by=${order_by}&sort=${sort}&sfw=true`;
  if (searchTerm && searchTerm?.trim()) {
    url += `&q=${encodeURIComponent(searchTerm)}`;
  }

  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error("Failed to fetch anime");

  const data: ApiResponse = await res.json();
  return data;
}

export async function fetchAnimeDetail(id: string, signal?: AbortSignal) {
  const res = await fetch(`${config.jikanDomain}/v4/anime/${id}`, { signal });
  const json = await res.json();

  if (!json.data) throw new Error("Anime not found");
  return json.data;
}
