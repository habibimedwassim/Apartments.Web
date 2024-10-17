import { StrictMode } from "react";
import RootRouter from "@/app/routes/router";
import { createRoot } from "react-dom/client";
import { Toaster } from "@/components/ui/toaster";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/components/common/theme-provider";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "./index.css";
import SignalRSetup from "@/hooks/signalr-setup";

const queryClient = new QueryClient();

// Main Render Function
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <SignalRSetup />
        <RouterProvider router={RootRouter} />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
