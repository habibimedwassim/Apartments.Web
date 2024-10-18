import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { useState } from "react";
import { CalendarIcon, Edit } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { format, startOfToday } from "date-fns";
import { cn } from "@/lib/utils";
import { useProfileStore } from "@/hooks/use-store";
import { updateProfileSchema } from "@/app/schemas/user.schemas"; // Validation schema for user update
import { useUpdateProfileMutation } from "@/app/services/mutations/user.mutations";
import { UpdateUserModel } from "@/app/models/user.models";
import { LoadingButton } from "@/components/common/button-loading";
import { Cross2Icon } from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarFilter } from "@/components/ui/calendar-filter";

const AccountDetailsPage = () => {
  const { profile, setProfile } = useProfileStore();
  const updateMutation = useUpdateProfileMutation();
  const { toast } = useToast();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    profile?.dateOfBirth ? new Date(profile.dateOfBirth) : undefined
  );

  // Initialize form with react-hook-form
  const form = useForm<UpdateUserModel>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      firstName: profile?.firstName || "",
      lastName: profile?.lastName || "",
      phoneNumber: profile?.phoneNumber || "",
      gender: profile?.gender || "",
      dateOfBirth: profile?.dateOfBirth || undefined,
    },
  });

  const handleSelectedDate = (date: any) => {
    setSelectedDate(date);
    form.setValue(
      "dateOfBirth",
      date ? format(date, "yyyy-MM-dd") : undefined,
      { shouldDirty: true }
    );
  };
  // Reset form fields with profile data
  const handleReset = () => {
    if (profile) {
      form.reset(profile);
      setSelectedDate(
        profile.dateOfBirth ? new Date(profile.dateOfBirth) : undefined
      );
      form.setValue("gender", profile.gender);
    }
  };

  // Handle form submission
  const onSubmit = (data: UpdateUserModel) => {
    // Create a payload with only the changed values
    const payload: Partial<UpdateUserModel> = {};

    if (data.firstName !== profile?.firstName) {
      payload.firstName = data.firstName;
    }

    if (data.lastName !== profile?.lastName) {
      payload.lastName = data.lastName;
    }

    if (data.phoneNumber !== profile?.phoneNumber) {
      payload.phoneNumber = data.phoneNumber;
    }

    if (data.gender !== profile?.gender) {
      payload.gender = data.gender;
    }

    const formattedDateOfBirth = selectedDate
      ? format(selectedDate, "yyyy-MM-dd")
      : undefined;
    if (formattedDateOfBirth !== profile?.dateOfBirth) {
      payload.dateOfBirth = formattedDateOfBirth;
    }

    if (Object.keys(payload).length === 0) {
      toast({
        title: "No changes detected",
      });
      return; // No changes, don't submit
    }

    updateMutation
      .mutateAsync({ data: payload })
      .then((updatedProfile) => {
        setProfile(updatedProfile);
        toast({
          title: "Profile updated successfully",
        });
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          description: err,
        });
      });
  };
  const formattedSelectedDate = selectedDate
    ? format(selectedDate, "yyyy-MM-dd")
    : undefined;

  const isFiltered =
    form.formState.isDirty || formattedSelectedDate !== profile?.dateOfBirth;

  const dateLimit = new Date(
    startOfToday().getFullYear() - 18,
    startOfToday().getMonth(),
    startOfToday().getDate()
  );
  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold">Account Details</h2>
              <div className="flex justify-end">
                {isFiltered && (
                  <Button
                    variant="ghost"
                    onClick={handleReset}
                    disabled={updateMutation.isPending}
                    className="h-8 px-2 lg:px-3"
                  >
                    Reset
                    <Cross2Icon className="ml-2 h-4 w-4" />
                  </Button>
                )}
                <LoadingButton
                  type="submit"
                  form="account-details-form"
                  variant="default"
                  size="sm"
                  isLoading={updateMutation.isPending}
                  loadingText="Saving..."
                  disabled={updateMutation.isPending || !form.formState.isDirty}
                  icon={<Edit className="h-3.5 w-3.5" />}
                  className="h-8 gap-1 ml-2"
                >
                  Save Changes
                </LoadingButton>
              </div>
            </div>
          </CardTitle>
          <CardDescription>Update your details here.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              id="account-details-form"
            >
              <div className="grid grid-cols-2 gap-4">
                {/* First Name */}
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="firstName">First Name</FormLabel>
                      <FormControl>
                        <Input
                          id="firstName"
                          placeholder="Enter first name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Last Name */}
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="lastName">Last Name</FormLabel>
                      <FormControl>
                        <Input
                          id="lastName"
                          placeholder="Enter last name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email (Disabled) */}
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id="email"
                    name="email"
                    value={profile.email}
                    disabled
                    autoComplete="email"
                  />
                </FormItem>

                {/* Phone Number */}
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          id="phoneNumber"
                          placeholder="Enter phone number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="gender">Gender</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || undefined}
                        name="gender"
                      >
                        <SelectTrigger id="gender" name="gender">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Date of Birth */}
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={() => (
                    <FormItem>
                      <FormLabel htmlFor="dateOfBirth">Date of Birth</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !selectedDate && "text-muted-foreground"
                            )}
                            id="dateOfBirth"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDate
                              ? format(selectedDate, "PPP")
                              : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarFilter
                            mode="single"
                            captionLayout="dropdown-buttons"
                            selected={selectedDate}
                            onSelect={handleSelectedDate}
                            fromYear={1960}
                            toDate={dateLimit}
                          />
                        </PopoverContent>
                      </Popover>
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

export default AccountDetailsPage;
