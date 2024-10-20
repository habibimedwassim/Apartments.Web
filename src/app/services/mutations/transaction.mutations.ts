import { updateRentTransaction } from "@/app/api/transaction.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateTransactionStatusMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, action }: { id: number; action: string }) =>
      updateRentTransaction(id, action),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: (error: string) => {
      throw error;
    },
  });

  return mutation;
};
