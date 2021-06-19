import React, { Fragment } from "react";
import { gql, useQuery } from "@apollo/client";
import { Redirect } from "react-router-dom";

const IS_LOGGED_IN = gql`
  {
    me {
      id
    }
  }
`;

interface Props {
  children?: React.ReactNode;
}

const IsAuthenticated = ({ children }: Props) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  // if no data for user, redirect to landing page
  if (!data.me) {
    return <Redirect to={{ pathname: "/landing" }} />;
  }
  return <Fragment>{children}</Fragment>;
};

export default IsAuthenticated;
