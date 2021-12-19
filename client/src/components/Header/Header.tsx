import React, { useState } from "react";
import logo from "./icons/logo.svg";
import { Link, useLocation } from "react-router-dom";
import { IUser } from "../../interfaces/interfaces";
import { IoIosMenu } from "react-icons/io";
import { Col, Offcanvas, Row } from "react-bootstrap";
import clsx from "clsx";

import * as styles from "./header.module.scss";

type IHeaderProps = {
  user: IUser;
  isAuth: boolean;
  dispatch: Function;
  logoutUser: Function;
};

export const Header = ({
  user,
  isAuth,
  dispatch,
  logoutUser,
}: IHeaderProps) => {
  const { pathname } = useLocation();
  const splitLocation = pathname.split("/");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Row>
      <Col
        xs={12}
        className={clsx(
          styles.header,
          "fixed-top d-flex justify-content-between px-3 px-md-5"
        )}
      >
        <div className="py-4">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="d-flex d-md-none pt-4">
          <IoIosMenu className={styles.menuIcon} onClick={handleShow} />
          <Offcanvas
            show={show}
            onHide={handleClose}
            className={clsx(styles.mobile, "p-2")}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title className="text-white">
                {user.nickname
                  ? `С возвращением, ${user.nickname}!`
                  : "Войдите или зарегистрируетесь!"}
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <ul className="p-0">
                <li className={styles.menuLink}>
                  <Link to="/" onClick={handleClose}>
                    Чарт
                  </Link>
                </li>
                <li className={styles.menuLink}>
                  <Link to="/profile" onClick={handleClose}>
                    {" "}
                    {isAuth ? "Профиль" : "Войти"}
                  </Link>
                </li>
                {isAuth && (
                  <li className={styles.menuLink}>
                    <Link
                      to="/profile"
                      onClick={() => dispatch(logoutUser(), handleClose())}
                    >
                      Выйти
                    </Link>
                  </li>
                )}
              </ul>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
        <div className="d-none d-md-flex py-4">
          <ul className="d-flex">
            <li>
              <Link
                className={
                  splitLocation[1] === ""
                    ? clsx(styles.menuList, styles.activeList)
                    : styles.menuList
                }
                to="/"
              >
                Чарт
              </Link>
            </li>

            <li>
              <Link
                className={
                  splitLocation[1] === "profile"
                    ? clsx(styles.menuList, styles.activeList)
                    : styles.menuList
                }
                to="/profile"
              >
                {isAuth ? "Профиль" : "Войти"}
              </Link>
            </li>
            {isAuth && (
              <li>
                <Link
                  className={styles.menuList}
                  to="/profile"
                  onClick={() => dispatch(logoutUser())}
                >
                  Выйти
                </Link>
              </li>
            )}
          </ul>
        </div>
      </Col>
    </Row>
  );
};
