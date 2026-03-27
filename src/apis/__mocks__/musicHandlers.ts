import { http, HttpResponse } from "msw";
import type { MusicListSchema, MusicURLSchema } from "@/schemas/music";
import { BASE_URL } from "../shared";

const musicList: MusicListSchema = [
  {
    filename: "trackA.mp3",
    genre: "pop",
    title: "Track",
    durationSec: 180,
    size: 1024,
    lastModified: 1000,
  },
  {
    filename: "trackB.mp3",
    genre: "pop",
    title: "Track",
    durationSec: 180,
    size: 1024,
    lastModified: 1000,
  },
];

const mockReturnedURL: MusicURLSchema = "example.com/music.mp3";

const handlers = [
  http.get(`${BASE_URL}music/list`, () => {
    return HttpResponse.json({ data: musicList });
  }),
  http.get(`${BASE_URL}music/:genre/:track`, () => {
    return HttpResponse.json({ data: mockReturnedURL });
  }),
];

export { musicList, handlers, mockReturnedURL };
