import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { BASE_URL, mockedAddresses } from "./shared";
import {
  getAddressBook,
  updateAddressBook,
  type UpdateAddressBookRequest,
} from "./address-book";

const server = setupServer();
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.restoreHandlers());
afterAll(() => server.close());

describe("user/address-book", () => {
  describe("getAddressBook", () => {
    it("success", async () => {
      server.use(
        http.get(
          ({ request }) => {
            const url = new URL(request.url);
            return url.searchParams.has("language");
          },
          () => {
            return HttpResponse.json({ data: mockedAddresses });
          },
        ),
      );
      await expect(getAddressBook("idToken", "zh")).resolves.toEqual(mockedAddresses);
    });

    it("unauthenticated", async () => {
      server.use(
        http.get(
          ({ request }) => {
            const url = new URL(request.url);
            return url.searchParams.has("language");
          },
          () => {
            return HttpResponse.json({ error: "unauthenticated" }, { status: 401 });
          },
        ),
      );
      await expect(getAddressBook("idToken", "zh")).rejects.toThrow("unauthenticated");
    });

    it("throw default error", async () => {
      server.use(
        http.get(
          ({ request }) => {
            const url = new URL(request.url);
            return url.searchParams.has("language");
          },
          () => {
            return HttpResponse.json({}, { status: 500 });
          },
        ),
      );
      await expect(getAddressBook("idToken", "zh")).rejects.toThrow(
        /failed to get address book/,
      );
    });
  });

  describe("updateAddressBook", () => {
    it("success", async () => {
      server.use(
        http.patch(`${BASE_URL}address-book`, () => {
          return HttpResponse.json({ data: "timestamp" });
        }),
      );
      const request: UpdateAddressBookRequest = {
        language: "en",
        action: "add",
        addressIDs: ["123"],
      };
      await expect(updateAddressBook(request, "idToken")).resolves.toBe("timestamp");
    });

    it("unauthenticated", async () => {
      server.use(
        http.patch(`${BASE_URL}address-book`, () => {
          return HttpResponse.json({ error: "unauthenticated" }, { status: 401 });
        }),
      );
      const request: UpdateAddressBookRequest = {
        language: "en",
        action: "add",
        addressIDs: ["123"],
      };
      await expect(updateAddressBook(request, "bad-token")).rejects.toThrow(
        "unauthenticated",
      );
    });

    it("throw default message", async () => {
      server.use(
        http.patch(`${BASE_URL}address-book`, () => {
          return HttpResponse.json({}, { status: 500 });
        }),
      );
      const request: UpdateAddressBookRequest = {
        language: "en",
        action: "add",
        addressIDs: ["123"],
      };
      await expect(updateAddressBook(request, "idToken")).rejects.toThrow(
        "failed to update address book. Status: 500",
      );
    });
  });
});
