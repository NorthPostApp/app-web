import { SUPPORTED_LANGUAGES } from "@/consts/app-config";
import z from "zod";

const AddressTagRecords = z.object({
  tags: z.record(z.string(), z.array(z.string())),
  language: z.enum(SUPPORTED_LANGUAGES),
  refreshedAt: z.number(),
});

type AddressTagRecordsSchema = z.infer<typeof AddressTagRecords>;

export { AddressTagRecords };
export type { AddressTagRecordsSchema };
