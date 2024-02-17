import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';
import { toast } from "react-hot-toast";

const useEditCabin = () => {
    const queryClient = useQueryClient(); //permet d'acceder au client (pour la mise a jour du cache par ex.)

    const {mutate: editCabin, isLoading: isEditing } = useMutation({
        mutationFn: ({newCabinData, id}) => {
          createEditCabin(newCabinData, id);
        },
    
        onSuccess: () => {
          toast.success("Cabin successfully edited");
          queryClient.invalidateQueries({ queryKey: ["cabins"] }); // si cela disparait, on actualise le cache
        },
    
        onError: () => toast.error("Cabin not created"),
      });
  return {editCabin, isEditing}
}

export default useEditCabin