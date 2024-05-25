import { forwardRef } from "react";
import ButtonWrapper from "./ButtonWrapper";
import "./RemoveItemModal.css"; // Import CSS file

const RemoveItemModal = forwardRef(({ id, deleteItemHandler }, ref) => {
  const cancelHandler = () => {
    console.log("CLOSE");
    ref.current.close();
  };
  return (
    <dialog ref={ref} className="dialog-section">
      <div className="dialog-container">
        <h2>Are you sure you want to remove Tshirt {id}</h2>
        <div className="buttons-container">
          <ButtonWrapper
            className="ButtonWrapper"
            clickHandler={() => deleteItemHandler(id)}
          >
            YES
          </ButtonWrapper>
          <ButtonWrapper className="ButtonWrapper" clickHandler={cancelHandler}>
            NO
          </ButtonWrapper>
        </div>
      </div>
    </dialog>
  );
});

export default RemoveItemModal;
