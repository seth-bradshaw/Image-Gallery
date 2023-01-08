import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ModalOptions } from '../../store/types'
import { getModal } from '../../store/ui/ui.selectors'
import LoginModal from './auth/LoginModal'

type Props = {}

export default function ModalPortal({}: Props) {
  const modal = useSelector(getModal);
  
  switch (modal) {
    case ModalOptions.login:
      return <LoginModal />
    default:
      return null;
  }
}