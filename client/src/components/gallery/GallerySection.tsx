import { isEmpty, isNil } from "rambda";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchImages from "../../store/images/fetchImages.thunk";
import { getImages, getNextRequestUrl } from "../../store/images/images.selectors";
import { getIsLoggedIn } from "../../store/user/user.selectors";
import Button from "../common/Button";
import ImageGrid from "./ImageGrid";
import PaginationBar from "./pagination/PaginationBar";
import FileUploader from "./upload/FileUploader";

type Props = {};

export default function GallerySection({}: Props) {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const images = useSelector(getImages);
  const dispatch = useDispatch();

  // @ts-ignore
  const fetchUserImages = async (url: string | null) => dispatch(fetchImages(url));

  useEffect(() => {
    if (isEmpty(images) && isLoggedIn) {
      fetchUserImages(null);
    }
  }, [isLoggedIn]);

  return (
    <section className="w-full px-10 py-20 rounded-lg">
      <ImageGrid images={images}/>
      <PaginationBar fetchUserImages={fetchUserImages} />
    </section>
  );
}
