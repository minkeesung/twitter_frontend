import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import "../css/textArea.css";
import axios from "axios";
import produce from "immer";

const Home = () => {
  const { register, handleSubmit } = useForm();
  const [tweets, setTweets] = useState(null);
  const currentUserId = useSelector((state) => state.session.currentUser.id);

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

  const onSubmit = async (data) => {
    const { body } = data;

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
  };

  const deleteTweet = async (tweetId) => {
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

  console.log(tweets);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>
            Tweet:
            <textarea name="body" ref={register} />
          </label>
          <input type="submit" />
        </div>
      </form>
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
