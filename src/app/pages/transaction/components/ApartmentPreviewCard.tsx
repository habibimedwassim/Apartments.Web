import { TransactionModel } from "@/app/models/transaction.models";

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
    <div>
      <p>
        <strong>{title || "Unknown Apartment"}</strong>
      </p>
      <p>Location: {`${street}, ${city}, ${postalCode}`}</p>
      <p>Rent: {`${rentAmount.toFixed(2)} TND`}</p>
      {owner ? (
        <>
          <p>
            <strong></strong>
          </p>
          <p>Email: {owner.email}</p>
          <p>Phone: {owner.phoneNumber || "--"}</p>
        </>
      ) : (
        <p>Owner information not available</p>
      )}
    </div>
  );
};
