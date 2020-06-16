import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import constants from "../../constants";

type FormData = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const [errors, setErrors] = useState<string>("");
  const dispatch = useDispatch();

  const onSubmit = handleSubmit(async ({ email, password }) => {
    try {
      const resp = await axios.post(
        `${process.env.REACT_APP_API_DOMAIN}/api/sessions`,
        {
          user: {
            email: email,
            password: password,
          },
        },
        { withCredentials: true }
      );
      dispatch({
        type: constants.RECEIVE_CURRENT_USER,
        currentUser: resp.data,
      });
    } catch (err) {
      setErrors(err.response.data[0]);
    }
  });

  return (
    <div>
      <form onSubmit={onSubmit}>
        {errors && <div>{errors}</div>}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>
            Email:
            <input name="email" ref={register} />
          </label>
          <label>
            Password:
            <input name="password" type="password" ref={register} />
          </label>
          <input type="submit" />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
