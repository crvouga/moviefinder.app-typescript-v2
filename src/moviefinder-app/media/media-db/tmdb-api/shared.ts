export type Config = { tmdbApiReadAccessToken: string };

export const BASE_URL = new URL("https://api.themoviedb.org/3/");

export const PAGE_SIZE = 20;

export const toBaseHeaders = (config: Config) => {
  return {
    accept: "application/json",
    Authorization: `Bearer ${config.tmdbApiReadAccessToken}`,
  };
};
