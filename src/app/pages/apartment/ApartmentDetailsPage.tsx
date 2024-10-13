import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ApartmentDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const apartmentId = location.state?.apartmentId; // Retrieve the apartmentId from state
  useEffect(() => {
    if (!apartmentId) {
      navigate("/apartments");
    }
  }, [apartmentId, navigate]);

  // You can now use apartmentId to fetch apartment details from the backend
  return (
    <div>
      <h1>Apartment Details</h1>
      {apartmentId ? (
        <p>Fetching details for apartment ID: {apartmentId}</p>
      ) : (
        <p>Apartment ID not provided.</p>
      )}
    </div>
  );
};

export default ApartmentDetailsPage;
