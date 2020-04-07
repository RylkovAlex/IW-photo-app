import React, { useState, useMemo } from "react";
import { inject, observer } from "mobx-react";

import { isValid, getValidationInfo } from "../utils/validation";
import { AuthStore } from "../stores/AuthStore/AuthStore";
import constants from "../consts/constants";

const validationSchema = {
  email: (value: string) =>
    // eslint-disable-next-line no-useless-escape
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
    value === constants.EMAIL,
  password: (value: string) => value.length >= 6 && value.length <= 50,
};

interface AuthPageProps {
  authStore?: AuthStore;
}

const AuthPage: React.FC<AuthPageProps> = ({ authStore }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [formTouched, setFormTouched] = useState({
    email: false,
    password: false,
  });
  const [error, setError] = useState(false);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const blurHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormTouched({ ...formTouched, [event.target.name]: true });
  };

  const loginHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (
      form.email === constants.EMAIL &&
      form.password === constants.PASSWORD
    ) {
      setError(false);
      authStore?.logIn(form.email);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const validationInfo = useMemo(
    () => getValidationInfo(form, validationSchema),
    [form]
  );

  return (
    <div className="row">
      <div className="col s10">
        <h1>Welcome to ...</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title" style={{ marginBottom: 25 }}>
              Авторизация
            </span>
            <div>
              <div className="input-field">
                <input
                  className="yellow-input"
                  value={form.email}
                  id="email"
                  type="email"
                  name="email"
                  onChange={changeHandler}
                  onBlur={blurHandler}
                />
                <label htmlFor="email">Email:</label>
                {formTouched.email && !(validationInfo as any).email && (
                  <span style={{ color: "#f57f17" }}>wrong email format</span>
                )}
              </div>
              <div className="input-field">
                <input
                  className="yellow-input"
                  value={form.password}
                  id="password"
                  type="password"
                  name="password"
                  minLength={6}
                  maxLength={50}
                  onChange={changeHandler}
                  onBlur={blurHandler}
                />
                <label htmlFor="password">Password:</label>
                {formTouched.password && !(validationInfo as any).password && (
                  <span style={{ color: "#f57f17" }}>min 6, max 50</span>
                )}
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              style={{ marginRight: 10 }}
              disabled={!isValid(form, validationSchema)}
              onClick={loginHandler}
            >
              Войти
            </button>
            {error && (
              <span style={{ color: "#f57f17" }}>
                Sorry, you haven't access!
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default inject("authStore")(observer(AuthPage));
