import React, { useState } from "react";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";
import { customStyles } from "./SignupModalStyles";
import twitterLogo from "../../styles/assets/twitter-logo-white.png";
import "./SignupModal.scss";

const SIGNUP_MUTATION = gql`
  mutation signup($name: String, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
    }
  }
`;

interface SignupValues {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

const SignupModal = ({ modalIsOpen, closeModal }: any) => {
  const history = useHistory();
  const [signup, { data }] = useMutation(SIGNUP_MUTATION);

  const initialValues: SignupValues = {
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email Required"),
    password: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Password Required"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "Passwords must match"
    ),
    name: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Name Required"),
  });

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Modal"
      style={customStyles}
      ariaHideApp={false}
    >
      <Link to="/">
        <img src={twitterLogo} alt="twitter-logo" className="logo" />
      </Link>
      <h3 className="signup-header">Create your account</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          const response = await signup({
            variables: values,
          });
          localStorage.setItem("token", response.data.signup.token);
          setSubmitting(false);
          history.push("/home");
        }}
      >
        <Form className="signup-form">
          <Field
            name="email"
            type="text"
            placeholder="Email"
            className="email-field"
          />
          {/* <ErrorMessage name="email" component={"div"} /> */}
          <Field
            name="name"
            type="text"
            placeholder="Name"
            className="name-field"
          />
          {/* <ErrorMessage name="name" component={"div"} /> */}
          <Field
            name="password"
            type="password"
            placeholder="Password"
            className="password-field"
          />
          {/* <ErrorMessage name="password" component={"div"} /> */}
          <Field
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            className="confirm-password-field"
          />
          {/* <ErrorMessage name="confirmPassword" component={"div"} /> */}
          <button type="submit" className="signup-button">
            <span>Sign up</span>
          </button>
        </Form>
      </Formik>
    </Modal>
  );
};

export default SignupModal;
