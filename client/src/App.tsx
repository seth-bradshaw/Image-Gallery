import { useEffect } from 'react';
// @ts-ignore
import Cookies from 'js-cookie'
import Gallery from './components/gallery/GallerySection';
import ModalPortal from './components/modals/ModalPortal';
import Header from './components/header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { getIsLoggedIn } from './store/user/user.selectors';
import loginWithToken from './store/user/loginWithToken.thunk';

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      const auth_token = Cookies.get('auth_token');
      if (auth_token) {
        // @ts-ignore
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
