import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as MyLogo } from "../assets/images/dq-logo.svg";
import KieLogo from "../assets/images/kie-logo.png";
import InputComponent from "../common/input/input";
import ButtonComponent from "../common/button/button";
import "./login.scss";

export default function Login() {
  let navigate = useNavigate();

  const routeChange = () => {
    let path = "/home";
    navigate(path);
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <div className="top-triangle"></div>
          <div className="logo">
            <MyLogo className="logo-component" />
          </div>
          <div className="bottom-triangle"></div>
          <img src={KieLogo} className="kie-logo" alt="KieSquare" />
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="login-form-container">
            <form className="row">
              <span className="login-title">Login</span>
              <div className="mb-3">
                <InputComponent
                  id={"userEmail"}
                  inputLabel={"Email"}
                  inputType={"email"}
                  placeholder={"Enter your Email"}
                />
              </div>
              <div className="mb-3">
                <InputComponent
                  id={"passwordText"}
                  inputLabel={"Password"}
                  inputType={"password"}
                  placeholder={"Enter your Password"}
                />
              </div>
              <div className="d-flex flex-row justify-content-between mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    Remember me
                  </label>
                </div>
                <span className="link">Forgot password?</span>
              </div>
              <ButtonComponent
                btnClass={"btn-primary w-100"}
                btnName={"Login"}
                onClick={routeChange}
              />
              <div className="d-flex">
                <span className="orOption">Or</span>
              </div>
              <ButtonComponent
                btnClass={"btn-outline-secondary w-100"}
                btnName={"Sign in with Google"}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
