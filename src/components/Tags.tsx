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

const Tags = ({ location }: location) => {
  const tag = location.pathname.slice(6);
  const [tweets, setTweets] = useState<TweetArray | null>(null);

  useEffect(() => {
    const fetchTweets = async () => {
      const resp = await axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/api/tags/${tag}`,
        { withCredentials: true }
      );
      setTweets(resp.data);
    };
    fetchTweets();
  }, [tag]);

  return (
    <>
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

export default Tags;
