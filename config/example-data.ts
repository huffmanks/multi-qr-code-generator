import type { TourData } from "../src/types.ts";

export const data: TourData = {
  name: "example-group-tour",
  version: 1,
  type: "group",
  baseUrl: "https://example.com?id=",
  groups: {
    100: 3,
    200: 2,
    300: 5,
  },
  // urls: ["https://example.com", "https://example.com/about"],
  // videos: [
  //   {
  //     id: "jgdeJras3Y",
  //     name: "example-01",
  //   },
  // ],
};
