import React from "react";
import { Formik, Form, Field } from "formik";
import { ILoginForm } from "../../interfaces/interfaces";

//компонетнта логинизации

interface LoginProps {
  dispatch: Function;
  loginUser: Function;
  infoAuthMsg: string;
}

export const Login = ({ dispatch, loginUser, infoAuthMsg }: LoginProps) => {
  const initialValues: ILoginForm = {
    email: "",
    password: "",
  };

  const handleSubmit = (values: any, actions: any) => {
    dispatch(loginUser(values));
  };
  return (
    <div className="row auth">
      <div className="col-12 auth__form">
        <h2>Войти</h2>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            handleSubmit(values, actions);
          }}
        >
          <Form>
            <div className="group mt-5">
              <Field id="loginemail" type="email" name="email" required />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Почта</label>
            </div>
            <div className="group mt-5">
              <Field
                id="loginpassword"
                type="password"
                name="password"
                required
              />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Пароль</label>
            </div>
            {infoAuthMsg ? (
              <div className="validate-errors mt-4">{infoAuthMsg}</div>
            ) : null}
            <button
              type="submit"
              className="btn btn-outline-danger form-btn w-100 mt-5"
            >
              Войти
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
