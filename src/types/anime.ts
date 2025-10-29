export type Anime = {
  mal_id: number;
  title: string;
  images: {
    jpg: { image_url: string };
  };
};

export type ApiResponse = {
  data: Anime[];
  pagination?: {
    last_visible_page: number;
    has_next_page: boolean;
  };
};

export type AnimeDetail = {
  mal_id: number;
  title: string;
  images: { jpg: { image_url: string } };
  synopsis: string;
};
