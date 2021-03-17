import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux"

import "./Login.scss";

import logoLink from "assests/logo/logo.svg";
import Field from "components/Field/Field";
import Button from "components/Button/Button";
import fbService from "api/fbService";
// import { AppContext } from "context/AppContext";
// import contextTypes from "context/contextTypes";
import validate from "utils/validate";
import { reduxActionTypes } from "reducers/reduxActionTypes";

const Login = (props) => {
  // const context = useContext(AppContext);
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [errorState, setErrorState] = useState({
    emailError: "",
    passwordError: "",
  });

  useEffect(() => {
    document.body.classList.add("is-admin-login");
    return () => {
      document.body.classList.remove("is-admin-login");
    };
  }, []);

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

  const handleLogin = async () => {
    let errors = validate(credentials);
    if (!errors) {
      try {
        setLoading(true);
        const user = await fbService.login(credentials);
        // context.dispache({ type: contextTypes.SET_USER, payload: { user } });
        props.setReduxUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        await history.push("/admin");
      } catch (err) {
        setErrorState({
          ...errorState,
          emailError: err.code === "auth/invalid-email" ? err.message : "",
          passwordError: err.code === "auth/wrong-password" ? err.message : "",
        });
      } finally {
        setLoading(false);
      }
    } else {
      setErrorState({
        ...errorState,
        emailError: errors.email ? errors.email.message : "",
        passwordError: errors.password ? errors.password.message : "",
      });
    }
  };

  return (
    <div className="app-admin-login">
      <div className="app-admin-login__inner">
        {loading && (
          <div className="app-admin-login__loader">
            <div className="app-loader-container">
              <div className="app-loader"></div>
            </div>
          </div>
        )}
        <div className="app-admin-login__content">
          <div className="app-admin-login__content-logo">
            <picture>
              <img src={logoLink} alt="Logo" />
            </picture>
          </div>
          <div className="app-admin-login__content-form">
            <div className="app-admin-login__content-form-title">Sign In</div>
            <Field
              className="app-admin-login__content-form-field"
              placeholder="Email"
              type="text"
              value={credentials.email}
              error={errorState.emailError}
              onChange={(e) => {
                changeHandler("email", e.target.value);
              }}
            />
            <Field
              className="app-admin-login__content-form-field"
              placeholder="Password"
              type="password"
              value={credentials.password}
              error={errorState.passwordError}
              onChange={(e) => {
                changeHandler("password", e.target.value);
              }}
            />
            <Button
              onClick={handleLogin}
              className="app-admin-login__content-form-button"
              loading={loading}
            >
              Log in
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// const mapStateToProps = (state) => ({
//   user: state.user
// })

const mapDispacheToProps = {
  setReduxUser: (user) => ({
    type: reduxActionTypes.SET_USER,
    payload: {
      user,
    }
  })
}

export default connect(null, mapDispacheToProps)(Login);
