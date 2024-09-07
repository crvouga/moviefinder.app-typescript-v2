import type { Req } from "./req";

export const fromRequest = async (request: Request): Promise<Req> => {
  const formDateMap: { [key: string]: unknown } = {};
  if (request.method === "POST") {
    const formData = await request.formData();

    for (const [key, value] of formData.entries()) {
      formDateMap[key] = value;
    }
  }

  return {
    formData: formDateMap,
  };
};
