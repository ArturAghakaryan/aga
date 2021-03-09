import React from "react";

import PropTypes from "prop-types";

import "./Field.scss";

const Field = ({
  className = "",
  label = null,
  type = "text",
  id = null,
  name = null,
  value = '',
  onChange = () => {},
  error = null,
  placeholder,
}) => {
  const switchResult = () => {
    switch (type) {
      case "textarea":
        return (
          <textarea
            type={type}
            id={id}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
          />
        );
      default:
        return (
          <input
            type={type}
            id={id}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
          />
        );
    }
  };

  return (
    <div className={`fild--grup ${className}${error ? " is-error" : ""}`}>
      {label && <label htmlFor={id}>{label}</label>}
      {switchResult()}
      {error && <span>{error}</span>}
    </div>
  );
};

Field.protoTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  placeholder: PropTypes.string,
};

export default Field;
