import React, { useState } from "react";
import Button, { ButtonType } from "../../common/Button";
import Input, { HandleChangeEvent } from "../../common/Input";
import { UploadTags } from "filestack-js";
import DropDownWrapper from "../../header/DropDownWrapper";
import { ImageTags } from "../../../store/types";

type Props = {
  open: (tags: ImageTags) => void;
  displayOptions: boolean;
};

export default function UploadOptions({ open, displayOptions }: Props) {
  const [title, setTitle] = useState<string>("");
  const [scope, setScope] = useState<string>("private");

  const updateTitle = (e: HandleChangeEvent) => setTitle(e.target.value);

  const updateScope = (e: HandleChangeEvent) => setScope(e.target.value);

  const handleSubmit = () => {
    open({ scope, title  });
  };

  return (
    <DropDownWrapper display={displayOptions}>
      <div className="py-1">
        <form
          className="flex flex-col items-center gap-4"
        >
          <Input
            name="title"
            className=""
            placeholder="Image Title"
            label="Image Title"
            value={title}
            handleChange={updateTitle}
          />
          <div className="flex items-center gap-4">
            <div>
              <input
                type="radio"
                id="public_upload_option"
                name="scope"
                value="public"
                checked={scope === "public"}
                onChange={updateScope}
              />
              <label htmlFor="public_upload_option" className="text-md ml-2">
                Public
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="private_upload_option"
                name="scope"
                value="private"
                checked={scope === "private"}
                onChange={updateScope}
              />
              <label htmlFor="private_upload_option">Private</label>
            </div>
          </div>
          <Button
            className="text-orange-600 border-orange-600 bg-white w-20 px-4 py-2 text-sm hover:ring-orange-400"
            label="Continue"
            handleClick={handleSubmit}
          />
        </form>
      </div>
    </DropDownWrapper>
  );
}
