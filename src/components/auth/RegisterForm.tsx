import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import constants from "../../constants";

type FormData = {
  email: string;
  password: string;
  password_confirmation: string;
};

const RegisterForm = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const dispatch = useDispatch();

  const onSubmit = handleSubmit(
    async ({ email, password, password_confirmation }) => {
      try {
        const resp = await axios.post(
          `${process.env.REACT_APP_API_DOMAIN}/api/registrations`,
          {
            user: {
              email: email,
              password: password,
              password_confirmation: password_confirmation,
            },
          },
          { withCredentials: true }
        );
        dispatch({
          type: constants.RECEIVE_CURRENT_USER,
          currentUser: resp.data,
        });
      } catch (err) {
        console.log(err);
      }
    }
  );

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>
            Email:
            <input name="email" ref={register} />
          </label>
          <label>
            Password:
            <input name="password" type="password" ref={register} />
          </label>
          <label>
            Password confirmation:
            <input
              name="password_confirmation"
              type="password"
              ref={register}
            />
          </label>
          <input type="submit" />
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
