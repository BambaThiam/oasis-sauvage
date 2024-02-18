import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from "react-hot-toast";
import { updateSetting as updateSettingApi} from '../../services/apiSettings';

const useUpdateSetting = () => {
    const queryClient = useQueryClient(); //permet d'acceder au client (pour la mise a jour du cache par ex.)

    const {mutate: updateSetting, isLoading: isUpdating } = useMutation({
        mutationFn: updateSettingApi,
    
        onSuccess: () => {
          toast.success("Settings successfully edited");
          queryClient.invalidateQueries({ queryKey: ["settings"] }); // si cela disparait, on actualise le cache
        },
    
        onError: () => toast.error("Settings not created"),
      });
  return {updateSetting, isUpdating}
}

export default useUpdateSetting