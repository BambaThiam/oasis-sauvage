import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';
import { toast } from "react-hot-toast";

const useCreateCabin = () => {

    const queryClient = useQueryClient(); //permet d'acceder au client (pour la mise a jour du cache par ex.)
  
    const {mutate: createCabin, isLoading: isCreating } = useMutation({
        mutationFn: (newCabin) => {
          createEditCabin(newCabin);
        },
    
        onSuccess: () => {
          toast.success("Cabin created");
          queryClient.invalidateQueries({ queryKey: ["cabins"] }); // si cela disparait, on actualise le cache
        },
    
        onError: () => toast.error("Cabin not created"),
      });
  return {createCabin, isCreating}
}

export default useCreateCabin