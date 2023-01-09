import React, { useState } from 'react'
import Button from '../../common/Button'
import UploadOptions from './UploadOptions'
import { ImageTags } from '../../../store/types'

type Props = {
    open: (tags: ImageTags) => void;
}

export default function UploadButton({ open }: Props) {
    const [displayOptions, setDisplayOptions] = useState(false);
    const handleClick = (tags: ImageTags) => {
      setDisplayOptions(false);
      open(tags)
    }
  return (
      <Button className="bg-orange-600 inline-flex justify-center text-white border-orange-600 hover:ring-orange-400 hover:bg-white hover:border-orange-400 hover:text-orange-600" label="Upload" handleClick={() => setDisplayOptions(!displayOptions)}>
        <UploadOptions open={handleClick} displayOptions={displayOptions} />
      </Button>
  )
}