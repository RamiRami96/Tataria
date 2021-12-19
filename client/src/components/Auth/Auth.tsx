import React, { Dispatch } from "react";
import { Login } from "./Login";
import { Register } from "./Register";

import { loginUser, registerUser } from "../../store/authReducer";
import { Col, Row, Tab, Tabs } from "react-bootstrap";

import clsx from "clsx";

import * as styles from "./auth.module.scss";
import { Cassette } from "./Cassette/Cassette";

type IAuthProps = {
  infoAuthMsg: string;
  dispatch: Dispatch<any>;
};

export const Auth = ({ infoAuthMsg, dispatch }: IAuthProps) => {
  return (
    <Row className={clsx(styles.auth, "mt-5")}>
      <Col xs={12} lg={6}>
        <Tabs
          defaultActiveKey="login"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab className={styles.tabs} eventKey="login" title="Войти">
            <Login
              dispatch={dispatch}
              loginUser={loginUser}
              infoAuthMsg={infoAuthMsg}
            />
          </Tab>
          <Tab
            className={styles.tabs}
            eventKey="registration"
            title="Регистрация"
          >
            <Register
              dispatch={dispatch}
              registerUser={registerUser}
              infoAuthMsg={infoAuthMsg}
            />
          </Tab>
        </Tabs>
      </Col>
      <Col
        lg={6}
        className={clsx(
          styles.poster,
          "d-none d-lg-flex justify-content-center align-items-center"
        )}
      >
        <Cassette />
      </Col>
    </Row>
  );
};
