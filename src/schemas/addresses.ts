import { SUPPORTED_LANGUAGES } from "@/consts/app-config";
import z from "zod";

const AddressTagRecords = z.object({
  tags: z.record(z.string(), z.array(z.string())),
  language: z.enum(SUPPORTED_LANGUAGES),
  refreshedAt: z.number(),
});
type AddressTagRecordsSchema = z.infer<typeof AddressTagRecords>;

const AddressSchema = z.object({
  city: z.string(),
  country: z.string(),
  line1: z.string(),
  line2: z.string().default(""),
  buildingName: z.string().default(""),
  postalCode: z.string().default(""),
  region: z.string(),
});
type Address = z.infer<typeof AddressSchema>;

const AddressItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  briefIntro: z.string(),
  createdAt: z.number(),
  updatedAt: z.number(),
  tags: z.array(z.string()),
  address: AddressSchema,
});
type AddressItem = z.infer<typeof AddressItemSchema>;

export { AddressTagRecords, AddressSchema, AddressItemSchema };
export type { AddressTagRecordsSchema, Address, AddressItem };
