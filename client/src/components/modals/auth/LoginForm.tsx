import { isEmpty } from "rambda";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../services/user";
import requestUserLogin from "../../../store/user/loginUser.thunk";
import Button, { ButtonType } from "../../common/Button";
import Input, { HandleChangeEvent } from "../../common/Input";
import useToggleModal from "../useToggleModal";

type Props = {};

const initialFormState = {
  username: "",
  password: "",
  errors: {},
};

export default function LoginForm({}: Props) {
  const [loginForm, setLoginForm] = useState(initialFormState);
  const dispatch = useDispatch();
  const closeModal = useToggleModal();

  const handleChange = ({ target }: HandleChangeEvent) => {
    setLoginForm({ ...loginForm, [target.id]: target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!isEmpty(loginForm.errors)) {
      // TODO handle error
    }

    const { username, password } = loginForm;
    // @ts-ignore
    const response = await dispatch(requestUserLogin({ username, password }))

    if (response?.error) {
      // TODO handle error
    } else {
      closeModal();
    }
  };

  return (
    <div className="h-full w-full ">
      <form
        onSubmit={handleSubmit}
        className="h-full flex flex-col gap-4 px-20 py-5 items-center justify-center"
      >
        <Input
          placeholder="Please enter your username"
          name="username"
          value={loginForm.username}
          handleChange={handleChange}
        />
        <Input
          placeholder="Please enter your password"
          name="password"
          value={loginForm.password}
          handleChange={handleChange}
          type="password"
        />
        <Button
          type={ButtonType.submit}
          className="mt-4 w-20 bg-white text-purple-600 border-purple-600 hover:ring-purple-400 hover:bg-purple-600 hover:text-white"
          label="Submit"
        />
      </form>
    </div>
  );
}
