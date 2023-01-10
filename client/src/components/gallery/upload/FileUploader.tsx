import React, { useEffect, useRef, useState } from 'react';
import * as filestack from 'filestack-js';
import uploadImage from '../../../store/images/uploadImage.thunk';
import UploadButton from './UploadButton';
import { ImageTags } from '../../../store/types';
import { getIsLoggedIn } from '../../../store/user/user.selectors';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

type Props = {}

interface UploadError {
  filesFailed: Array<filestack.PickerFileMetadata>;
  error: Error;
}

export default function FileUploader({}: Props) {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(getIsLoggedIn)
  const [client, setClient] = useState<filestack.Client>();
  const [error, setError] = useState<UploadError>({ filesFailed: [], error: {} as Error });
  const tags = useRef<ImageTags>({} as ImageTags);

  const handleSuccess = async ({ handle }: filestack.PickerFileMetadata) => {
    dispatch(uploadImage({ handle, tags: tags.current }))
  }

  useEffect(() => {
    const fsClient = filestack.init(process.env.REACT_APP_FILESTACK_API_KEY ?? '');

    if (fsClient) {
      setClient(fsClient)
    }

  }, [])
  
  const open = (imageTags: ImageTags) => {
    tags.current = imageTags

    const options = {
      onFileUploadFinished: handleSuccess,
      onFileUploadFailed: (file: filestack.PickerFileMetadata, err: Error) => setError({ filesFailed: [...error.filesFailed, file], error: err }),
      accept: ["image/*"],
      transformations: {
        crop: true,
        circle: true,
        rotate: true
      },
      uploadConfig: {
        retry: 3,
        timeout: 60000,
        tags: (tags.current as any)
      },
      fromSources: ['local_file_system', 'url', 'imagesearch', 'facebook', 'instagram', 'googledrive', 'dropbox', 'unsplash', 'webcam', 'googlephotos']
    }

    if (client) {
      client.picker(options).open();
    }
  }

  return isLoggedIn ? (
    <div className="relative inline-block">
      <UploadButton open={open} />
    </div>
  ) : null;
}