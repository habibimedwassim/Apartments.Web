import { useGetTenantsQuery } from "@/app/services/queries/user.queries";
import { TenantModel } from "@/app/models/user.models";
import { DataTable } from "@/components/data-table/data-table";
import { LoaderCircle } from "lucide-react";
import { tenantColumns } from "./table/TenantColumns";

const TenantsPage = () => {
  const { data: tenants, isLoading } = useGetTenantsQuery();

  return isLoading ? (
    <LoaderCircle className="animate-spin" />
  ) : (
    <DataTable<TenantModel, any>
      columns={tenantColumns}
      data={(tenants ?? []) as TenantModel[]}
    />
  );
};

export default TenantsPage;
