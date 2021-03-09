import React, { forwardRef, useState, useImperativeHandle } from "react";
import { toast } from "react-toastify";

import fbService from "api/fbService";
import Field from "components/Field/Field";

import "./Singup.scss";

const Singup = forwardRef((props, ref) => {
  const [loading, setLoading] = useState(true);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [errorState, setErrorState] = useState({
    emailError: "",
    passwordError: "",
    error: false,
  });

  const changeHandler = (name, value) => {
    setCredentials({
      ...credentials,
      [name]: value,
    });
    setErrorState({
      ...errorState,
      emailError: "",
      passwordError: "",
    });
  };

  const handleSingup = async () => {
    try {
      setLoading(true);
      const user = await fbService.singup(credentials);
      setErrorState({
        ...errorState,
        error: false,
      });
      toast.success(`User crated`);
    } catch (err) {
      setErrorState({
        ...errorState,
        emailError: err.code === "auth/invalid-email" ? err.message : "",
        passwordError: err.code === "auth/weak-password" ? err.message : "",
        error: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({ handleSingup, loading, errorState }));

  return (
    <div className="app-admin-singup">
      <div className="app-admin-singup__content">
        <div className="app-admin-singup__content-form">
          <Field
            className="app-admin-singup__content-form-field"
            placeholder="Email"
            type="text"
            value={credentials.email}
            error={errorState.emailError}
            onChange={(e) => {
              changeHandler("email", e.target.value);
            }}
          />
          <Field
            className="app-admin-singup__content-form-field"
            placeholder="Password"
            type="password"
            value={credentials.password}
            error={errorState.passwordError}
            onChange={(e) => {
              changeHandler("password", e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
});

export default Singup;
