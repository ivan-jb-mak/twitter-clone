import React from "react";
import { gql, useMutation } from "@apollo/client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { async } from "q";

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

const Signup = () => {
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
      [Yup.ref("password"), null],
      "Password must match"
    ),
    name: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Name Required"),
  });

  return (
    <div>
      <h1>Signup</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (value, { setSubmitting }) => {
          setSubmitting(true);
          const response = await signup({
            variables: values,
          });
          localStorage.setItem("token", response.data.singup.token);
          setSubmitting(false);
          history.pushState("/users");
        }}
      >
        <Form>
          <Field name="email" type="text" palceholder="Email" />
          <ErrorMessage name="email" component={"div"} />
          <Field name="name" type="text" palceholder="Name" />
          <ErrorMessage name="name" component={"div"} />
          <Field name="password" type="text" palceholder="Password" />
          <ErrorMessage name="password" component={"div"} />
          <Field
            name="confirmPassword"
            type="text"
            palceholder="Confirm Password"
          />
          <ErrorMessage name="confirmPassword" component={"div"} />
          <button type="submit">Signup</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Signup;
