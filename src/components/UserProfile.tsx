import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

type pathname = {
  pathname: string;
};

type location = {
  location: pathname;
};

type tweet = {
  created_at: string;
  user_id: string;
  body: string;
  id: string;
};

type TweetArray = Array<tweet>;

const UserProfile = ({ location }: location) => {
  const userId = location.pathname.slice(7);
  const [tweets, setTweets] = useState<TweetArray | null>(null);
  const [following, setFollowing] = useState<boolean | string>("loading");

  useEffect(() => {
    const fetchTweets = async () => {
      const resp = await axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/api/users/${userId}`,
        { withCredentials: true }
      );
      setTweets(resp.data);
      console.log(resp.data);
    };
    fetchTweets();
  }, [userId]);

  useEffect(() => {
    const fetchFollowing = async () => {
      const resp = await axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/api/relationships/${userId}`,
        { withCredentials: true }
      );
      setFollowing(resp.data.following);
    };
    fetchFollowing();
  }, [userId]);

  const follow = async (followee_id: string) => {
    await axios.post(
      `${process.env.REACT_APP_API_DOMAIN}/api/relationships`,
      { followee_id },
      { withCredentials: true }
    );
    setFollowing(true);
  };

  const unfollow = async (followee_id: string) => {
    await axios.delete(
      `${process.env.REACT_APP_API_DOMAIN}/api/relationships/${followee_id}`,
      { withCredentials: true }
    );

    setFollowing(false);
  };

  return (
    <>
      {following == "loading" ? null : following ? (
        <button onClick={() => unfollow(userId)}>Unfollow</button>
      ) : (
        <button onClick={() => follow(userId)}>Follow</button>
      )}
      {tweets && (
        <ul>
          {Object.entries(tweets).map(([key, tweet]) => (
            <li key={key}>
              {tweet.body.split(" ").map((word) => {
                if (word.charAt(0) === "#") {
                  const tag = word.slice(1);
                  return (
                    <Link key={word} to={`/tags/${tag}`}>
                      {word}&nbsp;
                    </Link>
                  );
                } else {
                  return word + " ";
                }
              })}
              &nbsp;
              {tweet.created_at.slice(0, 10)}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default UserProfile;
