import React from "react";
import PropTypes from "prop-types";
import Switch from '@material-ui/core/Switch';

import "./Field.scss";

const Field = ({
  className = "",
  label = null,
  type = "text",
  id = null,
  name = null,
  value = '',
  onChange = () => { },
  error = null,
  placeholder,
  switchColor = "primary"
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
      case "switch":
        return (
          <Switch id={id} checked={value} onChange={onChange} name={name} color={switchColor} classes={{ root: "app-switch-contnet", colorPrimary: `app-switch is-${switchColor}`, checked: "is-checked" ,track:"app-switch-track"}} />
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
  value: PropTypes.any,
  onChange: PropTypes.func,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  switchColor: PropTypes.string
};

export default Field;
