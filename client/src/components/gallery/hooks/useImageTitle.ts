import { useAppSelector } from "../../../store/hooks";
import { getImages } from "../../../store/images/images.selectors";

const useImageTitle = (imgId: string) => {
    const images = useAppSelector(getImages);
    return images.filter(image => imgId === image._id)[0].tags.title
}

export default useImageTitle;