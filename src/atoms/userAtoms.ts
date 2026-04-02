import type { UserDataSchema } from "@/schemas/user";
import { atom } from "jotai";

const userAtom = atom<UserDataSchema | null>(null);
const setUserAtom = atom(null, (_, set, userData: UserDataSchema | null) => {
  set(userAtom, userData);
});

export { userAtom, setUserAtom };
