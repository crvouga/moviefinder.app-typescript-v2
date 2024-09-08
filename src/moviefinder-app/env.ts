export const TMDB_API_READ_ACCESS_TOKEN = import.meta.env
  .TMDB_API_READ_ACCESS_TOKEN!;

if (typeof TMDB_API_READ_ACCESS_TOKEN !== "string") {
  throw new Error("TMDB_API_READ_ACCESS_TOKEN not set");
}
