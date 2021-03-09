import React from "react";

import PropTypes from "prop-types";

import "./Button.scss";

const Button = ({ className = "", onClick, children, loading = false }) => {
  return (
    <button className={`btn ${className}`} onClick={onClick} disabled={loading}>
      {children}
    </button>
  );
};

Button.protoTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  loading: PropTypes.bool
};

export default Button;
