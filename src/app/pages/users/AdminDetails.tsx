import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetTenantByIdQuery as useGetAdminByIdQuery } from "@/app/services/queries/user.queries";
import { Card, CardContent } from "@/components/ui/card";
import { LoaderCircle } from "lucide-react";

export const AdminDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const adminId = location.state?.userId;

  useEffect(() => {
    if (!adminId) {
      navigate("/admin/admins");
    }
  }, [adminId, navigate]);

  const {
    data: admin,
    isLoading: isAdminLoading,
    error: adminError,
  } = useGetAdminByIdQuery(adminId);

  if (isAdminLoading) return <LoaderCircle className="animate-spin" />;
  if (adminError) return <div>Error loading owner details</div>;
  if (!admin) return null;

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex">
            <div className="w-1/3">
              <img
                id="owner-avatar"
                alt="#"
                src={admin.avatar ?? "#"}
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
                    {admin.firstName} {admin.lastName}
                  </strong>
                </h1>
                <div>
                  <strong>Email:</strong> {admin.email}
                </div>
                <div>
                  <strong>Phone Number:</strong> {admin.phoneNumber || "N/A"}
                </div>
                <div>
                  <strong>Gender:</strong> {admin.gender || "N/A"}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDetailsPage;
