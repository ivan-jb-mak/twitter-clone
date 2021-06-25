import { useMutation } from "@apollo/client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import gql from "graphql-tag";
import React, { useState } from "react";
import Modal from "react-modal";
import { ME_QUERY } from "../pages/Profile";
import { customStyles } from "../styles/CustomModalStyles";

const CREATE_PROFILE_MUTATION = gql`
  mutation createProfile(
    $bio: String
    $handle: String
    $website: String
    $avatar: String
  ) {
    createProfile(
      bio: $bio
      handle: $handle
      website: $website
      avatar: $avatar
    ) {
      id
    }
  }
`;

interface ProfileValues {
  bio: string;
  handle: string;
  website: string;
  avatar: string;
}
const CreateProfile = () => {
  const [createProfile] = useMutation(CREATE_PROFILE_MUTATION, {
    refetchQueries: [{ query: ME_QUERY }],
  });
  const [modalIsOpon, setIsOpen] = useState(false);

  const initialValues: ProfileValues = {
    bio: "",
    handle: "",
    website: "",
    avatar: "",
  };

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal} className="edit-button">
        Create Profile
      </button>
      <Modal
        isOpen={modalIsOpon}
        onRequestClose={closeModal}
        contentLabel="Modal"
        style={customStyles}
        ariaHideApp={false}
      >
        <Formik
          initialValues={initialValues}
          // validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            await createProfile({
              variables: values,
            });

            setSubmitting(false);
            setIsOpen(false);
          }}
        >
          <Form>
            <Field name="bio" type="text" as="textarea" placeholder="Bio" />
            <ErrorMessage name="bio" component={"div"} />
            <Field name="handle" type="handle" placeholder="handle" />
            <ErrorMessage name="handle" component={"div"} />
            <Field name="website" type="website" placeholder="Website" />
            <ErrorMessage name="website" component={"div"} />

            <button type="submit" className="login-button">
              <span>Create Profile</span>
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default CreateProfile;
