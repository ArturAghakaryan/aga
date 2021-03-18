import React, { useRef, forwardRef } from "react";

import Button from "components/Button/Button";
import Modal from "components/Modal/Modal";
import Singup from "containers/Admin/Auth/Singup/Singup";

import "./Users.scss";

const Users = () => {
  const createModal = useRef();
  const singup = useRef();
  const openCreateModal = () => {
    createModal.current.openModal();
  };

  const crateUser = () => {
    singup.current.handleSingup();
    setTimeout(() => {
      if (!singup.current.errorState.error) {
        createModal.current.closeModal();
      }
    }, 3000);
  };

  return (
    <div className="app-admin-users">
      <div className="app-admin-users__title">Users list</div>
      <div className="app-admin-users__buttons">
        <Button onClick={openCreateModal} className="add-new-user">
          Add new user
        </Button>
      </div>

      <Modal
        ref={createModal}
        showTopCloseButton={false}
        modalTitle="Crate user"
        className="dark-modal crate-user-modal"
        modalFunction={crateUser}
        functionButtonTitle="Crate user"
        // functionButtonDisabled={true}
      >
        <Singup ref={singup} />
      </Modal>
    </div>
  );
};

export default Users;
