export const TMDB_API_READ_ACCESS_TOKEN = import.meta.env
  .TMDB_API_READ_ACCESS_TOKEN!;

if (typeof TMDB_API_READ_ACCESS_TOKEN !== "string") {
  throw new Error("TMDB_API_READ_ACCESS_TOKEN not set");
}

export const DATABASE_URL = import.meta.env.DATABASE_URL!;

if (typeof DATABASE_URL !== "string") {
  throw new Error("DATABASE_URL not set");
}
