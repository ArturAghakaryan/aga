import React, { useState } from "react";
import { connect } from 'react-redux'

import Logo from "./Logo/Logo";
import Button from "components/Button/Button";
import Modal from "components/Modal/Modal";
import fbService from "api/fbService";
// import { AppContext } from "context/AppContext";
// import contextTypes from "context/contextTypes";
import { reduxActionTypes } from "reducers/reduxActionTypes";

import "./Header.scss";

const Header = (props) => {
  // const logoutModal = useRef();
  // const context = useContext(AppContext);
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
    await fbService.logout();
    // context.dispache({ type: contextTypes.REMOVE_USER });
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
  removeReduxUser: () => ({
    type: reduxActionTypes.REMOVE_USER,
  })
}

export default connect(null, mapDispacheToProps)(Header);
