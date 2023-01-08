import React, { useState } from 'react'
import ModalWrapper from '../ModalWrapper';
import useToggleModal from '../useToggleModal';
import LoginForm from './LoginForm';

type Props = {}

export default function LoginModal({}: Props) {
  return (
    <ModalWrapper title="Login">
      <LoginForm />
    </ModalWrapper>
  )
}