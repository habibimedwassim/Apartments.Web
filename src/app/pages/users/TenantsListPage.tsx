import { LoaderCircle } from "lucide-react";
import { DataTable } from "@/components/data-table/data-table";
import { UserModel } from "@/app/models/user.models";
import { useGetTenantUsersQuery } from "@/app/services/queries/user.queries";
import { userColumns } from "./table/UsersColumns";

const TenantsListPage = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetTenantUsersQuery();

  const tenants = data?.pages.flatMap((page) => page.items) ?? [];

  if (isLoading) {
    return <LoaderCircle className="animate-spin" />;
  }

  return (
    <div>
      <DataTable<UserModel, any>
        title="Tenants"
        columns={userColumns("tenants")}
        data={tenants}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
};

export default TenantsListPage;
