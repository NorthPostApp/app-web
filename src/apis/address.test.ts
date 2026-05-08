import type { AddressTagRecordsSchema } from "@/schemas/addresses";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { BASE_URL } from "./shared";
import { getAllTags } from "./address";

const tagsRecord: AddressTagRecordsSchema = {
  tags: {
    country: ["a", "b", "c"],
  },
  language: "zh",
  refreshedAt: new Date().getTime(),
};

const server = setupServer();
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("user/address", () => {
  describe("getAllTags", () => {
    it("success", async () => {
      server.use(
        http.get(`${BASE_URL}address/tags`, ({ request }) => {
          const language = new URL(request.url).searchParams.get("language");
          if (language === "zh") {
            return HttpResponse.json({ data: tagsRecord });
          }
        }),
      );
      const result = await getAllTags("zh", "123");
      expect(result).toEqual(tagsRecord);
    });

    it("failed with returned message", async () => {
      server.use(
        http.get(`${BASE_URL}address/tags`, () => {
          return HttpResponse.json({ error: "unauthorized" }, { status: 401 });
        }),
      );
      await expect(getAllTags("zh", "token")).rejects.toThrow("unauthorized");
    });

    it("failed with default message", async () => {
      server.use(
        http.get(`${BASE_URL}address/tags`, () => {
          return HttpResponse.json({}, { status: 401 });
        }),
      );
      await expect(getAllTags("zh", "token")).rejects.toThrow(
        "failed to get all tags: 401",
      );
    });
  });
});
