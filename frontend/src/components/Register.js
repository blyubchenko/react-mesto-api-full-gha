import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import AuthForm from "./AuthForm";

function Register(props) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = values;
    props.onRegister(email, password);
  }

  useEffect(() => {
    resetForm();
  }, []);

  return (
    <>
    <AuthForm
      titleName="Регистрация"
      buttonName="Зарегистрироваться"
      onSubmit={handleSubmit}
      onChange={handleChange}
      onErrors={errors}
      isDisabled={!isValid}
      onValues={values}
    />
      <Link to={"/sign-in"} className="login__link">
        Уже зарегистрированы? Войти
      </Link>
      </>
  );
}

export default Register;
