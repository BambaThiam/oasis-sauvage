
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { deleteCabins as deleteCabinAPI } from '../../services/apiCabins';
import { deleteCabin as deleteCabinAPI } from '../../services/apiCabins';
import { toast } from "react-hot-toast";

function useDeleteCabin() {
    const queryClient = useQueryClient(); //permet d'acceder au client (pour la mise a jour du cache par ex.)

  const { isLoading: isDeleting, mutate : deleteCabin } = useMutation({
    mutationFn: (id) => deleteCabinAPI(id),

    onSuccess: () => {
      toast.success("Cabin deleted");
      queryClient.invalidateQueries({ queryKey: ["cabins"] }); // si ça réussi, on actualise le cache
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return {
    isDeleting,
    deleteCabin
  }
}

export default useDeleteCabin