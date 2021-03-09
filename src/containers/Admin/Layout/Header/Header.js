import React, { useRef, useContext } from "react";

import Logo from "./Logo/Logo";
import Button from "components/Button/Button";
import Modal from "components/Modal/Modal";

import { AppContext } from "context/AppContext";
import contextTypes from "context/contextTypes";

import "./Header.scss";

const Header = () => {
  const logoutModal = useRef();
  const context = useContext(AppContext);

  const openLogoutModal = () => {
    logoutModal.current.openModal();
  };

  const logout = () => {
    context.dispache({ type: contextTypes.REMOVE_USER, payload: { user: "" } });
  };

  return (
    <>
      <div className="app-admin-header-main">
        <Logo url="/admin/" />
        <div className="app-admin-header-navigation">
          <Button onClick={openLogoutModal}>Log out</Button>
        </div>
      </div>
      <Modal
        ref={logoutModal}
        modalTitle="Log out"
        className="dark-modal logout-modal"
        modalFunction={logout}
        functionButtonTitle="yes"
        showTopCloseButton={false}
        showBottomCloseButonnTitle="No"
      >
        Do you want to log out?
      </Modal>
    </>
  );
};

export default Header;
