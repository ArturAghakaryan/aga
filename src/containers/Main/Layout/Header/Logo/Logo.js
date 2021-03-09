import React from "react";

import Link from "components/Link/Link";
import logoLink from "assests/logo/logo.svg"

import "./Logo.scss";

const Logo = ({ url }) => {
  return (
    <div className="header-logo-main">
      <Link to={url} className={"header-logo-main-link"}>
        <picture>
          <img
            src={logoLink}
            alt="Logo"
            className="header-logo-main-img"
          />
        </picture>
      </Link>
    </div>
  );
};

export default Logo;
