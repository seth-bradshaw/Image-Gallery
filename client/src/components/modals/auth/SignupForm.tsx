import React, { MouseEvent, useState } from 'react'
import { isEmpty } from 'rambda';
import { useDispatch } from 'react-redux';
import useToggleModal from '../useToggleModal';
import { HandleChangeEvent } from '../../common/Input';
import Input from '../../common/Input';
import Button, { ButtonType } from '../../common/Button';
import registerNewUser from '../../../store/user/register.thunk';

type Props = {}

const initialFormState = {
  username: "",
  email: "",
  password: "",
  fname: "",
  lname: "",
  errors: {}
}

export default function SignupForm({}: Props) {
  const [signUpForm, setSignUpForm] = useState(initialFormState);
  const dispatch = useDispatch();
  const closeModal = useToggleModal();

  const handleChange = ({ target }: HandleChangeEvent) => {
    setSignUpForm({ ...signUpForm, [target.id]: target.value });
  };

  const handleSubmit = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {  errors, ...body } = signUpForm;

    if (!isEmpty(errors)) {
      // TODO handle error
    }
    // @ts-ignore
    const response = await dispatch(registerNewUser(body))

    if (response?.error) {
      // TODO handle error
    } else {
      closeModal();
    }
  };

  return (
    <div className="h-full w-full">
      <form
        onSubmit={handleSubmit}
        className="h-full flex flex-col gap-4 px-20 py-5 items-center justify-center"
      >
        <Input
          placeholder="Email"
          name="email"
          value={signUpForm.email}
          handleChange={handleChange}
        />
        <div className="w-full md:flex md:gap-2">
          <Input
            placeholder="First Name"
            name="fname"
            label="First Name"
            value={signUpForm.fname}
            handleChange={handleChange}
            className="w-full md:w-44"
          />
          <Input
            placeholder="Last Name"
            name="lname"
            label="Last Name"
            value={signUpForm.lname}
            handleChange={handleChange}
            className="w-full"
          />
        </div>
        <Input
          placeholder="Username"
          name="username"
          value={signUpForm.username}
          handleChange={handleChange}
        />
        <Input
          placeholder="Password"
          name="password"
          value={signUpForm.password}
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