export type HttpClient = {
  get: (input: { url: string }) => Promise<unknown>;
};
