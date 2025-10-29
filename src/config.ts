const config = {
  port: import.meta.env.VITE_PORT || 4000,
  jikanDomain: import.meta.env.VITE_JIKAN_API_DOMAIN || "https://api.jikan.moe",
};

export default config;
