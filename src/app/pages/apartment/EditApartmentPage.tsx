import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateApartmentModel } from "@/app/models/apartment.models";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  ChevronsUpDown,
  Check,
  Edit,
} from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CITIES, getProvinceAndPostalCode } from "@/app/constants/cities";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useApartmentByIdService } from "@/app/services/apartment.services"; // To fetch the apartment by ID
import { updateApartmentService } from "@/app/services/apartment.services"; // To handle apartment update
import { updateApartmentSchema } from "@/app/schemas/apartment.schemas"; // Validation schema for update
import { useLocation, useNavigate } from "react-router-dom";
import { LoadingButton } from "@/components/common/button-loading";

const EditApartmentPage = () => {
  const { toast } = useToast();
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [openProvincePicker, setOpenProvincePicker] = useState(false);
  const [openCityPicker, setOpenCityPicker] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  // Fetch apartment data by ID
  const apartmentId = location.state?.apartmentId;

  // Redirect if no apartment ID is passed
  useEffect(() => {
    if (!apartmentId) {
      navigate("/apartments");
    }
  }, [apartmentId, navigate]);

  const {
    data: apartment,
    isLoading: isFetchingApartment,
    isError,
    error,
  } = useApartmentByIdService(apartmentId);

  // Error handling for fetching apartment
  useEffect(() => {
    if (isError) {
      toast({
        variant: "destructive",
        title: "Fetch Error",
        description: error.message,
      });
      navigate("/apartments");
    }
  }, [isError, error, navigate, toast]);

  // Initialize form with react-hook-form
  const form = useForm<UpdateApartmentModel>({
    resolver: zodResolver(updateApartmentSchema),
    defaultValues: {
      title: "",
      city: "",
      street: "",
      postalCode: "",
      description: "",
      size: 0,
      rentAmount: 0,
      availableFrom: new Date().toISOString().split("T")[0],
    },
  });

  // Update form values and local state when apartment data is fetched
  useEffect(() => {
    if (apartment) {
      form.reset({
        title: apartment.title,
        city: apartment.city,
        street: apartment.street,
        postalCode: apartment.postalCode,
        description: apartment.description,
        size: apartment.size,
        rentAmount: apartment.rentAmount,
        availableFrom: apartment.availableFrom,
      });

      const [province, postalCode] = getProvinceAndPostalCode(apartment.city);
      setSelectedProvince(province || "");
      setSelectedCity(apartment.city);
      setPostalCode(postalCode || "");
      setDate(
        apartment.availableFrom ? new Date(apartment.availableFrom) : undefined
      );
    }
  }, [apartment, form]);

  // Prevent submitting the form while fetching or during mutation
  const mutation = updateApartmentService();

  const onSubmit = (data: UpdateApartmentModel) => {
    const isRentAmountChanged =
      apartment &&
      data.rentAmount?.toFixed(2) !== apartment.rentAmount.toFixed(2);

    // Round rentAmount only if it has changed
    if (isRentAmountChanged && data.rentAmount) {
      data.rentAmount = parseFloat(data.rentAmount.toFixed(2));
    } else {
      delete data.rentAmount;
    }

    data.availableFrom = date ? date.toISOString().split("T")[0] : undefined;

    mutation.mutate(
      { id: apartmentId, data },
      {
        onSuccess: () => {
          toast({
            variant: "default",
            title: "Apartment updated successfully!",
          });
          navigate("/apartments");
        },
        onError: (error) => {
          toast({
            variant: "destructive",
            title: "Update Error",
            description: error.message,
          });
        },
      }
    );
  };

  const handleProvinceSelect = (province: string) => {
    setSelectedProvince(province);
    setSelectedCity("");
    setPostalCode("");

    // Set values with `shouldDirty` to mark the form as dirty
    form.setValue("city", "", { shouldDirty: true });
    form.setValue("postalCode", "", { shouldDirty: true });

    setOpenProvincePicker(false);
  };

  const handleCitySelect = (city: string) => {
    const [_, postalCode] = getProvinceAndPostalCode(city);
    setSelectedCity(city);
    setPostalCode(postalCode || "");

    // Set values with `shouldDirty` to mark the form as dirty
    form.setValue("city", city, { shouldDirty: true });
    form.setValue("postalCode", postalCode || "", { shouldDirty: true });

    setOpenCityPicker(false);
  };

  const resetForm = () => {
    if (!apartment) return;

    form.reset(apartment);

    const [province, postalCode] = getProvinceAndPostalCode(apartment.city);

    // Reset province, city, and postal code based on the apartment data
    setSelectedProvince(province || "");
    setSelectedCity(apartment?.city || "");
    setPostalCode(postalCode || "");

    setDate(new Date(apartment?.availableFrom || ""));
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between">
              <h1>Edit Apartment</h1>
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  onClick={resetForm}
                  disabled={mutation.isPending || isFetchingApartment}
                  className="h-8 px-2 lg:px-3"
                >
                  Reset
                  <Cross2Icon className="ml-2 h-4 w-4" />
                </Button>
                <LoadingButton
                  type="submit"
                  form="apartment-edit-form"
                  variant="outline"
                  size="sm"
                  isLoading={mutation.isPending || isFetchingApartment}
                  loadingText="Updating..."
                  disabled={
                    mutation.isPending ||
                    isFetchingApartment ||
                    !form.formState.isDirty
                  }
                  icon={<Edit className="h-3.5 w-3.5" />}
                  className="h-8 gap-1 ml-2"
                >
                  Update Apartment
                </LoadingButton>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              id="apartment-edit-form"
            >
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="title">Title</FormLabel>
                      <FormControl>
                        <Input
                          id="title"
                          placeholder="Enter apartment title"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormItem>
                  <FormLabel htmlFor="province">Province</FormLabel>
                  <Popover
                    open={openProvincePicker}
                    onOpenChange={setOpenProvincePicker}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        id="province"
                        variant="outline"
                        role="combobox"
                        aria-expanded={openProvincePicker}
                        className="w-full justify-between"
                      >
                        {selectedProvince || "Select province..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search province..." />
                        <CommandList>
                          <CommandEmpty>No province found.</CommandEmpty>
                          <CommandGroup>
                            {Object.keys(CITIES).map((province) => (
                              <CommandItem
                                key={province}
                                onSelect={() => handleProvinceSelect(province)}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    selectedProvince === province
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {province}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>

                <FormItem>
                  <FormLabel htmlFor="city">City</FormLabel>
                  <Popover
                    open={openCityPicker}
                    onOpenChange={setOpenCityPicker}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        id="city"
                        variant="outline"
                        role="combobox"
                        aria-expanded={openCityPicker}
                        className="w-full justify-between"
                        disabled={!selectedProvince}
                      >
                        {selectedCity || "Select city..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search city..." />
                        <CommandList>
                          <CommandGroup>
                            {CITIES[selectedProvince]?.map((cityObj) => (
                              <CommandItem
                                key={cityObj.city}
                                onSelect={() => handleCitySelect(cityObj.city)}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    selectedCity === cityObj.city
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {cityObj.city}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>

                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="postalCode">Postal Code</FormLabel>
                      <FormControl>
                        <Input
                          id="postalCode"
                          placeholder="Postal code"
                          {...field}
                          value={postalCode}
                          readOnly
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="street">Street</FormLabel>
                      <FormControl>
                        <Input
                          id="street"
                          placeholder="Enter street"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="size"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="size">Size (Rooms)</FormLabel>
                      <FormControl>
                        <Input
                          id="size"
                          type="number"
                          placeholder="Enter size"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rentAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="rentAmount">Rent Amount</FormLabel>
                      <FormControl>
                        <Input
                          id="rentAmount"
                          type="number"
                          placeholder="Enter rent amount"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="availableFrom"
                  render={() => (
                    <FormItem>
                      <FormLabel htmlFor="availableFrom">
                        Available From
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="availableFrom"
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
              </div>

              <div className="mt-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditApartmentPage;
