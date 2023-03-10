import { useState } from 'react'
import { ModalOptions } from '../../store/types';
import { logout } from '../../store/user/userSlice';
import { getUser } from '../../store/user/user.selectors';
import Button from '../common/Button'
import DropDownWrapper from '../header/DropDownWrapper'
import useToggleModal from '../modals/useToggleModal';
import { clearImages } from '../../store/images/imageSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

type Props = {}

export default function UserCard({}: Props) {
  const dispatch = useAppDispatch();
  const [displayAccount, setDisplayAccount] = useState<boolean>(false);
  const user = useAppSelector(getUser);
  const promptModal = useToggleModal();
  
  const logoutUser = () => {
    dispatch(logout());
    dispatch(clearImages());
    setDisplayAccount(false);
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
              <div className="flex flex-col gap-4">
                <div className="h-8 text-lg text-purple-600 font-medium  w-full text-center">
                  <h4>Register or login</h4>
                </div>
                <div className="w-full flex justify-evenly">
                  <Button
                    className="hover:bg-white hover:text-orange-600 border-orange-600 hover:border-orange-400 hover:ring-orange-400 bg-orange-600 text-white"
                    label="Sign Up"
                    handleClick={() => {
                      promptModal(ModalOptions.signup);
                      setDisplayAccount(false);
                    }}
                  />
                  <Button
                    className="hover:bg-white hover:text-purple-600 border-purple-600 hover:border-purple-400 hover:ring-purple-400 bg-purple-600 text-white"
                    label="Login"
                    handleClick={() => {
                      promptModal(ModalOptions.login);
                      setDisplayAccount(false);
                    }}
                  />
                </div>
              </div>
            )
          }
        </DropDownWrapper>
      </Button>
    </div>
  )
}