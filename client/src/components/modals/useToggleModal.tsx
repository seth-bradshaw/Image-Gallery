import { useDispatch } from "react-redux";
import { changeModal } from "../../store/ui/uiSlice";
import { ModalOptions } from "../../store/types";

const useToggleModal = () => {
    const dispatch = useDispatch();
    const closeModal = (modal: ModalOptions | null = null) => dispatch(changeModal(modal));
    

    return closeModal;
}

export default useToggleModal;