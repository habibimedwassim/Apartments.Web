import { LoaderCircle } from "lucide-react";
import { DataTable } from "@/components/data-table/data-table";
import { UserModel } from "@/app/models/user.models";
import { useGetAllUsersQuery } from "@/app/services/queries/user.queries";
import { userColumns } from "./table/UsersColumns";

const UsersPage = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetAllUsersQuery();

  const users = data?.pages.flatMap((page) => page.items) ?? [];

  if (isLoading) {
    return <LoaderCircle className="animate-spin" />;
  }

  return (
    <div>
      <DataTable<UserModel, any>
        title="All Users"
        columns={userColumns("all")}
        data={users}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
};

export default UsersPage;
