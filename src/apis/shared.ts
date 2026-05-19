import type { AddressItem } from "@/schemas/addresses";

const BASE_URL = import.meta.env.VITE_API_ENDPOINT || "http://localhost:3000/";

type ServiceError = { error: string };

const mockedAddresses: AddressItem[] = [
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
      line2: "",
      postalCode: "",
      buildingName: "",
      region: "NT",
    },
  },
  {
    id: "2",
    name: "Test Place 2",
    briefIntro: "intro 2",
    createdAt: 0,
    updatedAt: 0,
    tags: [],
    address: {
      city: "HK",
      country: "HK",
      line1: "2 Test St",
      line2: "",
      postalCode: "",
      buildingName: "",
      region: "NT",
    },
  },
];

export { BASE_URL, mockedAddresses };
export type { ServiceError };
