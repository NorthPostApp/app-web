import * as z from "zod";

const UserData = z.object({
  displayName: z.string(),
  email: z.email(),
  imageUrl: z.string(),
  createdAt: z.number(),
  lastLogin: z.number(),
  drafts: z
    .array(z.string())
    .nullish()
    .transform((v) => v ?? []),
  likedMusics: z
    .array(z.string())
    .nullish()
    .transform((v) => v ?? []),
});

const GetUserDataResponse = z.object({
  data: UserData,
});

type GetUserDataResponseSchema = z.infer<typeof GetUserDataResponse>;
type UserDataSchema = z.infer<typeof UserData>;

export { UserData, GetUserDataResponse };
export type { GetUserDataResponseSchema, UserDataSchema };
