import React from "react";
import { useSelector } from "react-redux";
import { ModalOptions } from "../../store/types";
import { getIsLoggedIn } from "../../store/user/user.selectors";
import Button from "../common/Button";
import useToggleModal from "../modals/useToggleModal";
import UserCard from "../user/UserCard";

type Props = {};

export default function Header({}: Props) {
  const promptModal = useToggleModal();
  const isLoggedIn = useSelector(getIsLoggedIn);

  return (
    <header className="p-4 flex w-full bg-slate-100 shadow">
      {isLoggedIn ? (
        <UserCard />
      ) : (
        <div className="w-full flex gap-4 justify-end">
          <Button
            className="hover:bg-white hover:text-orange-600 border-orange-600 hover:border-orange-400 hover:ring-orange-400 bg-orange-600 text-white"
            label="Sign Up"
            handleClick={() => promptModal(ModalOptions.signup)}
          />
          <Button
            className="hover:bg-white hover:text-purple-600 border-purple-600 hover:border-purple-400 hover:ring-purple-400 bg-purple-600 text-white"
            label="Login"
            handleClick={() => promptModal(ModalOptions.login)}
          />
        </div>
      )}
    </header>
  );
}
