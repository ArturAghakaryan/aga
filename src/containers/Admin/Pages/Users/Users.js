import React, { useRef, useState } from "react";

import Button from "components/Button/Button";
import Modal from "components/Modal/Modal";
import Singup from "containers/Admin/Auth/Singup/Singup";

import "./Users.scss";

const Users = () => {
  const singup = useRef();

  const [userConfig, setUserConfig] = useState({
    isOpenUserCrateModal: false
  })

  const openCreateUserModal = () => {
    setUserConfig({
      ...userConfig,
      isOpenUserCrateModal: true
    })
  };

  const closeCreateUserModal = () => {
    setUserConfig({
      ...userConfig,
      isOpenUserCrateModal: false
    })
  };

  const crateUser = async () => {
    await singup.current.handleSingup();
    if (!singup.current.errorState.error) {
      await closeCreateUserModal()
    }
  };

  return (
    <div className="app-admin-users">
      <div className="app-admin-users__title">Users list</div>
      <div className="app-admin-users__buttons">
        <Button onClick={openCreateUserModal} className="add-new-user">
          Add new user
        </Button>
      </div>

      <Modal
        isOpen={userConfig.isOpenUserCrateModal}
        modalTitle="Crate user"
        className="dark-modal crate-user-modal"
        action={crateUser}
        actionButtonTitle="Crate user"
        onClose={closeCreateUserModal}
        showTopCloseButton={false}

      >
        <Singup ref={singup} />
      </Modal>
    </div>
  );
};

export default Users;
