import React, { Dispatch } from "react";
import { Formik, Form, Field } from "formik";
import { ILoginForm } from "../../interfaces/interfaces";
import { Button, Col, FormControl, FormGroup, Row } from "react-bootstrap";
import clsx from "clsx";

import * as styles from "./auth.module.scss";

type LoginProps = {
  dispatch: Dispatch<any>;
  loginUser: Function;
  infoAuthMsg: string;
};

const initialValues: ILoginForm = {
  email: "",
  password: "",
};

export const Login = ({ dispatch, loginUser, infoAuthMsg }: LoginProps) => {
  const handleSubmit = (values: any, actions: any) => {
    dispatch(loginUser(values));
  };
  return (
    <Row>
      <Col xs={12} className={styles.form}>
        <h2 className={clsx(styles.title, "mt-3")}>Войти</h2>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            handleSubmit(values, actions);
          }}
        >
          <Form>
            <Field name="email">
              {({ field }: any) => (
                <FormGroup className="mt-5" controlId={field.name}>
                  <FormControl
                    className={styles.input}
                    type="email"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Почта"
                    required
                  />
                </FormGroup>
              )}
            </Field>

            <Field name="password">
              {({ field }: any) => (
                <FormGroup className="mt-5" controlId={field.name}>
                  <FormControl
                    className={styles.input}
                    type="password"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Пароль"
                    required
                  />
                </FormGroup>
              )}
            </Field>

            {infoAuthMsg ? (
              <div className="validate-errors mt-4">{infoAuthMsg}</div>
            ) : null}
            <Button
              variant="outline-danger"
              type="submit"
              size="lg"
              className={clsx(styles.btn, "w-100 mt-5")}
            >
              Войти
            </Button>
          </Form>
        </Formik>
      </Col>
    </Row>
  );
};
