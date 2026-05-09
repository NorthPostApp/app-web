import type { AddressTagRecordsSchema } from "@/schemas/addresses";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { BASE_URL } from "./shared";
import { getAllTags, getAddresses } from "./address";
import type { GetAddressesRequest } from "./address";

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

  describe("getAddresses", () => {
    const request: GetAddressesRequest = {
      language: "zh",
      keywords: "",
      tags: [],
      pageSize: 10,
      page: 1,
    };
    const mockResponse = {
      addresses: [
        {
          id: "1",
          name: "Test Place",
          briefIntro: "intro",
          createdAt: 0,
          updatedAt: 0,
          tags: [],
          address: {
            city: "HK",
            country: "HK",
            line1: "1 Test St",
            region: "NT",
          },
        },
      ],
      totalCount: 1,
      totalPages: 1,
      page: 1,
      language: "zh",
    };
    it("success", async () => {
      server.use(
        http.post(`${BASE_URL}address`, () => {
          return HttpResponse.json({ data: mockResponse });
        }),
      );
      const result = await getAddresses(request, "idToken");
      expect(result).toMatchObject(mockResponse);
    });

    it("failed with returned message", async () => {
      server.use(
        http.post(`${BASE_URL}address`, () => {
          return HttpResponse.json({ error: "unauthorized" }, { status: 401 });
        }),
      );
      await expect(getAddresses(request, "token")).rejects.toThrow("unauthorized");
    });

    it("failed with default message", async () => {
      server.use(
        http.post(`${BASE_URL}address`, () => {
          return HttpResponse.json({}, { status: 500 });
        }),
      );
      await expect(getAddresses(request, "token")).rejects.toThrow(
        "failed to get addresses",
      );
    });

    it("request aborted", async () => {
      server.use(
        http.post(`${BASE_URL}address`, async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return HttpResponse.json({ data: mockResponse });
        }),
      );
      const controller = new AbortController();
      const promise = getAddresses(request, "idToken", controller.signal);
      controller.abort();
      expect(promise).rejects.toThrow();
    });
  });
});
