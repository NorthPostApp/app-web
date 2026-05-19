import type { AddressItem } from "@/schemas/addresses";
import { atom } from "jotai";

const savedAddressesAtom = atom<AddressItem[]>([]);
// const shouldRefreshAddressAtom = atom<boolean>(false);

export { savedAddressesAtom };
