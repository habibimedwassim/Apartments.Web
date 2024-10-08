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

  // Get the path segments (e.g., ["apartments", "all-apartments"])
  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment);

  // Generate breadcrumb items
  const breadcrumbs = pathSegments.map((segment, index) => {
    // Construct the path to this breadcrumb
    const to = `/${pathSegments.slice(0, index + 1).join("/")}`;
    const isLast = index === pathSegments.length - 1;

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
