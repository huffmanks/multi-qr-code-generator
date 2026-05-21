export interface BaseTourData {
  name: string;
  version: number;
}

export interface UrlTourData extends BaseTourData {
  type: "url";
  urls: string[];
}

export interface VideoItem {
  id: string;
  name: string;
}

export interface VideoTourData extends BaseTourData {
  type: "video";
  baseUrl: string;
  videos: VideoItem[];
}

export interface GroupTourData extends BaseTourData {
  type: "group";
  baseUrl: string;
  groups: Record<number, number>;
}

export type TourData = UrlTourData | VideoTourData | GroupTourData;

export interface QRCodeItem {
  url: string;
  filename: string;
}
