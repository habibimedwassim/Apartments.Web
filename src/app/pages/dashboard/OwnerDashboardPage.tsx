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
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { useGetOwnerDashboardQuery } from "@/app/services/queries/dashboard.queries";

export function OwnerDashboard() {
  const {
    data: dashboardData,
    isLoading,
    isError,
  } = useGetOwnerDashboardQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !dashboardData) {
    return <div>Error fetching dashboard data.</div>;
  }

  return (
    <div className="grid gap-4">
      {/* Top Section - Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">
              {dashboardData.totalRevenue} TND
            </p>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Total Tenants</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">{dashboardData.totalTenants}</p>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Total Apartments</CardTitle>
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

      {/* Middle Section - Tables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Recent Requests Table */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Recent Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>A list of recent requests.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Reason</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dashboardData.recentRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.requestType}</TableCell>
                    <TableCell>{request.status}</TableCell>
                    <TableCell>{request.requestDate}</TableCell>
                    <TableCell>{request.reason || "--"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Transactions Table */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
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

      {/* Bottom Section - Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue By Month</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart
            width={600}
            height={300}
            data={dashboardData.revenueByMonth}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#8884d8" />
          </BarChart>
        </CardContent>
      </Card>
    </div>
  );
}
