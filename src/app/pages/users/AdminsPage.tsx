import { LoaderCircle } from "lucide-react";
import { DataTable } from "@/components/data-table/data-table";
import { UserModel } from "@/app/models/user.models";
import { useGetAdminUsersQuery } from "@/app/services/queries/user.queries";
import { userColumns } from "./table/UsersColumns";

const AdminsPage = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetAdminUsersQuery();

  const admins = data?.pages.flatMap((page) => page.items) ?? [];

  if (isLoading) {
    return <LoaderCircle className="animate-spin" />;
  }

  return (
    <div>
      <DataTable<UserModel, any>
        title="Admin Users"
        columns={userColumns("admins")}
        data={admins}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
};

export default AdminsPage;
