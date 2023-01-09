import React from "react";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../store/user/user.selectors";
import FileUploader from "../gallery/upload/FileUploader";
import useToggleModal from "../modals/useToggleModal";
import UserCard from "../user/UserCard";

type Props = {};

export default function Header({}: Props) {
  return (
    <header className="p-4 flex w-full bg-slate-100 shadow">
        <div className="w-full flex gap-4 justify-end">
          <FileUploader />
          <UserCard />
        </div>
    </header>
  );
}
