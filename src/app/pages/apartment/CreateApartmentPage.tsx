import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateApartmentModel } from "@/app/models/apartment.models";
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
import { createApartmentSchema } from "@/app/schemas/apartment.schemas";
import { useState } from "react";
import {
  Calendar as CalendarIcon,
  ChevronsUpDown,
  Check,
  PlusCircle,
  CircleX,
} from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CITIES } from "@/app/constants/cities";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Cross2Icon } from "@radix-ui/react-icons";
import { createApartmentService } from "@/app/services/apartment.services";

// The CreateApartmentPage component
const CreateApartmentPage = () => {
  const { toast } = useToast();
  const [photoFields, setPhotoFields] = useState<
    { id: number; file: File | null }[]
  >([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [_, setPostalCode] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [openProvincePicker, setOpenProvincePicker] = useState(false);
  const [openCityPicker, setOpenCityPicker] = useState(false);

  const form = useForm<CreateApartmentModel>({
    resolver: zodResolver(createApartmentSchema),
    defaultValues: {
      title: "",
      city: "",
      street: "",
      postalCode: "",
      description: "",
      size: 0,
      rentAmount: 0,
      availableFrom: new Date().toISOString().split("T")[0],
      apartmentPhotos: [],
    },
  });

  const mutation = createApartmentService();

  const onSubmit = (data: CreateApartmentModel) => {
    if (!data.size) {
      data.size = 0;
    }
    data.availableFrom = date ? date.toISOString().split("T")[0] : "";
    data.apartmentPhotos = photoFields.map((field) => field.file!);
    mutation.mutate(data);

    mutation.isSuccess && form.reset();
  };

  // Add a new empty photo input field (limit to 4)
  const addPhotoField = () => {
    if (photoFields.length >= 4) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You can upload a maximum of 4 photos.",
      });
      return;
    }
    setPhotoFields((prevFields) => [
      ...prevFields,
      { id: prevFields.length + 1, file: null }, // Unique id for each field
    ]);
  };

  // Remove photo input field by ID
  const removePhotoField = (id: number) => {
    setPhotoFields((prevFields) =>
      prevFields.filter((field) => field.id !== id)
    );
  };

  // Handle photo input change
  const handlePhotoChange = (id: number, file: File) => {
    setPhotoFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, file: file } : field
      )
    );
  };

  const handleProvinceSelect = (province: string) => {
    setSelectedProvince(province);
    setSelectedCity("");
    setPostalCode("");
    form.setValue("city", "");
    form.setValue("postalCode", "");
    setOpenProvincePicker(false);
  };

  const handleCitySelect = (city: string, postalCode: string) => {
    setSelectedCity(city);
    setPostalCode(postalCode);
    form.setValue("city", city);
    form.setValue("postalCode", postalCode);
    setOpenCityPicker(false);
  };

  const resetForm = () => {
    form.reset();
    setSelectedProvince("");
    setSelectedCity("");
    setPostalCode("");
    setDate(new Date());
    setPhotoFields([]);
  };

  const showReset = () => {
    return (
      form.formState.isDirty ||
      photoFields.length > 0 ||
      selectedProvince ||
      selectedCity ||
      (date && date.toDateString() !== new Date().toDateString())
    );
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between">
              <h1>New Apartment</h1>
              <div className="flex justify-end">
                {showReset() && (
                  <Button
                    variant="ghost"
                    onClick={resetForm}
                    disabled={mutation.isPending}
                    className="h-8 px-2 lg:px-3"
                  >
                    Reset
                    <Cross2Icon className="ml-2 h-4 w-4" />
                  </Button>
                )}

                {/* Add Apartment Button */}
                <Button
                  type="submit"
                  form="apartment-form" // Make sure it triggers the form submission
                  variant="outline"
                  size="sm"
                  disabled={mutation.isPending}
                  className="h-8 gap-1 ml-2"
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    {mutation.isPending ? "Adding..." : "Add Apartment"}
                  </span>
                </Button>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} id="apartment-form">
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
                                onSelect={() =>
                                  handleCitySelect(
                                    cityObj.city,
                                    cityObj.postalCode
                                  )
                                }
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

              <div className="mt-4">
                <FormItem>
                  {/* Flex container for the label and the button */}
                  <div className="flex justify-between items-center">
                    <FormLabel htmlFor="apartmentPhotos">
                      Apartment Photos
                    </FormLabel>
                    <Button
                      id="apartmentPhotos"
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addPhotoField}
                      disabled={photoFields.length >= 4}
                      className="h-8 gap-1 ml-2"
                    >
                      <PlusCircle className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add Photo
                      </span>
                    </Button>
                  </div>

                  {photoFields.map((field) => (
                    <div
                      key={field.id}
                      className="flex items-center space-x-4 mt-2"
                    >
                      <Input
                        type="file"
                        onChange={(e) =>
                          handlePhotoChange(
                            field.id,
                            e.target.files?.[0] as File
                          )
                        }
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removePhotoField(field.id)}
                        disabled={mutation.isPending}
                        className="h-8 gap-1 ml-2"
                      >
                        <CircleX className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ))}
                </FormItem>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateApartmentPage;
