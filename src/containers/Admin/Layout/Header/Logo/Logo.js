import React from "react";

import Link from "components/Link/Link";

import logoLink from "assests/logo/logo.svg"

import './Logo.scss'

const Logo = ({url}) => {
  return (
    <div className="app-admin-header-logo-main">
      <Link to={url} className={"app-admin-header-logo-main-link"}>
      <picture>
          <img src={logoLink} alt='Logo' className="app-admin-header-logo-main-img" />
        </picture>
      </Link>
    </div>
  );
};

export default Logo;
