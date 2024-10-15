// import {
//   getMyApartments,
//   getApartmentById,
//   createApartment,
//   updateApartment,
//   archiveRestoreApartment,
// } from "@/app/api/apartment.api";
// import {
//   UpdateApartmentModel,
//   ApartmentResponseModel,
// } from "@/app/models/apartment.models";
// import { useToast } from "@/hooks/use-toast";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// export const getApartmentsService = () => {
//   return useQuery({
//     queryKey: ["apartments"],
//     queryFn: () => getMyApartments(),
//     staleTime: 300000,
//   });
// };

// export const useApartmentByIdService = (id: number) => {
//   return useQuery({
//     queryKey: ["apartments", id],
//     queryFn: () => getApartmentById(id),
//   });
// };

// export const createApartmentService = () => {
//   const { toast } = useToast();
//   const queryClient = useQueryClient();
//   const mutation = useMutation({
//     mutationFn: createApartment,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["apartments"] });
//       toast({
//         variant: "default",
//         title: "Apartment created successfully!",
//       });
//     },
//     onError: (error) => {
//       toast({
//         variant: "destructive",
//         title: "Create Apartment Error",
//         description: error.message,
//       });
//     },
//   });

//   return mutation;
// };

// export const archiveApartmentService = (id: number, isRestore: boolean) => {
//   const { toast } = useToast();
//   const queryClient = useQueryClient();
//   const mutation = useMutation({
//     mutationFn: () => archiveRestoreApartment(id),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["apartments"] });
//       toast({
//         variant: "default",
//         title: isRestore
//           ? "Apartment restored successfully!"
//           : "Apartment deleted successfully!",
//       });
//     },
//     onError: (error) => {
//       toast({
//         variant: "destructive",
//         title: isRestore ? "Restore Apartment Error" : "Delete Apartment Error",
//         description: error.message,
//       });
//     },
//   });

//   return mutation;
// };

// // Fetch a single apartment by ID
// // export const getApartmentByIdService = async (
// //   id: number
// // ): Promise<ApartmentResponseModel> => {
// //   try {
// //     return await getApartmentById(id);
// //   } catch (error: any) {
// //     throw new Error(`Failed to fetch apartment: ${error.message}`);
// //   }
// // };

// // Update an apartment
// export const updatezApartmentService = async (
//   id: number,
//   data: UpdateApartmentModel
// ) => {
//   try {
//     await updateApartment(id, data);
//     return "Apartment updated successfully.";
//   } catch (error: any) {
//     throw new Error(`Failed to update apartment: ${error.message}`);
//   }
// };

// export const updateApartmentService = () => {
//   const { toast } = useToast();
//   const queryClient = useQueryClient();
//   const mutation = useMutation({
//     mutationFn: ({ id, data }: { id: number; data: UpdateApartmentModel }) =>
//       updateApartment(id, data),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["apartments"] });
//       toast({
//         variant: "default",
//         title: "Apartment updated successfully!",
//       });
//     },
//     onError: (error) => {
//       toast({
//         variant: "destructive",
//         title: "Create Apartment Error",
//         description: error.message,
//       });
//     },
//   });

//   return mutation;
// };
// // Delete an apartment
// export const deleteApartmentService = async (id: number) => {
//   try {
//     await archiveRestoreApartment(id);
//     return "Apartment deleted successfully.";
//   } catch (error: any) {
//     throw new Error(`Failed to delete apartment: ${error.message}`);
//   }
// };
