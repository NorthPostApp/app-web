import { SUPPORTED_LANGUAGES, SUPPORTED_THEMES } from "@/consts/app-config";
import * as z from "zod";

const AppConfig = z.object({
  language: z.enum(SUPPORTED_LANGUAGES),
  theme: z.enum(SUPPORTED_THEMES),
});

type AppConfigSchema = z.infer<typeof AppConfig>;

export { AppConfig };
export type { AppConfigSchema };
