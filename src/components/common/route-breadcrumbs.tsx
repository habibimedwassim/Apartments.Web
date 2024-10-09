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

export function RouteBreadcrumbs() {
  const location = useLocation();

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
          // If it's the last segment (like "edit"), don't make it clickable
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
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {breadcrumbs.map((breadcrumb, index) => (
            <React.Fragment key={index}>
              <BreadcrumbSeparator />
              {breadcrumb}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
