import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetTenantByIdQuery } from "@/app/services/queries/user.queries";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoaderCircle } from "lucide-react";
import { useGetTenantTransactionsQuery } from "@/app/services/queries/transaction.queries";
import { TransactionRequestModel } from "@/app/models/transaction.models";
import { transactionColumns } from "../transaction/table/TransactionColumns";
import { DataTable } from "@/components/data-table/data-table";
import { transactionStatuses } from "../transaction/table/TransactionStatuses";

export const TenantDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const tenantId = location.state?.tenantId;

  // Redirect to tenants list if no tenantId is provided
  useEffect(() => {
    if (!tenantId) {
      navigate("/tenants");
    }
  }, [tenantId, navigate]);

  // Fetch tenant details using the tenantId
  const {
    data: tenant,
    isLoading: isTenantLoading,
    error: tenantError,
  } = useGetTenantByIdQuery(tenantId);
  const { data: transactions, isLoading: isTransactionsLoading } =
    useGetTenantTransactionsQuery(tenantId);

  // Combine loading states for both tenant and transactions
  const isLoading = isTenantLoading || isTransactionsLoading;

  if (isLoading) return <LoaderCircle className="animate-spin" />;
  if (tenantError) return <div>Error loading tenant details</div>;
  if (!tenant) return null;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="text-lg font-bold">
              {tenant.firstName} {tenant.lastName}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 mb-4">
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
        </CardContent>
      </Card>
      <div>
        <DataTable<TransactionRequestModel, any>
          title="Transactions History"
          statuses={transactionStatuses}
          columns={transactionColumns}
          data={(transactions ?? []) as TransactionRequestModel[]}
        />
      </div>
    </div>
  );
};

export default TenantDetailsPage;
