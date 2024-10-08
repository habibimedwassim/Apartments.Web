import React from "react";
import { Navbar } from "@/components/common/navbar";
import { RouteBreadcrumbs } from "@/components/common/route-breadcrumbs";

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
}

const PageLayout = ({ title, children }: PageLayoutProps) => {
  return (
    <>
      <Navbar title={title} />
      <RouteBreadcrumbs />
      <div className="p-8">{children}</div>
    </>
  );
};

export default PageLayout;
