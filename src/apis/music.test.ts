import { http, HttpResponse } from "msw";
import { mockReturnedURL, musicList } from "./__mocks__/musicHandlers";
import { getMusicList, getPresignedMusicURL } from "./music";
import { BASE_URL } from "./shared";
import { server } from "@/lib/server";

describe("api/music", () => {
  describe("getMusicList", () => {
    it("success", async () => {
      const result = await getMusicList("token", new AbortController().signal);
      expect(result).toEqual(musicList);
    });

    it("failed with returned error message", async () => {
      server.use(
        http.get(`${BASE_URL}music/list`, () => {
          return HttpResponse.json({ error: "unauthorized" }, { status: 401 });
        }),
      );
      await expect(getMusicList("token", new AbortController().signal)).rejects.toThrow(
        "unauthorized",
      );
    });

    it("failed with default error message", async () => {
      server.use(
        http.get(`${BASE_URL}music/list`, () => {
          return HttpResponse.json({}, { status: 401 });
        }),
      );
      await expect(getMusicList("token", new AbortController().signal)).rejects.toThrow(
        "failed to get music list: 401",
      );
    });
  });

  describe("getPresignedMusicURL", () => {
    it("success", async () => {
      const filename = "foo/bar.mp3";
      const result = await getPresignedMusicURL(
        "token",
        filename,
        new AbortController().signal,
      );
      expect(result).toEqual(mockReturnedURL);
    });

    it("failed with returned error message", async () => {
      const filename = "foo/bar.mp3";
      server.use(
        http.get(`${BASE_URL}music/${filename}`, () => {
          return HttpResponse.json({ error: "unauthorized" }, { status: 401 });
        }),
      );
      await expect(
        getPresignedMusicURL("token", filename, new AbortController().signal),
      ).rejects.toThrow("unauthorized");
    });

    it("failed with default error message", async () => {
      const filename = "foo/bar.mp3";
      let capturedPath: string = "";
      server.use(
        http.get(`${BASE_URL}music/:genre/:track`, ({ params }) => {
          capturedPath = `${params.genre}/${params.track}`;
          return HttpResponse.json({}, { status: 401 });
        }),
      );
      await expect(
        getPresignedMusicURL("token", filename, new AbortController().signal),
      ).rejects.toThrow("failed to get music url: 401");
      expect(capturedPath).toEqual(filename);
    });
  });
});
