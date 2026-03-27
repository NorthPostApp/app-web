import { setupServer } from "msw/node";
import { handlers } from "@/apis/__mocks__/musicHandlers";

export const server = setupServer(...handlers);
