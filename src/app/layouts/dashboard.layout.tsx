import { Outlet } from "react-router-dom";
import { useSidebarStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/common/sidebar";

const DashboardLayout = () => {
  const isOpen = useSidebarStore((state) => state.isOpen);

  return (
    <>
      <Sidebar />
      <main
        className={cn(
          "min-h-screen bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
          isOpen === false ? "lg:ml-[90px]" : "lg:ml-64"
        )}
      >
        <Outlet />
      </main>
    </>
  );
};

export default DashboardLayout;
