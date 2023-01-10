import { changeModal } from "../../store/ui/uiSlice";
import { ModalOptions } from "../../store/types";
import { useAppDispatch } from "../../store/hooks";

const useToggleModal = () => {
    const dispatch = useAppDispatch();
    const closeModal = (modal: ModalOptions | null = null) => dispatch(changeModal(modal));
    

    return closeModal;
}

export default useToggleModal;