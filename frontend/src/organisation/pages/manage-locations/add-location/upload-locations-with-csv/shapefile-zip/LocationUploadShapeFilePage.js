import React from 'react'
import UploadFileLayout from '../../../../../layouts/location/upload/UploadFileLayout'

export default function LocationUploadShapeFilePage() {
  const allowedTypes = ['application/zip']
  const fileSize = 5
  const fileTypeMessage = 'File must be .zip'
  const backendPath = '#'

  return (
    <UploadFileLayout
      allowedFileTypes={allowedTypes}
      maxFileSize={fileSize}
      fileTypeHint={fileTypeMessage}
      backendRoute={backendPath}
    />
  )
}
