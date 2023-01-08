import React from 'react'
import ModalWrapper from '../ModalWrapper';
import SignupForm from './SignupForm';

type Props = {}

export default function SignupModal({}: Props) {
  return (
    <ModalWrapper title="Register">
        <SignupForm />
    </ModalWrapper>
  )
}