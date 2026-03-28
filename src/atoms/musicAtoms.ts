import type { MusicListSchema } from "@/schemas/music";
import { atom } from "jotai";

const musicListAtom = atom<MusicListSchema | undefined>(undefined);
const currentSongIndexAtom = atom<number>(0);

export { musicListAtom, currentSongIndexAtom };
