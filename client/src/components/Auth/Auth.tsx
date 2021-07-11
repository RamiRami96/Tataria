import React from "react";
import { Login } from "./Login";
import { Register } from "./Register";
import neonCircle from "./neonCircle.png";
import { loginUser, registerUser } from "../../store/authReducer";
import { useDispatch } from "react-redux";

// контейнерная компонента логинизации и регистрации

interface IAuthProps {
  infoAuthMsg: string;
}

export const Auth = ({ infoAuthMsg }: IAuthProps) => {
  const dispatch = useDispatch();
  return (
    <div className="row auth mt-5">
      <div className="col-12 col-lg-6">
        <nav>
          <div
            className="nav nav-tabs d-flex justify-content-center"
            id="nav-tab"
            role="tablist"
          >
            <button
              className="nav-link active"
              id="nav-home-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-home"
              type="button"
              role="tab"
              aria-controls="nav-home"
              aria-selected="true"
            >
              Войти
            </button>
            <button
              className="nav-link"
              id="nav-profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-profile"
              type="button"
              role="tab"
              aria-controls="nav-profile"
              aria-selected="false"
            >
              Регистрация
            </button>
          </div>
        </nav>
        <div className="tab-content mt-5" id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id="nav-home"
            role="tabpanel"
            aria-labelledby="nav-home-tab"
          >
            <Login
              dispatch={dispatch}
              loginUser={loginUser}
              infoAuthMsg={infoAuthMsg}
            />
          </div>
          <div
            className="tab-pane fade"
            id="nav-profile"
            role="tabpanel"
            aria-labelledby="nav-profile-tab"
          >
            <Register
              dispatch={dispatch}
              registerUser={registerUser}
              infoAuthMsg={infoAuthMsg}
            />
          </div>
        </div>
      </div>
      <div className="d-none d-lg-flex col-lg-6 d-flex justify-content-center align-items-center auth__poster">
        <img className="circle" src={neonCircle} alt="circle" />
        <div className="cassette">
          <div className="head"></div>
          <div className="label">
            <div className="cutout">
              <div className="reel_hole">
                <div className="gear"></div>
              </div>
              <div className="reel_hole">
                <div className="gear"></div>
              </div>
              <div className="window">
                <div className="spool"></div>
                <div className="spool"></div>
              </div>
            </div>
          </div>
          <div className="accents">
            <div className="screw i1"></div>
            <div className="screw i2"></div>
            <div className="screw i3"></div>
            <div className="screw i4"></div>
            <div className="screw i5"></div>
            <div className="hole i1"></div>
            <div className="hole i2"></div>
            <div className="hole i3"></div>
            <div className="hole i4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
