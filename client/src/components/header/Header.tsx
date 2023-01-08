import React from "react";
import { ModalOptions } from "../../store/types";
import Button from "../common/Button";
import useToggleModal from "../modals/useToggleModal";

type Props = {};

export default function Header({}: Props) {
  const promptModal = useToggleModal();

  return (
    <header className="h-30 flex flex-row-reverse w-full bg-slate-300">
      <Button
        className=""
        label="Login"
        handleClick={() => promptModal(ModalOptions.login)}
      />
    </header>
  );
}
