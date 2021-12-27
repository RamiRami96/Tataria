import React, { Dispatch } from "react";
import { Formik, Form, Field } from "formik";
import { IRegisterForm } from "../../interfaces/interfaces";
import * as Yup from "yup";
import { Button, Col, FormControl, FormGroup, Row } from "react-bootstrap";
import clsx from "clsx";

import * as styles from "./auth.module.scss";

type RegisterProps = {
  dispatch: Dispatch<any>;
  registerUser: (values: IRegisterForm) => void;
  infoAuthMsg: string;
};

// валидация полей

const RegisterSchema = Yup.object().shape({
  nickname: Yup.string()
    .min(2, "Слишком короткий!")
    .max(50, "Слишком длинный!")
    .required("Поле обязательно!"),
  password: Yup.string()
    .min(6, "Слишком короткий!")
    .required("Поле обязательно!"),
  email: Yup.string()
    .email("Неверный формат почты!")
    .required("Поле обязательно!"),
});

const initialValues: IRegisterForm = {
  email: "",
  nickname: "",
  password: "",
};

export const Register = ({
  dispatch,
  registerUser,
  infoAuthMsg,
}: RegisterProps) => {
  const handleSubmit = (values: any, { resetForm }: any) => {
    dispatch(registerUser(values));
    resetForm({});
  };

  return (
    <Row>
      <Col xs={12} className={styles.form}>
        <h2 className={clsx(styles.title, "mt-3")}>Регистрация</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={RegisterSchema}
          onSubmit={(values, actions) => {
            handleSubmit(values, actions);
          }}
        >
          {({ errors, touched }) => (
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

              {errors.email && touched.email ? (
                <div className="validate-errors mt-2">{errors.email}</div>
              ) : null}

              <Field name="nickname">
                {({ field }: any) => (
                  <FormGroup className="mt-5" controlId={field.name}>
                    <FormControl
                      className={styles.input}
                      type="text"
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Никнейм"
                      required
                    />
                  </FormGroup>
                )}
              </Field>

              {errors.nickname && touched.nickname ? (
                <div className="validate-errors mt-2">{errors.nickname}</div>
              ) : null}

              <Field className={styles.input} type="password" name="password">
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

              {errors.password && touched.password ? (
                <div className="validate-errors mt-2">{errors.password}</div>
              ) : null}

              {infoAuthMsg ? (
                <div className="validate-errors mt-4">{infoAuthMsg}</div>
              ) : null}
              <Button
                variant="outline-danger"
                disabled={
                  errors.email
                    ? true
                    : false && errors.nickname
                    ? true
                    : false && errors.password
                    ? true
                    : false && infoAuthMsg.length > 0
                    ? true
                    : false
                }
                type="submit"
                size="lg"
                className={clsx(styles.btn, " w-100 mt-5")}
              >
                Зарегистрироваться
              </Button>
            </Form>
          )}
        </Formik>
      </Col>
    </Row>
  );
};
