import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins';

const useCabins = () => {
    const {
        //eslint-disable-next-line
          data: cabins, error, isLoading,
        } = useQuery({
          queryKey: ["cabins"],
          // queryFn: () => getCabins(),
          queryFn: getCabins,
        });
  return {cabins, error, isLoading}
}

export default useCabins