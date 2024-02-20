// import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
// import CabinTable from "./CabinTable";


const AddCabin = () => {
  return (
    <div>
      <Modal>
      {/* The part of the modal that handles opening it */}
      <Modal.Open opens="cabin-form">
        {/* Button component which when clicked will open the modal window */}
        <Button>Add new cabin</Button>
      </Modal.Open>
      {/* This is the actual content of the modal (the window that will pop up) */}
      <Modal.Window name="cabin-form">
        {/* 'CreateCabinForm' is a component that represents the form for creating a new cabin */}
        <CreateCabinForm />
      </Modal.Window>

      {/* <Modal.Open opens="table">
        <Button>Show table</Button>
      </Modal.Open>
      <Modal.Window name="table">
        <CabinTable />
      </Modal.Window> */}
    </Modal>
    </div>
  )
}

// const AddCabin = () => {
//     const [isOpenModal, setIsOpenModal] = useState(false);
//   return (
//     <div>
//         <Button onClick={() => setIsOpenModal((prev) => !prev)}>
//           Add new cabin
//         </Button>
//         {isOpenModal && 
//         <Modal onClose={() => setIsOpenModal(false)}>
//             <CreateCabinForm onCloseModal={() => setIsOpenModal(false)}/>
//         </Modal>}
//     </div>
//   )
// }

export default AddCabin