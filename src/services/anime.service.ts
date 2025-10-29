import type { ApiResponse } from "../types/anime";

const API_DOMAIN = import.meta.env.VITE_JIKAN_API_DOMAIN;

export async function fetchAnime(
  page: number = 1,
  order_by: string = "end_date",
  sort: "asc" | "desc" = "desc",
  searchTerm?: string,
  signal?: AbortSignal // ✅ added signal support
): Promise<ApiResponse> {
  if (!API_DOMAIN) throw new Error("VITE_JIKAN_API_DOMAIN is not defined");

  let url = `${API_DOMAIN}/v4/anime?page=${page}&order_by=${order_by}&sort=${sort}&sfw=true`;

  if (searchTerm && searchTerm.trim() !== "") {
    url += `&q=${encodeURIComponent(searchTerm)}`;
  }

  const res = await fetch(url, { signal }); // ✅ attach signal here

  if (!res.ok) throw new Error("Failed to fetch anime");

  const data: ApiResponse = await res.json();
  return data;
}
