import { useSelector } from "react-redux";
import { getImages } from "../../../store/images/images.selectors";

const useImageTitle = (imgId: string) => {
    const images = useSelector(getImages);
    return images.filter(image => imgId === image._id)[0].tags.title
}

export default useImageTitle;