import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import "../css/textArea.css";
import axios from "axios";
import produce from "immer";
import { RootState } from "../reducers";

type FormData = {
  body: string;
};

type tweet = {
  created_at: string;
  user_id: string;
  body: string;
  id: string;
};

type TweetArray = Array<tweet>;

const Home = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const [tweets, setTweets] = useState<TweetArray | null>(null);
  const [input, setInput] = useState<string>("");
  const selectCurrentUserId = (state: RootState) => {
    if (state.session.currentUser) {
      return state.session.currentUser.id;
    } else {
      return null;
    }
  };
  const currentUserId = useSelector(selectCurrentUserId);

  useEffect(() => {
    const fetchTweets = async () => {
      const resp = await axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/api/tweets`,
        { withCredentials: true }
      );
      setTweets(resp.data);
    };

    fetchTweets();
  }, []);

  const onSubmit = handleSubmit(async ({ body }) => {
    const resp = await axios.post(
      `${process.env.REACT_APP_API_DOMAIN}/api/tweets`,
      {
        tweet: {
          body,
        },
      },
      { withCredentials: true }
    );

    setTweets(
      produce((draft) => {
        draft[resp.data.id] = resp.data;
      })
    );
    setInput("");
  });

  const deleteTweet = async (tweetId: string) => {
    const resp = await axios.delete(
      `${process.env.REACT_APP_API_DOMAIN}/api/tweets/${tweetId}`,
      { withCredentials: true }
    );

    setTweets(
      produce((draft) => {
        delete draft[resp.data.id];
      })
    );
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>
            Tweet:
            <textarea
              name="body"
              ref={register}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </label>
          <input type="submit" />
        </div>
      </form>
      {tweets && (
        <ul>
          {Object.entries(tweets).map(([key, tweet]) => (
            <li key={key}>
              {tweet.body.split(" ").map((word: string) => {
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
              {tweet.created_at && tweet.created_at.slice(0, 10)}
              {currentUserId === tweet.user_id && (
                <button onClick={() => deleteTweet(tweet.id)}>delete</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Home;
