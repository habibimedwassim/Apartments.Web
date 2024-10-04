import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MoreHorizontal,
  PlusCircle,
  ListFilter,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import { useApartments } from "@/services/apartment.services";
import { formatToLocalDateTime } from "@/lib/utils";

const ITEMS_PER_PAGE = 10;
const NO_IMAGE_PLACEHOLDER = "no-image.jpg"; // Path to your "No Image" placeholder

const ApartmentsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data } = useApartments();

  const apartmentsData = Array.isArray(data) ? [...data] : [];

  const filteredData = apartmentsData.filter((apartment) => {
    const location = `${apartment.city} ${apartment.street} ${apartment.postalCode}`;
    const sizeString = `S+${apartment.size}`;
    const rentAmountString = apartment.rentAmount.toString();
    const status = apartment.isOccupied ? "Occupied" : "Available";
    const availableFrom = apartment.availableFrom
      ? apartment.availableFrom
      : "--";

    // Apply tab filtering
    if (
      activeTab === "available" &&
      (apartment.isOccupied || apartment.isDeleted)
    )
      return false;
    if (
      activeTab === "occupied" &&
      (apartment.isDeleted || !apartment.isOccupied)
    )
      return false;
    if (activeTab === "archived" && !apartment.isDeleted) return false;

    // Apply search query filtering
    return (
      apartment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sizeString.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rentAmountString.includes(searchQuery) ||
      status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      availableFrom.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="all" onValueChange={(value) => setActiveTab(value)}>
        <div className="flex flex-col sm:flex-row items-center">
          <TabsList className="flex flex-wrap justify-center sm:justify-start">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="available">Available</TabsTrigger>
            <TabsTrigger value="occupied">Occupied</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
          <div className="mt-2 sm:mt-0 sm:ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-7 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Active
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" className="h-7 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Product
              </span>
            </Button>
          </div>
        </div>
        <TabsContent value={activeTab}>
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Apartments</CardTitle>
              <CardDescription>
                Manage your apartments and view their sales performance.
              </CardDescription>
              <div className="relative mt-4 sm:mt-0 flex-1 md:grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      <span className="sr-only">img</span>
                    </TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Rent Amount</TableHead>
                    <TableHead>Size (Rooms)</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Created Date
                    </TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Available From
                    </TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.map((apartment) => (
                    <TableRow key={apartment.id}>
                      <TableCell className="hidden sm:table-cell">
                        <img
                          alt="Apartment img"
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src={
                            apartment.apartmentPhotos.length > 0
                              ? apartment.apartmentPhotos[0].url
                              : NO_IMAGE_PLACEHOLDER
                          }
                          width="64"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {apartment.title}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            apartment.isDeleted
                              ? "secondary"
                              : apartment.isOccupied
                              ? "outline"
                              : "outline"
                          }
                        >
                          {apartment.isDeleted
                            ? "Archived"
                            : apartment.isOccupied
                            ? "Occupied"
                            : "Available"}
                        </Badge>
                      </TableCell>
                      <TableCell>${apartment.rentAmount}</TableCell>
                      <TableCell>S+{apartment.size}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {formatToLocalDateTime(apartment.createdDate)}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {apartment.availableFrom
                          ? apartment.availableFrom
                          : "--"}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex flex-col items-center justify-between gap-2 sm:flex-row">
              <div className="text-xs text-muted-foreground">
                Showing{" "}
                <strong>
                  {filteredData.length > 0
                    ? (currentPage - 1) * ITEMS_PER_PAGE + 1
                    : 0}
                </strong>{" "}
                to{" "}
                <strong>
                  {Math.min(currentPage * ITEMS_PER_PAGE, filteredData.length)}
                </strong>{" "}
                of <strong>{filteredData.length}</strong> apartments
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1 || filteredData.length === 0}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={
                    currentPage === totalPages || filteredData.length === 0
                  }
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default ApartmentsPage;
