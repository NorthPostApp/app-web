import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

export default function AppLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        closeButton
        toastOptions={{
          style: {
            color: "var(--text-color)",
            boxShadow: "var(--base-shadow)",
            borderRadius: "1rem",
          },
        }}
      />
      <Outlet />
    </QueryClientProvider>
  );
}
