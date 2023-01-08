import React, { useEffect, useState } from 'react';
import * as filestack from 'filestack-js';
import Button from '../../common/Button';

type Props = {
  config?: any
}

export default function FileUploader({ config }: Props) {
  const [client, setClient] = useState<filestack.Client>();
  const options = {
    onFileUploadFinished: (file: filestack.PickerFileMetadata) => console.log('finished upload', { file }),
    onFileUploadFailed: (file: filestack.PickerFileMetadata, error: Error) => console.log('failed to upload', { file, error }),
    onClose: () => console.log('closed'),
    fromSources: ['local_file_system', 'url', 'imagesearch', 'facebook', 'instagram', 'googledrive', 'dropbox', 'unsplash']
  }

  useEffect(() => {
    const fsClient = filestack.init(process.env.REACT_APP_FILESTACK_API_KEY ?? '');

    if (fsClient) {
      setClient(fsClient)
    }

  }, [])
  
  const open = () => {
    if (client) {
      client.picker(options).open();
    }
  }

  return (
    <Button className="bg-green-600" label="Upload" handleClick={open}></Button>
  )
}