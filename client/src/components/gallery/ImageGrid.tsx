import { Image } from '../../store/types';
import ImageCard from './ImageCard';

type Props = {
  images: Array<Image>
}

export default function ImageGrid({ images }: Props) {

  return (
    <div className="w-full p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 rounded-lg bg-slate-50">
      { 
        images.map(image => <ImageCard image={image} />) 
      }
    </div>
  )
}