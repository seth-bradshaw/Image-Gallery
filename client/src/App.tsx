import { useEffect } from 'react';
import Cookies from 'js-cookie'
import Gallery from './components/gallery/GallerySection';
import ModalPortal from './components/modals/ModalPortal';
import Header from './components/header/Header';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { getIsLoggedIn } from './store/user/user.selectors';
import loginWithToken from './store/user/loginWithToken.thunk';

function App() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(getIsLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      const auth_token = Cookies.get('auth_token');
      if (auth_token) {
        dispatch(loginWithToken());
      }
    }
  }, [isLoggedIn])

  return (
    <div className="h-full min-h-screen bg-purple-300">
      <Header />
      <Gallery /> 
      <ModalPortal />
    </div>
  );
}

export default App;
