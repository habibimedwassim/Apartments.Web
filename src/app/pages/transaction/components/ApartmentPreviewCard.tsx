import { TransactionModel } from "@/app/models/transaction.models";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const ApartmentPreviewCard = ({
  apartment,
}: {
  apartment: TransactionModel["apartment"];
}) => {
  if (!apartment) {
    return <p>No information available</p>;
  }

  const { title, city, street, postalCode, rentAmount, owner } = apartment;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title || "Unknown Apartment"}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Location: {`${street}, ${city}, ${postalCode}`}</p>
        <p>Rent: {`${rentAmount.toFixed(2)} TND`}</p>
        {owner ? (
          <>
            <p>Owner: {owner.fullName}</p>
            <p>Email: {owner.email}</p>
            <p>Phone: {owner.phoneNumber || "--"}</p>
          </>
        ) : (
          <p>Owner information not available</p>
        )}
      </CardContent>
    </Card>
  );
};
