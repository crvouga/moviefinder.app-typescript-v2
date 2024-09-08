export type ImageSet = {
  lowestToHighestRes: string[];
};

const init = (imageSet: ImageSet): ImageSet => {
  return imageSet;
};

const empty: ImageSet = {
  lowestToHighestRes: [],
};

const highestRes = (imageSet: ImageSet): string | null => {
  return (
    imageSet.lowestToHighestRes[imageSet.lowestToHighestRes.length - 1] ?? null
  );
};

export const ImageSet = {
  init,
  empty,
  highestRes,
};
