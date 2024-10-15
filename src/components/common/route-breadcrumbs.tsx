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

  // Get the path segments (e.g., ["apartments", "edit", "24"])
  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment);

  // Remove numeric segments (like IDs) from breadcrumbs
  const filteredSegments = pathSegments.filter(
    (segment) => !/^\d+$/.test(segment) // This will filter out segments that are purely numeric (e.g., IDs)
  );

  // Generate breadcrumb items
  const breadcrumbs = filteredSegments.map((segment, index) => {
    const isLast = index === filteredSegments.length - 1;
    const to = `/${filteredSegments.slice(0, index + 1).join("/")}`;

    // Convert segment to a title (e.g., "all-apartments" -> "All Apartments")
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
