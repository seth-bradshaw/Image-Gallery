import React from 'react'
import { CDN_BASE_SRC } from '../../constants/endpoints'
import { Image } from '../../store/types'
import useImageTitle from './hooks/useImageTitle'

type Props = {
  image: Image
  height?: number
}

export default function ImageCard({ image, height = 200 }: Props) {
  const formatSource = () => `${CDN_BASE_SRC}/resize=height:${height}/${image.handle}`;
  const title = useImageTitle(image._id);

  return (
    <div className="h-64 w-full p-8 shadow bg-white flex flex-col gap-4 rounded-lg text-center">
      <div className="h-4 w-full">
        <p>{title ?? ''}</p>
      </div>
      <div className="w-full h-full flex items-start justify-center overflow-hidden">
        <img className="object-scale-down" src={formatSource()}></img>
      </div>
    </div>
  )
}