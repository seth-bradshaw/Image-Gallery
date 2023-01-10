import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import fetchImages from "../../store/images/fetchImages.thunk";
import { getImages } from "../../store/images/images.selectors";
import { getIsLoggedIn } from "../../store/user/user.selectors";
import ImageGrid from "./ImageGrid";
import PaginationBar from "./pagination/PaginationBar";

type Props = {};

export default function GallerySection({}: Props) {
  const isLoggedIn = useAppSelector(getIsLoggedIn);
  const images = useAppSelector(getImages);
  const dispatch = useAppDispatch();

  const fetchUserImages = async (url: string | null) => dispatch(fetchImages(url));

  useEffect(() => {
    fetchUserImages(null);
  }, [isLoggedIn]);

  return (
    <section className="w-full px-10 py-20 rounded-lg">
      <ImageGrid images={images}/>
      <PaginationBar fetchUserImages={fetchUserImages} />
    </section>
  );
}
