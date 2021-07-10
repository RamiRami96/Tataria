import React from "react";
import { Formik, Form, Field } from "formik";
import { IRegisterForm } from "../../interfaces/interfaces";
import * as Yup from "yup";

interface RegisterProps {
  dispatch: Function;
  registerUser: Function;
  infoAuthMsg: string;
}

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

export const Register = ({
  dispatch,
  registerUser,
  infoAuthMsg,
}: RegisterProps) => {
  const initialValues: IRegisterForm = {
    email: "",
    nickname: "",
    password: "",
  };

  const handleSubmit = (values: any, { resetForm }: any) => {
    dispatch(registerUser(values));
    resetForm({});
  };

  return (
    <div className="row auth">
      <div className="col-12 auth__form">
        <h2>Регистрация</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={RegisterSchema}
          onSubmit={(values, actions) => {
            handleSubmit(values, actions);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="group mt-5">
                <Field id="registeremail" type="email" name="email" required />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Почта</label>
                {errors.email && touched.email ? (
                  <div className="validate-errors mt-2">{errors.email}</div>
                ) : null}
              </div>
              <div className="group mt-5">
                <Field id="nickname" type="text" name="nickname" required />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Никнейм</label>
                {errors.nickname && touched.nickname ? (
                  <div className="validate-errors mt-2">{errors.nickname}</div>
                ) : null}
              </div>
              <div className="group mt-5">
                <Field
                  id="registerpassword"
                  type="password"
                  name="password"
                  required
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Пароль</label>
                {errors.password && touched.password ? (
                  <div className="validate-errors mt-2">{errors.password}</div>
                ) : null}
              </div>
              {infoAuthMsg ? (
                <div className="validate-errors mt-4">{infoAuthMsg}</div>
              ) : null}
              <button
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
                className="btn btn-outline-danger form-btn w-100 mt-5"
              >
                Зарегистрироваться
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
