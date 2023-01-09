import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ModalOptions } from '../../store/types';
import { logout } from '../../store/user/userSlice';
import { getIsLoggedIn, getUser } from '../../store/user/user.selectors';
import Button from '../common/Button'
import DropDownWrapper from '../header/DropDownWrapper'
import useToggleModal from '../modals/useToggleModal';
import { clearImages } from '../../store/images/imageSlice';

type Props = {}

export default function UserCard({}: Props) {
  const dispatch = useDispatch();
  const [displayAccount, setDisplayAccount] = useState<boolean>(true);
  const user = useSelector(getUser);
  const promptModal = useToggleModal();
  
  const logoutUser = () => {
    dispatch(logout());
    dispatch(clearImages());
  }

  const toggleDisplay = () => {
    setDisplayAccount(!displayAccount)
  }

  return (
    <div className="relative inline-block">
      <Button className="hover:bg-white hover:text-orange-600 border-orange-600 hover:border-orange-400 hover:ring-orange-400 bg-orange-600 text-white" label="Account" handleClick={toggleDisplay}>
        <DropDownWrapper display={displayAccount}>
          {
            user.isLoggedIn ? (
              <div className="flex flex-col gap-4 items-center justify-center w-full">
                <div className="h-8 text-lg text-purple-600 font-medium  w-full text-center">
                  <h4>Hi {user.username}!</h4>
                </div>
                <div className="h-8 w-full hover:bg-slate-300 hover:text-purple-600 border-2 border-l-0 border-r-0 border-slate-300 text-slate-600 text-md flex justify-center items-center">
                  <a onClick={(e) => e.preventDefault()} href="#settings">Settings</a>
                </div>
                <Button label="Logout" className="hover:bg-white hover:text-purple-600 border-purple-600 hover:border-purple-400 hover:ring-purple-400 bg-purple-600 text-white" handleClick={logoutUser} />
              </div>
            ) : (
              <div>
                <Button
                  className="hover:bg-white hover:text-orange-600 border-orange-600 hover:border-orange-400 hover:ring-orange-400 bg-orange-600 text-white"
                  label="Sign Up"
                  handleClick={() => promptModal(ModalOptions.signup)}
                />
                <Button
                  className="hover:bg-white hover:text-purple-600 border-purple-600 hover:border-purple-400 hover:ring-purple-400 bg-purple-600 text-white"
                  label="Login"
                  handleClick={() => promptModal(ModalOptions.login)}
                />
              </div>
            )
          }
        </DropDownWrapper>
      </Button>
    </div>
  )
}