import { SUPPORTED_LANGUAGES } from "@/consts/app-config";
import z from "zod";

const AddressBookSchema = z.object({
  savedAddresses: z.record(z.enum(SUPPORTED_LANGUAGES), z.array(z.string())),
});

export { AddressBookSchema };
