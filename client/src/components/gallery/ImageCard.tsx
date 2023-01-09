import React from 'react'
import { useDispatch } from 'react-redux'
import { CDN_BASE_SRC } from '../../constants/endpoints'
import { Image } from '../../store/types'
import { popImage } from '../../store/ui/uiSlice'
import useImageTitle from './hooks/useImageTitle'

type Props = {
  image: Image
}

export const formatSource = (handle: string) => `${CDN_BASE_SRC}/${handle}`;

export default function ImageCard({ image }: Props) {
  const dispatch = useDispatch();
  const title = useImageTitle(image._id);

  return (
    <div className="h-64 w-full p-8 shadow bg-white flex flex-col gap-4 rounded-lg text-center">
      <div className="h-4 w-full">
        <p>{title ?? ''}</p>
      </div>
      <div className="w-full h-full flex items-start justify-center hover:cursor-pointer" onClick={() => dispatch(popImage(image))}>
        <img className="object-scale-down object-center max-h-40" src={formatSource(image.handle)}></img>
      </div>
    </div>
  )
}