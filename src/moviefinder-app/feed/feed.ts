import { Ok, unknownToErr, type Result } from "src/core/result";
import { z } from "zod";
import { FeedId } from "./feed-id";

const parser = z.object({
  feedId: FeedId.parser,
  activeIndex: z.number(),
});
export type Feed = z.infer<typeof parser>;

const encode = (feed: Feed): string => {
  try {
    return JSON.stringify(feed);
  } catch (error) {
    return "";
  }
};

const decode = (data: string): Result<string, Feed> => {
  try {
    const parsed = parser.parse(JSON.parse(data));
    return Ok(parsed);
  } catch (error) {
    return unknownToErr(error);
  }
};

const init = (): Feed => {
  return {
    feedId: FeedId.generate(),
    activeIndex: 0,
  };
};

export const Feed = {
  parser,
  encode,
  decode,
  init,
};
