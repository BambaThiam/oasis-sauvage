import styled from "styled-components";
import { useState } from "react";

import { formatCurrency } from "../../utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { deleteCabins, updateCabin } from "../../services/apiCabins";
import { deleteCabins } from "../../services/apiCabins";
import { toast } from "react-hot-toast";
import CreateCabinForm from "./CreateCabinForm";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

//eslint-disable-next-line
function CabinRow({ cabin }) {
  const [showForm, setShowForm] = useState(false);
  const {
    //eslint-disable-next-line
    id: cabinID, name,image,maxCapacity,regularPrice,discount,
  } = cabin;

  //eslint-disable-next-line
  // const [edit, setEdit] = useState({
  //   name: false,
  //   image: false,
  //   maxCapacity: false,
  //   regularPrice: false,
  //   discount: false
  // })

  const queryClient = useQueryClient(); //permet d'acceder au client (pour la mise a jour du cache par ex.)

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: (id) => deleteCabins(id),

    onSuccess: () => {
      toast.success("Cabin deleted");
      queryClient.invalidateQueries({ queryKey: ["cabins"] }); // si ça réussi, on actualise le cache
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

 

  //eslint-disable-next-line
  // const { isLoading: isUpdating, mutate : updateCabin1 } = useMutation({
  //   mutationFn: (id) => {
  //     return updateCabin(id, edit);
  //   },
  //   onSuccess: () => {
  //     toast.success("Cabin updated");
  //     queryClient.invalidateQueries({ queryKey: ["cabins"] }); // si cela disparait, on actualise le cache
  //   },
  //   onError: (error) => {
  //     toast.error(error.message);
  //   },
  // })

  return (
    <>
    <TableRow role="row">
      <Img src={image} alt={name} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {/* <input onChange={(e) => setEdit({ ...edit, regularPrice: e.target.value })} >{formatCurrency(regularPrice)}</input> */}
      <Discount>{formatCurrency(discount)}</Discount>
      <div>
        <button onClick={() => setShowForm((show) => !show)} >Edit</button>
        <button onClick={() => mutate(cabinID)} disabled={isDeleting}>
          Delete
        </button>
      </div>
    </TableRow>
    {showForm && (
      <CreateCabinForm cabinToEdit={cabin}  />
    )}
    </>
  );
}

export default CabinRow;
