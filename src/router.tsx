import { createBrowserRouter } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import OwnerPage from "./pages/OwnerPage";
import AdminPage from "./pages/AdminPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />, // Assuming this will be the main entry point initially
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
  {
    path: "/owner",
    element: <OwnerPage />,
  },
]);

export default router;
