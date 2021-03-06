import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { ME_QUERY } from "../pages/Profile";
import { TWEETS_QUERY } from "./AllTweets";

const LIKE_TWEET_MUTATION = gql`
  mutation likeTweet($id: Int) {
    likeTweet(id: $id) {
      id
    }
  }
`;

interface Props {
  id: number;
}

const LikeTweet = ({ id }: Props) => {
  const [likeTweet] = useMutation(LIKE_TWEET_MUTATION, {
    refetchQueries: [{ query: TWEETS_QUERY }, { query: ME_QUERY }],
  });

  const handleCreateLike = async () => {
    await likeTweet({
      variables: { id },
    });
  };

  return (
    <span onClick={handleCreateLike} style={{ marginRight: "5px" }}>
      <i className="far fa-thumbs-up" aria-hidden="true" />
    </span>
  );
};

export default LikeTweet;
