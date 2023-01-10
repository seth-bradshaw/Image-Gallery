import { useAppSelector } from '../../store/hooks'
import { ModalOptions } from '../../store/types'
import { getModal } from '../../store/ui/ui.selectors'
import LoginModal from './auth/LoginModal'
import SignupModal from './auth/SignupModal'
import ImageModal from './image/ImageModal'

type Props = {}

export default function ModalPortal({}: Props) {
  const modal = useAppSelector(getModal);
  
  switch (modal) {
    case ModalOptions.login:
      return <LoginModal />
    case ModalOptions.signup:
      return <SignupModal />
    case ModalOptions.image:
      return <ImageModal />
    default:
      return null;
  }
}