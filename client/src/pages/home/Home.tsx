import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useHistory } from "react-router-dom";
import AllTweets from "../../components/AllTweets";
import HomePageTweet from "../../components/HomePageTweet";
import LeftNav from "../../components/leftNav/LeftNav";
import PopularTweets from "../../components/PopularTweets";
// import "../styles/home.css";
// import "../styles/primary.css";
import "../../scss/layout/MainLayout.scss";

export const ME_QUERY = gql`
  query me {
    me {
      id
      name
      Profile {
        id
        bio
        handle
        website
        avatar
        wallpaper
      }
    }
  }
`;

const Home = () => {
  const history = useHistory();
  const { loading, error, data } = useQuery(ME_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <>
      <div className="primary-layout">
        <div className="left">
          <LeftNav />
        </div>
        <div className="center">
          <div className="home-header">
            <h3 className="home-title">Home</h3>
          </div>
          <HomePageTweet />
          <AllTweets />
        </div>
        <div className="right">
          <PopularTweets />
        </div>
      </div>
    </>
  );
};

export default Home;
