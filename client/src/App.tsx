import Gallery from './components/gallery/GallerySection';
import ModalPortal from './components/modals/ModalPortal';
import Header from './components/header/Header';

function App() {
  return (
    <div className="h-full">
      <Header />
      <Gallery /> 
      <ModalPortal />
    </div>
  );
}

export default App;
