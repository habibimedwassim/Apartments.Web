import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetApartmentByIdQuery } from "@/app/services/queries/apartment.queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Edit } from "lucide-react";
import { apartmentStatuses } from "./table/ApartmentStatuses";

export function ApartmentDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const apartmentId = location.state?.apartmentId;
  useEffect(() => {
    if (!apartmentId) {
      navigate("/apartments");
    }
  }, [apartmentId, navigate]);

  const {
    data: apartment,
    isLoading,
    error,
  } = useGetApartmentByIdQuery(apartmentId);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading apartment details</div>;
  if (!apartment) return null;

  const apartmentPhotos = apartment.apartmentPhotos.length
    ? apartment.apartmentPhotos
    : [{ url: "/no-img.svg" }];

  const getStatus = (statusValue: string) => {
    const status = apartmentStatuses.find(
      (status) => status.value === statusValue
    );

    if (!status) {
      return null;
    }

    return (
      <div className="flex items-center ml-2">
        {status.icon && (
          <status.icon className="ml-1" style={{ color: status.color }} />
        )}
      </div>
    );
  };

  return (
    <div className="flex justify-center">
      <Card className="flex flex-col lg:flex-row w-full rounded-xl">
        {/* Left Side: Carousel at 35% width */}
        <div className="lg:w-[35%] w-full p-4">
          <Carousel className="relative w-full">
            <CarouselContent>
              {apartmentPhotos.slice(0, 4).map((photo, index) => (
                <CarouselItem key={index}>
                  {photo.url === "/no-img.svg" ? (
                    <img
                      alt="No Image Available"
                      src={photo.url}
                      className="object-cover w-full h-[300px] rounded-lg"
                    />
                  ) : (
                    <Dialog>
                      <DialogTrigger asChild>
                        <img
                          id={index.toString()}
                          alt={`Apartment photo ${index + 1}`}
                          src={photo.url}
                          width={500}
                          height={700}
                          className="object-cover w-full h-[300px] rounded-lg cursor-pointer"
                          style={{ objectFit: "cover", aspectRatio: "4/3" }}
                          onClick={() => setSelectedImage(photo.url)}
                          onError={(e) => {
                            e.currentTarget.src = "/no-img.svg";
                          }}
                        />
                      </DialogTrigger>
                      <DialogContent aria-describedby="image-dialog-description">
                        <DialogHeader>
                          <DialogTitle></DialogTitle>
                        </DialogHeader>
                        <div className="flex justify-center">
                          <img
                            src={selectedImage || photo.url}
                            alt="Full-size image"
                            className="max-w-full h-auto"
                          />
                        </div>
                        {/* Visually hidden description for accessibility */}
                        <p id="image-dialog-description" className="sr-only">
                          Viewing full-size image of apartment
                        </p>
                      </DialogContent>
                    </Dialog>
                  )}
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 transform -translate-y-1/2"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </CarouselPrevious>
            <CarouselNext>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </CarouselNext>
          </Carousel>
        </div>

        {/* Right Side: Apartment Details at 65% width */}
        <div className="lg:w-[65%] w-full">
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <h1 className="text-xl font-semibold">{apartment.title}</h1>
                  {getStatus(apartment.status)}
                </div>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() =>
                    navigate("/apartments/edit", { state: { apartmentId } })
                  }
                >
                  <Edit className="h-3.5 w-3.5 mr-2" />
                  Edit Apartment
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 mb-4">{apartment.description}</p>
            <div className="grid gap-2 mb-4">
              <p>
                <strong>Location:</strong> {apartment.street}, {apartment.city},{" "}
                {apartment.postalCode}
              </p>
              <p>
                <strong>Rent Amount:</strong> {apartment.rentAmount} TND / month
              </p>
              <p>
                <strong>Available From:</strong> {apartment.availableFrom}
              </p>
              <p>
                <strong>Size:</strong> {apartment.size} rooms
              </p>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}

export default ApartmentDetailsPage;
