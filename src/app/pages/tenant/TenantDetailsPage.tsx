import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetTenantByIdQuery } from "@/app/services/queries/user.queries";
import { Card, CardContent } from "@/components/ui/card";
import { LoaderCircle } from "lucide-react";
import { useGetTenantTransactionsQuery } from "@/app/services/queries/transaction.queries";
import { TransactionModel } from "@/app/models/transaction.models";
import { transactionColumns } from "../transaction/table/TransactionColumns";
import { DataTable } from "@/components/data-table/data-table";
import { transactionStatuses } from "../transaction/table/TransactionStatuses";

export const TenantDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const tenantId = location.state?.userId;

  useEffect(() => {
    if (!tenantId) {
      navigate("/tenants");
    }
  }, [tenantId, navigate]);

  const {
    data: tenant,
    isLoading: isTenantLoading,
    error: tenantError,
  } = useGetTenantByIdQuery(tenantId);

  const {
    data,
    isLoading: isTransactionsLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetTenantTransactionsQuery(tenantId, { pageNumber: 1 });

  const transactions = data?.pages.flatMap((page) => page.items) ?? [];
  const isLoading = isTenantLoading || isTransactionsLoading;

  if (isLoading) return <LoaderCircle className="animate-spin" />;
  if (tenantError) return <div>Error loading tenant details</div>;
  if (!tenant) return null;

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex">
            <div className="w-1/3">
              <img
                id="tenant-avatar"
                alt="#"
                src={tenant.avatar ?? "#"}
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
                    {tenant.firstName} {tenant.lastName}
                  </strong>
                </h1>
                <div>
                  <strong>Email:</strong> {tenant.email}
                </div>
                <div>
                  <strong>Phone Number:</strong> {tenant.phoneNumber || "N/A"}
                </div>
                <div>
                  <strong>Gender:</strong> {tenant.gender || "N/A"}
                </div>
                <div>
                  <strong>Date of Birth:</strong> {tenant.dateOfBirth || "N/A"}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div>
        <DataTable<TransactionModel, any>
          title="Transactions History"
          statuses={transactionStatuses}
          columns={transactionColumns(true)}
          data={transactions}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </div>
    </div>
  );
};

export default TenantDetailsPage;
