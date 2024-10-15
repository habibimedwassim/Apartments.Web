import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AccountDetailsPage from "./AccountDetailsPage";
import UpdateAccountPassword from "./UpdateAccountPassword";
import UpdateAccountEmail from "./UpdateAccountEmail";

export default function SettingsPage() {
  return (
    <div>
      <Card className="shadow-md pt-4">
        <CardContent>
          <Tabs defaultValue="details" className="space-y-4">
            <TabsList>
              <TabsTrigger value="details">Account Details</TabsTrigger>
              <TabsTrigger value="password">Update Password</TabsTrigger>
              <TabsTrigger value="email">Update Email</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <AccountDetailsPage />
            </TabsContent>
            <TabsContent value="password">
              <UpdateAccountPassword />
            </TabsContent>
            <TabsContent value="email">
              <UpdateAccountEmail />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
