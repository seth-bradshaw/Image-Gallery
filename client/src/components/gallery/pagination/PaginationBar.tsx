import { isNil } from 'rambda'
import React from 'react'
import { useSelector } from 'react-redux';
import { getNextRequestUrl, getPrevRequestUrl } from '../../../store/images/images.selectors';
import Button from '../../common/Button'

type Props = {
  fetchUserImages: (url: string | null) => void
}

export default function PaginationBar({ fetchUserImages }: Props) {
  const next = useSelector(getNextRequestUrl);
  const prev = useSelector(getPrevRequestUrl);

  return (
    <div className="w-full p-4 flex items-center justify-evenly">
      <Button
        disabled={isNil(prev)}
        className="rounded-full w-8 h-8 bg-purple-600 text-white border-purple-600 hover:ring-purple-400 hover:bg-white hover:border-purple-400 hover:text-purple-600"
        label="<"
        handleClick={() => fetchUserImages(prev)}
      />
      <Button
        disabled={isNil(next)}
        className="rounded-full w-8 h-8 bg-purple-600 text-white border-purple-600 hover:ring-purple-400 hover:bg-white hover:border-purple-400 hover:text-purple-600"
        label=">"
        handleClick={() => fetchUserImages(next)}
      />
    </div>
  )
}