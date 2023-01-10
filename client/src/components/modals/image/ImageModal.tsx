import React from 'react'
import { useAppSelector } from '../../../store/hooks';
import { getPoppedImage } from '../../../store/ui/ui.selectors'
import { formatSource } from '../../gallery/ImageCard';
import ModalWrapper from '../ModalWrapper';

type Props = {}

export default function ImageModal({}: Props) {
  const image = useAppSelector(getPoppedImage);

  if (!image) {
    return null;
  }

  return (
    <ModalWrapper title={image.tags.title} className="!h-fit !w-fit">
      <div className="overflow-hidden p-4">
        <img src={formatSource(image.handle)} className="object-scale-down max-h-[600px]" />
      </div>
    </ModalWrapper>
  )
}