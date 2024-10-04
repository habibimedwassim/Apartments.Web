import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import RootRouter from "@/router"; // Updated to import the main router from the routes folder
import { ThemeProvider } from "@/components/common/ThemeProvider"; // Removed ".tsx" from import as it is unnecessary
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster"; // Removed ".tsx" from import as it is unnecessary

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {<RouterProvider router={RootRouter} />}
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
