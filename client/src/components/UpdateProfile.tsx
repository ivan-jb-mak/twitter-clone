import { useMutation, useQuery } from "@apollo/client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import gql from "graphql-tag";
import React, { useRef, useState } from "react";
import Modal from "react-modal";
import { ME_QUERY } from "../pages/Profile";
import { customStyles } from "../styles/CustomModalStyles";

const UPDATE_PROFILE = gql`
  mutation updateProfile(
    $id: Int!
    $bio: String
    $handle: String
    $website: String
    $avatar: String
    $wallpaper: String
  ) {
    updateProfile(
      id: $id
      bio: $bio
      handle: $handle
      website: $website
      avatar: $avatar
      wallpaper: $wallpaper
    ) {
      id
    }
  }
`;

interface ProfileValues {
  id: number;
  bio: string;
  handle: string;
  website: string;
  avatar: string;
  wallpaper: string;
}
const UpdateProfile = () => {
  const inputFile = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

  const { loading, error, data } = useQuery(ME_QUERY);
  const [updateProfile] = useMutation(UPDATE_PROFILE, {
    refetchQueries: [{ query: ME_QUERY }],
  });
  const [modalIsOpon, setIsOpen] = useState(false);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  const initialValues: ProfileValues = {
    id: data.me.Profile.id,
    bio: data.me.Profile.bio,
    handle: data.me.Profile.handle,
    website: data.me.Profile.website,
    avatar: data.me.Profile.avatar,
    wallpaper: data.me.Profile.wallpaper,
  };

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "ivanmak");
    setImageLoading(true);
    const res = await fetch(process.env.REACT_APP_CLOUDINARY_ENDPOINT, {
      method: "POST",
      body: data,
    });
    const file = await res.json();

    setImage(file.secure_url);
    setImageLoading(false);
  };

  const noAvatarUrl =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  return (
    <div>
      <button onClick={openModal} className="edit-button">
        Edit Profile
      </button>
      <Modal
        isOpen={modalIsOpon}
        onRequestClose={closeModal}
        contentLabel="Modal"
        style={customStyles}
        ariaHideApp={false}
      >
        <input
          type="file"
          name="file"
          placeholder="Upload an image"
          onChange={uploadImage}
          ref={inputFile}
          style={{ display: "none" }}
        />
        {imageLoading ? (
          <h3>Loading...</h3>
        ) : (
          <>
            {image ? (
              <span onClick={() => inputFile.current.click()}>
                <img
                  src={image}
                  style={{ width: "150px", borderRadius: "50%" }}
                  alt="avatar"
                  onClick={() => inputFile.current.click()}
                />
              </span>
            ) : (
              <span onClick={() => inputFile.current.click()}>
                <img
                  src={noAvatarUrl}
                  style={{ width: "150px", borderRadius: "50%" }}
                  alt="avatar"
                  onClick={() => inputFile.current.click()}
                />
              </span>
            )}
          </>
        )}
        <Formik
          initialValues={initialValues}
          // validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            await updateProfile({
              variables: { ...values, avatar: image },
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
              <span>Update Profile</span>
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default UpdateProfile;
