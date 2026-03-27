import * as z from "zod";

const MusicItem = z.object({
  filename: z.string(),
  genre: z.string(),
  title: z.string(),
  durationSec: z.number(),
  size: z.number(),
  lastModified: z.number(),
});

const MusicList = z.array(MusicItem);
const MusicURL = z.string();

type MusicItemSchema = z.infer<typeof MusicItem>;
type MusicListSchema = z.infer<typeof MusicList>;
type MusicURLSchema = z.infer<typeof MusicURL>;

export { MusicItem, MusicList, MusicURL };

export type { MusicItemSchema, MusicListSchema, MusicURLSchema };
