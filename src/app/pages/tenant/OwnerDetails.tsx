import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetTenantByIdQuery as useGetOwnerByIdQuery } from "@/app/services/queries/user.queries";
import { Card, CardContent } from "@/components/ui/card";
import { LoaderCircle } from "lucide-react";
import { useGetOwnerApartmentsQuery } from "@/app/services/queries/apartment.queries";
import { ApartmentModel } from "@/app/models/apartment.models";
import { getApartmentColumns } from "../apartment/table/ApartmentsColumns";
import { DataTable } from "@/components/data-table/data-table";
import { apartmentStatuses } from "../apartment/table/ApartmentStatuses";

export const OwnerDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const ownerId = location.state?.userId;

  useEffect(() => {
    if (!ownerId) {
      navigate("/owners");
    }
  }, [ownerId, navigate]);

  const apartmentColumns = getApartmentColumns(true);

  const {
    data: owner,
    isLoading: isOwnerLoading,
    error: ownerError,
  } = useGetOwnerByIdQuery(ownerId);

  const {
    data,
    isLoading: isApartmentsLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetOwnerApartmentsQuery(ownerId);

  const apartments = data?.pages.flatMap((page) => page.items) ?? [];
  const isLoading = isOwnerLoading || isApartmentsLoading;

  if (isLoading) return <LoaderCircle className="animate-spin" />;
  if (ownerError) return <div>Error loading owner details</div>;
  if (!owner) return null;

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex">
            <div className="w-1/3">
              <img
                id="owner-avatar"
                alt="#"
                src={owner.avatar ?? "#"}
                width={500}
                height={700}
                className="object-cover w-full h-[300px] rounded-lg"
                style={{ objectFit: "cover", aspectRatio: "4/3" }}
                onError={(e) => {
                  e.currentTarget.src = "/no-img.svg";
                }}
              />
            </div>
            <div className="w-2/3 pl-4">
              <div className="grid gap-4 mb-4">
                <h1>
                  <strong>
                    {owner.firstName} {owner.lastName}
                  </strong>
                </h1>
                <div>
                  <strong>Email:</strong> {owner.email}
                </div>
                <div>
                  <strong>Phone Number:</strong> {owner.phoneNumber || "N/A"}
                </div>
                <div>
                  <strong>Gender:</strong> {owner.gender || "N/A"}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div>
        <DataTable<ApartmentModel, any>
          title="Owned Apartments"
          statuses={apartmentStatuses}
          columns={apartmentColumns}
          data={apartments}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </div>
    </div>
  );
};

export default OwnerDetailsPage;
