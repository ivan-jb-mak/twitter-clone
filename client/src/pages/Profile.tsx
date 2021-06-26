import { gql, useQuery } from "@apollo/client";
import { monthsInYear } from "date-fns/esm/fp";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import CreateProfile from "../components/CreateProfile";
import Following from "../components/Following";
import LeftNav from "../components/LeftNav";
import LikedTweets from "../components/LikedTweets";
import PopularTweets from "../components/PopularTweets";
import UpdateProfile from "../components/UpdateProfile";
import "../styles/primary.css";
import "../styles/profile.css";

export const ME_QUERY = gql`
  query me {
    me {
      id
      name
      Following {
        id
        followId
        name
        avatar
      }
      likedTweet {
        id
        tweet {
          id
          content
          createdAt
          author {
            id
            name
            Profile {
              id
              avatar
            }
          }
        }
      }
      Profile {
        id
        createdAt
        bio
        handle
        website
        avatar
        wallpaper
      }
      Tweet {
        id
      }
    }
  }
`;

const Profile = () => {
  const history = useHistory();
  const { loading, error, data } = useQuery(ME_QUERY);

  const joinedDate = (date: string) => {
    const rawDate = new Date(`${date}`);
    const monthYear =
      rawDate.toLocaleString("default", { month: "long" }) +
      " " +
      rawDate.getFullYear();
    return monthYear;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  const noAvatarUrl =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  return (
    <>
      <div className="primary">
        <div className="left">
          <LeftNav />
        </div>
        <div className="profile">
          <div className="profile-info">
            <div className="profile-head">
              <span className="back-arrow" onClick={() => history.goBack()}>
                <i className="fa fa-arrow-left" aria-hidden="true"></i>
              </span>
              <span className="nickname">
                <h3>{data.me.name}</h3>
                <p>{data.me.Tweet.length} Tweets</p>
              </span>
            </div>
            <div className="avatar">
              {data.me.Profile?.avatar ? (
                <img
                  src={data.me.Profile.avatar}
                  style={{ width: "150px", borderRadius: "50%" }}
                  alt="avatar"
                />
              ) : (
                <img
                  src={noAvatarUrl}
                  style={{ width: "150px", borderRadius: "50%" }}
                  alt="avatar"
                />
              )}
            </div>
            <div className="make-profile">
              {data.me.Profile ? <UpdateProfile /> : <CreateProfile />}
            </div>
            <h3 className="name">{data.me.name}</h3>
            <h3 className="name">{data.me.Profile.handle}</h3>
            <h4 className="name">{data.me.Profile.bio}</h4>
            {data.me.Profile ? (
              <p>
                <i className="fas fa-link"> </i>{" "}
                <Link
                  to={{ pathname: `http://${data.me.Profile.website}` }}
                  target="_blank"
                >
                  {data.me.Profile.website}
                </Link>
              </p>
            ) : null}
            <div>Joined {joinedDate(data.me.Profile.createdAt)}</div>
            <div className="followers">
              <Following />
              <p>384 followers</p>
            </div>
          </div>
          <LikedTweets tweets={data.me} />
        </div>
        <div className="right">
          <PopularTweets />
        </div>
      </div>
    </>
  );
};

export default Profile;
