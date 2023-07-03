import React,{useEffect} from "react";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import AuthForm from "./AuthForm";

function Login(props) {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();
  function handleSubmit(e) {
    e.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    const { email, password } = values;
    props.onLogin(email, password, e, setValues);
  }

  useEffect(() => {
    resetForm();
  }, []);

  return (
    <AuthForm
      titleName="Вход"
      buttonName="Войти"
      onSubmit={handleSubmit}
      onChange={handleChange}
      onErrors={errors}
      isDisabled={!isValid}
      onValues={values}
    />
  );
}

export default Login;
