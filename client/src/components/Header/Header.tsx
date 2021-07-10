import React from "react";
import logo from "./logo.svg";
import { Link, useLocation } from "react-router-dom";
import { IUser } from "../../interfaces/interfaces";
import { IoIosMenu } from "react-icons/io";

interface IHeaderProps {
  user: IUser;
  isAuth: boolean;
  dispatch: Function;
  logoutUser: Function;
}

export const Header: React.FC<IHeaderProps> = ({
  user,
  isAuth,
  dispatch,
  logoutUser,
}) => {
  const { pathname } = useLocation();
  const splitLocation = pathname.split("/");
  return (
    <div className=" d-flex justify-content-between header">
      <div className="header__logo py-4">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className="header__mobile d-flex d-md-none pt-4">
        <IoIosMenu
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
        />

        <div
          className="offcanvas offcanvas-end p-2"
          tabIndex={-1}
          id="offcanvasRight"
          aria-labelledby="offcanvasRightLabel"
        >
          <div className="offcanvas-header">
            <h6 className="text-white" id="offcanvasRightLabel">
              С возвращением, {user.nickname}!
            </h6>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="p-0">
              <li>
                <Link to="/">Чарт</Link>
              </li>
              <li>
                <Link to="/profile"> {isAuth ? "Профиль" : "Войти"}</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="header__menu d-none d-md-flex py-4">
        <ul className="d-flex ">
          <li>
            <Link
              className={splitLocation[1] === "" ? "activeLink" : ""}
              to="/"
            >
              Чарт
            </Link>
          </li>

          <li>
            <Link
              className={splitLocation[1] === "profile" ? "activeLink" : ""}
              to="/profile"
            >
              {isAuth ? "Профиль" : "Войти"}
            </Link>
          </li>
          {isAuth && (
            <li>
              <Link to="/profile" onClick={() => dispatch(logoutUser())}>
                Выйти
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
