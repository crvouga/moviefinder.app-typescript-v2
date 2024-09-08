// https://developer.themoviedb.org/reference/configuration-details
import { Ok, unknownToErr } from "src/core/result";
import { z } from "zod";
import { BASE_URL, toBaseHeaders, type Config } from "./shared";
import { ImageSet } from "src/core/image-set";

export const Configuration = z.object({
  images: z.object({
    base_url: z.string(),
    secure_base_url: z.string(),
    backdrop_sizes: z.array(z.string()),
    logo_sizes: z.array(z.string()),
    poster_sizes: z.array(z.string()),
    profile_sizes: z.array(z.string()),
    still_sizes: z.array(z.string()),
  }),
  change_keys: z.array(z.string()),
});

export type Configuration = z.infer<typeof Configuration>;

export const getConfiguration = (config: Config) => async () => {
  try {
    const url = new URL("configuration", BASE_URL);
    const fetched = await fetch(url.toString(), {
      headers: toBaseHeaders(config),
    });
    const json = await fetched.json();
    const parsed = Configuration.parse(json);
    return Ok(parsed);
  } catch (error) {
    return unknownToErr(error);
  }
};

export const toPosterImageSet = (input: {
  configuration: Configuration;
  posterPath?: string | null;
}): ImageSet => {
  if (!input.posterPath) {
    return ImageSet.empty;
  }
  return ImageSet.init({
    lowestToHighestRes: input.configuration.images.poster_sizes.map(
      (posterSize) =>
        `${input.configuration.images.secure_base_url}/${posterSize}${input.posterPath}`,
    ),
  });
};

export const toBackdropImageSet = (input: {
  configuration: Configuration;
  backdropPath?: string | null;
}): ImageSet => {
  if (!input.backdropPath) {
    return ImageSet.empty;
  }

  return ImageSet.init({
    lowestToHighestRes: input.configuration.images.poster_sizes.map(
      (posterSize) =>
        `${input.configuration.images.secure_base_url}/${posterSize}${input.backdropPath}`,
    ),
  });
};
