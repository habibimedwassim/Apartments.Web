import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, PlusCircle, CircleX, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  useDeleteApartmentPhotoMutation,
  useUploadApartmentPhotosMutation,
} from "@/app/services/mutations/apartment.mutations";
import { useGetApartmentPhotosQuery } from "@/app/services/queries/apartment.queries";
import { ApartmentPhotoModel } from "@/app/models/apartment.models";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/common/button-loading";

interface ApartmentPhotoManagerProps {
  apartmentId: number;
}

const MAX_PHOTOS = 4;

const ApartmentPhotoManager = ({ apartmentId }: ApartmentPhotoManagerProps) => {
  const [photos, setPhotos] = useState<ApartmentPhotoModel[]>([]);
  const [photoFields, setPhotoFields] = useState<
    { id: number; file: File | null }[]
  >([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [photoToDelete, setPhotoToDelete] =
    useState<ApartmentPhotoModel | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { toast } = useToast();

  const uploadMutation = useUploadApartmentPhotosMutation(apartmentId);
  const deleteMutation = useDeleteApartmentPhotoMutation(apartmentId);
  const { data: fetchedPhotos, refetch } =
    useGetApartmentPhotosQuery(apartmentId);

  useEffect(() => {
    if (fetchedPhotos) {
      setPhotos(fetchedPhotos);
    }
  }, [fetchedPhotos]);

  const addPhotoField = () => {
    if (photos.length + photoFields.length >= MAX_PHOTOS) return;
    setPhotoFields((prevFields) => [
      ...prevFields,
      { id: prevFields.length + 1, file: null },
    ]);
  };

  const removePhotoField = (id: number) => {
    setPhotoFields((prevFields) =>
      prevFields.filter((field) => field.id !== id)
    );
  };

  const handlePhotoChange = (id: number, file: File | null) => {
    setPhotoFields((prevFields) =>
      prevFields.map((field) => (field.id === id ? { ...field, file } : field))
    );
  };

  const hasSelectedFiles = () => {
    return photoFields.some((field) => field.file !== null);
  };

  const handleDeletePhoto = (photo: ApartmentPhotoModel) => {
    setPhotoToDelete(photo);
    setOpenDeleteDialog(true);
  };

  const confirmDeletePhoto = () => {
    if (!photoToDelete) return;

    deleteMutation.mutate(photoToDelete.id, {
      onSuccess: (result) => {
        toast({ variant: "default", title: result.message });
        setPhotos((prev) =>
          prev.filter((photo) => photo.id !== photoToDelete.id)
        );
        setPhotoToDelete(null);
        refetch();
      },
      onError: () => {
        toast({ variant: "destructive", title: "Error deleting photo." });
      },
      onSettled: () => {
        setOpenDeleteDialog(false);
      },
    });
  };

  const handleUploadPhotos = () => {
    if (!hasSelectedFiles()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select at least one photo to upload.",
      });
      return;
    }

    const files = photoFields.map((field) => field.file!).filter(Boolean);
    const data = { apartmentPhotos: files };
    uploadMutation.mutate(data, {
      onSuccess: () => {
        toast({ variant: "default", title: "Photos uploaded successfully." });
        setPhotoFields([]);
        refetch();
      },
      onError: () => {
        toast({ variant: "destructive", title: "Error uploading photos." });
      },
    });
  };

  const handleImageClick = (url: string) => {
    setSelectedImage(url);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between items-center">
            <span>Manage Apartment Photos</span>
            {photoFields.length > 0 && (
              <LoadingButton
                variant="default"
                size="sm"
                isLoading={uploadMutation.isPending}
                onClick={handleUploadPhotos}
                loadingText="Uploading..."
                icon={<Upload className="h-3.5 w-3.5" />}
                className="h-8 gap-1 ml-2"
                disabled={!hasSelectedFiles()}
              >
                Upload Photos
              </LoadingButton>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full overflow-auto">
          <div className="flex space-x-4 p-4">
            {photos.map((photo) => (
              <div key={photo.id} className="relative">
                <Dialog>
                  <DialogTrigger asChild>
                    <img
                      src={photo.url}
                      alt="Apartment"
                      className="h-40 w-40 object-cover rounded cursor-pointer"
                      onClick={() => handleImageClick(photo.url)}
                    />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <div className="flex justify-center">
                      <img
                        src={selectedImage || photo.url}
                        alt="Full-size"
                        className="max-w-full h-auto"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeletePhoto(photo)}
                  className="absolute top-2 right-2"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <div className="mt-4">
          <div className="flex justify-start items-center">
            <Button
              id="apartmentPhotos"
              type="button"
              variant="default"
              size="sm"
              onClick={addPhotoField}
              disabled={photos.length + photoFields.length >= MAX_PHOTOS}
              className="h-8 gap-1 ml-2"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Photo
              </span>
            </Button>
          </div>

          {photoFields.map((field) => (
            <div key={field.id} className="flex items-center space-x-4 mt-2">
              <Input
                type="file"
                onChange={(e) =>
                  handlePhotoChange(field.id, e.target.files?.[0] || null)
                }
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removePhotoField(field.id)}
                className="h-8 gap-1 ml-2"
              >
                <CircleX className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>

      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Photo</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this photo? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenDeleteDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <Button variant="destructive" onClick={confirmDeletePhoto}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default ApartmentPhotoManager;
