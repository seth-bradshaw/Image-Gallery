import { isEmpty, isNil } from "rambda";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchImages from "../../store/images/fetchImages.thunk";
import { Image } from "../../store/types";
import Button from "../common/Button";
import FileUploader from "./upload/FileUploader";

type Props = {};

export default function GalleryWrapper({}: Props) {
  // @ts-ignore
  const state = useSelector((state) => state.images);
  const dispatch = useDispatch();
  // @ts-ignore
  const getImages = async () => await dispatch(fetchImages(state.next));

  useEffect(() => {
    if (isEmpty(state.images) && state.offset === 0) {
      getImages();
    }
  }, [state.images]);

  return (
    <div>
      <FileUploader />
      {state.images.map((img: Image) => {
        return (
          <img
            src={`https://cdn.filestackcontent.com/resize=width:300/${img.handle}`}
          ></img>
        );
      })}
      <Button
        disabled={isNil(state.next)}
        className="bg-purple-600"
        label="get images"
        handleClick={getImages}
      />
    </div>
  );
}
