import { StrictMode } from "react";
import RootRouter from "@/app/routes/router";
import { createRoot } from "react-dom/client";
import { Toaster } from "@/components/ui/toaster";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/components/common/theme-provider";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        {<RouterProvider router={RootRouter} />}
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
