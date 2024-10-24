import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { CalendarFilter } from "@/components/ui/calendar-filter";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import ChangeLogsTable from "./ChangeLogsTable";
import { CalendarIcon, CloudDownload } from "lucide-react";
import { LoadingButton } from "@/components/common/button-loading";
import { Card, CardContent } from "@/components/ui/card";

const changeLogEntities = [
  { value: "User", label: "User" },
  { value: "Apartment", label: "Apartment" },
  { value: "UserReport", label: "User Report" },
  { value: "RentTransaction", label: "Rent Transaction" },
  { value: "ApartmentRequest", label: "Apartment Request" },
];

const ChangeLogsPage = () => {
  const [entity, setEntity] = useState<string | undefined>(undefined);
  const [dateFrom, setDateFrom] = useState<Date | undefined>(
    new Date(new Date().setMonth(new Date().getMonth() - 1))
  );
  const [dateTo, setDateTo] = useState<Date | undefined>(new Date());
  const [showTable, setShowTable] = useState(false); // Control when to show the table
  const [isLoading, setIsLoading] = useState(false); // State to track button loading

  // Disable the button if entity is not selected, dates are not set, or dateTo is less than dateFrom
  const isButtonDisabled =
    !entity ||
    !dateFrom ||
    !dateTo ||
    (dateFrom && dateTo && dateTo < dateFrom);

  const handleExecuteQuery = () => {
    if (!isButtonDisabled) {
      // Reset showTable to false to trigger remount
      setShowTable(false);
      // Wait for the state to update before setting it to true again
      setTimeout(() => {
        setShowTable(true);
      }, 0);
    }
  };

  const dateLimit = new Date();
  return (
    <div className="space-y-4">
      <Card>
        <CardContent>
          <div className="flex space-x-4 mt-6">
            {/* Date From Picker */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dateFrom && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateFrom ? format(dateFrom, "PPP") : "Pick a start date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarFilter
                  mode="single"
                  captionLayout="dropdown-buttons"
                  selected={dateFrom}
                  onSelect={setDateFrom}
                  toDate={dateTo}
                />
              </PopoverContent>
            </Popover>

            {/* Date To Picker */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dateTo && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateTo ? format(dateTo, "PPP") : "Pick an end date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarFilter
                  mode="single"
                  captionLayout="dropdown-buttons"
                  selected={dateTo}
                  onSelect={setDateTo}
                  toDate={dateLimit}
                />
              </PopoverContent>
            </Popover>

            {/* Entity Selector */}
            <Select value={entity} onValueChange={setEntity}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select entity" />
              </SelectTrigger>
              <SelectContent>
                {changeLogEntities.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Execute Query Button */}
            <LoadingButton
              type="submit"
              variant="default"
              size="sm"
              isLoading={isLoading}
              loadingText="Searching..."
              disabled={isButtonDisabled}
              icon={<CloudDownload className="h-3.5 w-3.5" />}
              className="h-8 gap-1 ml-2"
              onClick={handleExecuteQuery}
            >
              Search
            </LoadingButton>
          </div>
        </CardContent>
      </Card>

      {/* Render ChangeLogsTable if showTable is true */}
      {showTable && entity && dateFrom && dateTo && (
        <ChangeLogsTable
          entity={entity}
          dateFrom={dateFrom}
          dateTo={dateTo}
          setIsLoading={setIsLoading}
        />
      )}
    </div>
  );
};

export default ChangeLogsPage;
