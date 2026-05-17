import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { BASE_URL } from "./shared";
import { updateAddressBook, type UpdateAddressBookRequest } from "./user";

const server = setupServer();
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.restoreHandlers());
afterAll(() => server.close());

describe("user/address-book", () => {
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
        "failed to update address book 500",
      );
    });
  });
});
