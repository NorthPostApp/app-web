const BASE_URL = import.meta.env.VITE_API_ENDPOINT || "http://localhost:3000/";

type ServiceError = { error: string };

export { BASE_URL };
export type { ServiceError };
