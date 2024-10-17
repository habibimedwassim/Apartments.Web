import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetTenantByIdQuery } from "@/app/services/queries/user.queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

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
  const { data: tenant, isLoading, error } = useGetTenantByIdQuery(tenantId);

  if (isLoading) return <LoaderCircle className="animate-spin" />;
  if (error) return <div>Error loading tenant details</div>;
  if (!tenant) return null;

  return (
    <div className="flex justify-center">
      <Card className="w-full lg:w-2/3 rounded-xl">
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-semibold">
                {tenant.firstName} {tenant.lastName}
              </h1>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 mb-4">
            <p>
              <strong>Email:</strong> {tenant.email}
            </p>
            <p>
              <strong>Phone Number:</strong> {tenant.phoneNumber || "N/A"}
            </p>
            <p>
              <strong>Gender:</strong> {tenant.gender || "N/A"}
            </p>
            <p>
              <strong>Date of Birth:</strong> {tenant.dateOfBirth || "N/A"}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/tenants")}
          >
            Back to Tenants
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TenantDetailsPage;
