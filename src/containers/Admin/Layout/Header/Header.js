import React, { useState } from "react";
import { connect } from 'react-redux'

import Logo from "./Logo/Logo";
import Button from "components/Button/Button";
import Modal from "components/Modal/Modal";
import fbService from "api/fbService";
import { removeReduxUser } from "actions/userActions";

import "./Header.scss";

const Header = (props) => {
  const [headerConfig, setHeaderConfig] = useState({
    isOpenLogoutModal: false,
  });

  const openLogoutModal = () => {
    setHeaderConfig({
      ...headerConfig,
      isOpenLogoutModal: true,
    })
  };

  const logout = async () => {
    await fbService.userService.logout();
    props.removeReduxUser()
    localStorage.removeItem('user')
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
        isOpen={headerConfig.isOpenLogoutModal}
        modalTitle="Log out"
        className="dark-modal logout-modal"
        action={logout}
        actionButtonTitle="yes"
        showTopCloseButton={false}
        showBottomCloseButonnTitle="No"
      >
        Do you want to log out?
      </Modal>
    </>
  );
};

const mapDispacheToProps = {
  removeReduxUser
}

export default connect(null, mapDispacheToProps)(Header);
