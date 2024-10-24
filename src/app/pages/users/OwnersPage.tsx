import { LoaderCircle } from "lucide-react";
import { DataTable } from "@/components/data-table/data-table";
import { UserModel } from "@/app/models/user.models";
import { useGetOwnerUsersQuery } from "@/app/services/queries/user.queries";
import { userColumns } from "./table/UsersColumns";

const OwnersPage = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetOwnerUsersQuery();

  const owners = data?.pages.flatMap((page) => page.items) ?? [];

  if (isLoading) {
    return <LoaderCircle className="animate-spin" />;
  }

  return (
    <div>
      <DataTable<UserModel, any>
        title="Owners"
        columns={userColumns("owners")}
        data={owners}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
};

export default OwnersPage;
