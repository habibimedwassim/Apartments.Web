import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useGetOwnerDashboardQuery } from "@/app/services/queries/dashboard.queries";
import {
  CircleDollarSign,
  HouseIcon,
  SquareArrowOutUpRight,
  Users,
} from "lucide-react";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function OwnerDashboard() {
  const [activeTab, setActiveTab] = useState("rent");
  const {
    data: dashboardData,
    isLoading,
    isError,
  } = useGetOwnerDashboardQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !dashboardData) {
    return <div>Error fetching dashboard data.</div>;
  }

  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "#8884d8",
    },
  };

  const getNavigatePath = () => {
    switch (activeTab) {
      case "rent":
        return "/rental-requests";
      case "leave":
        return "/leave-requests";
      case "dismiss":
        return "/dismiss-requests";
      default:
        return "/";
    }
  };

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between">
                <span>Total Revenue</span>
                <CircleDollarSign />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">
              {dashboardData.totalRevenue} TND
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between">
                <span>Total Tenants</span>
                <Users />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">{dashboardData.totalTenants}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between">
                <span>Total Apartments</span>
                <HouseIcon />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">
              {dashboardData.totalOwnedApartments}
            </p>
            <p>
              {dashboardData.occupiedApartments} occupied,{" "}
              {dashboardData.availableApartments} available
            </p>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardContent>
            <Tabs
              defaultValue="rent"
              onValueChange={(value) => setActiveTab(value)}
              className="space-y-4 mt-4"
            >
              <div className="flex justify-between sm:items-center">
                <TabsList>
                  <TabsTrigger value="rent">Rental</TabsTrigger>
                  <TabsTrigger value="leave">Leave</TabsTrigger>
                  <TabsTrigger value="dismiss">Dismiss</TabsTrigger>
                </TabsList>
                <Button
                  variant="default"
                  size="sm"
                  className="p-1 text-xs h-8 w-8"
                  onClick={() => navigate(getNavigatePath())}
                >
                  <SquareArrowOutUpRight className="h-4 w-4" />
                </Button>
              </div>
              <TabsContent value="rent">
                <Table>
                  <TableCaption>A list of recent rent requests.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dashboardData.recentRentRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>{request.status}</TableCell>
                        <TableCell>{request.requestDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              <TabsContent value="leave">
                <Table>
                  <TableCaption>A list of recent leave requests.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Reason</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dashboardData.recentLeaveRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>{request.status}</TableCell>
                        <TableCell>{request.requestDate}</TableCell>
                        <TableCell>{request.reason || "--"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              <TabsContent value="dismiss">
                <Table>
                  <TableCaption>
                    A list of recent dismiss requests.
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Reason</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dashboardData.recentDismissRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>{request.status}</TableCell>
                        <TableCell>{request.requestDate}</TableCell>
                        <TableCell>{request.reason || "--"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Revenue By Month</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart
                data={dashboardData.revenueByMonth}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip />
                <Bar dataKey="revenue" fill="var(--color-revenue)" radius={5} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Recent Transactions</CardTitle>
              <Button
                variant="default"
                size="sm"
                className="p-1 text-xs h-8 w-8"
                onClick={() => navigate("/transactions")}
              >
                <SquareArrowOutUpRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>A list of recent transactions.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Date From</TableHead>
                  <TableHead>Date To</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dashboardData.recentTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.dateFrom}</TableCell>
                    <TableCell>{transaction.dateTo || "--"}</TableCell>
                    <TableCell>{transaction.rentAmount} TND</TableCell>
                    <TableCell>{transaction.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
