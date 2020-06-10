import React, { useEffect, useState } from "react";

import axios from "axios";
import produce from "immer";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState({});

  useEffect(() => {
    const getUsers = async () => {
      const resp = await axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/api/users`,
        { withCredentials: true }
      );
      setUsers(resp.data);
    };
    getUsers();
  }, []);

  const follow = async (followee_id) => {
    const resp = await axios.post(
      `${process.env.REACT_APP_API_DOMAIN}/api/relationships`,
      { followee_id },
      { withCredentials: true }
    );
    setUsers(
      produce((draft) => {
        draft[resp.data.id]["following"] = true;
      })
    );
  };

  const unfollow = async (followee_id) => {
    const resp = await axios.delete(
      `${process.env.REACT_APP_API_DOMAIN}/api/relationships/${followee_id}`,
      { withCredentials: true }
    );

    setUsers(
      produce((draft) => {
        draft[resp.data.id]["following"] = false;
      })
    );
  };

  return (
    <ul>
      {Object.entries(users).map(([userId, user]) => (
        <li key={userId}>
          <Link to={`/users/${userId}`}>{user.email}</Link>&nbsp;&nbsp;
          {user.following ? (
            <button onClick={() => unfollow(userId)}>Unfollow</button>
          ) : (
            <button onClick={() => follow(userId)}>Follow</button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Users;
