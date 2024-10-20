import { Link, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "../ui/breadcrumb";
import React from "react";
import { useAuthStore } from "@/hooks/use-store";
import { USER_ROLE } from "@/app/constants/user-role";

export function RouteBreadcrumbs() {
  const location = useLocation();
  const { role } = useAuthStore();

  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment);

  const filteredSegments = pathSegments.filter(
    (segment) => !/^\d+$/.test(segment)
  );

  const breadcrumbs = filteredSegments.map((segment, index) => {
    const isLast = index === filteredSegments.length - 1;
    const to = `/${filteredSegments.slice(0, index + 1).join("/")}`;

    const title =
      segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");

    return (
      <BreadcrumbItem key={to}>
        {isLast ? (
          <BreadcrumbPage>{title}</BreadcrumbPage>
        ) : (
          <BreadcrumbLink asChild>
            <Link to={to}>{title}</Link>
          </BreadcrumbLink>
        )}
      </BreadcrumbItem>
    );
  });

  return (
    <div className="container pt-8 px-4 sm:px-8">
      <Breadcrumb>
        <BreadcrumbList>
          {role !== USER_ROLE.ADMIN && (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {breadcrumbs.length > 0 && <BreadcrumbSeparator />}
            </>
          )}

          {breadcrumbs.map((breadcrumb, index) => (
            <React.Fragment key={index}>
              {index > 0 && <BreadcrumbSeparator />}
              {breadcrumb}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
