import React, { useRef, useState } from "react";

function Modal({ itemId, url, onDelete, onClose }) {
  const modalRef = useRef(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Open the modal
  const openModal = () => {
    modalRef.current?.showModal();
  };

  // Close the modal
  const closeModal = () => {
    modalRef.current?.close();
  };

  // Handle the delete action
  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await onDelete(itemId, url); // Perform delete operation
    setIsDeleting(false);
    if (result) {
      closeModal();
      onClose(true); // Indicate successful deletion
    } else {
      closeModal();
      onClose(false); // Indicate cancellation
    }
  };

  return (
    <div>
      {/* Trigger modal function on button click */}
      <button onClick={openModal} className="btn btn-error">
        Delete
      </button>

      <dialog id="my_modal_1" className="modal" ref={modalRef}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Deletion Warning</h3>
          <p className="py-4">Are you sure you want to delete the record?</p>
          <div className="modal-action">
            <form method="dialog" className="space-x-2">
              {/* Agree - Trigger delete */}
              <button
                type="button"
                onClick={handleDelete}
                className="btn btn-error"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Agree"}
              </button>
              {/* Disagree - Close modal */}
              <button
                type="button"
                className="btn btn-neutral"
                onClick={() => {
                  closeModal();
                  onClose(false); // Cancel deletion
                }}
              >
                Disagree
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Modal;
