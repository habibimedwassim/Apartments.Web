import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { useGetAdminDashboardQuery } from "@/app/services/queries/dashboard.queries";
import { Users, FileText, Activity } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function AdminDashboardPage() {
  const {
    data: dashboardData,
    isLoading,
    isError,
  } = useGetAdminDashboardQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !dashboardData) {
    return <div>Error fetching dashboard data.</div>;
  }

  // Define the chart configuration for "Reports By Month"
  const chartConfig = {
    reports: {
      label: "Reports",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between">
                <span>Total Users</span>
                <Users />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h1 className="text-xl font-bold">{dashboardData.totalUsers}</h1>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between">
                <span>Total Owners</span>
                <Users />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h1 className="text-xl font-bold">{dashboardData.totalOwners}</h1>
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
            <h1 className="text-xl font-bold">{dashboardData.totalTenants}</h1>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between">
                <span>Active Users (Last 30 Days)</span>
                <Activity />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h1 className="text-xl font-bold">
              {dashboardData.activeUsersLast30Days}
            </h1>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Reports By Month Chart */}
        <Card className="order-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Reports Per Month</CardTitle>
            <CardDescription>
              Monthly reports trends for this year
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={dashboardData.reportsByMonth}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar
                  dataKey="reports"
                  fill={chartConfig.reports.color}
                  radius={8}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Recent Reports Section */}
        <Card className="order-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Recent Reports</CardTitle>
              <Button
                variant="default"
                size="sm"
                className="p-1 text-xs h-8 w-8"
                onClick={() => navigate("/admin/reports")}
              >
                <FileText className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>Latest submitted reports.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dashboardData.recentReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>{report.id}</TableCell>
                    <TableCell>{report.message}</TableCell>
                    <TableCell>{report.status}</TableCell>
                    <TableCell>
                      {new Date(report.createdDate).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Recent Change Logs Section */}
      <div className="grid grid-cols-1 gap-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Recent Change Logs</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>Latest system change logs.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Entity</TableHead>
                  <TableHead>Changed By</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dashboardData.recentChangeLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{log.id}</TableCell>
                    <TableCell>{log.entityType}</TableCell>
                    <TableCell>{log.changedBy}</TableCell>
                    <TableCell>
                      {new Date(log.changedAt).toLocaleDateString()}
                    </TableCell>
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
