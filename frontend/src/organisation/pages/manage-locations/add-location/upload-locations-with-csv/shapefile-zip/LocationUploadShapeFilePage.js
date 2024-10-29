import React from 'react'
import UploadFileLayout from '../../../../../layouts/location/upload/UploadFileLayout'

export default function LocationUploadShapeFilePage() {
  // Prop values for the file upload
  const uploadType = 'shape'
  const allowedTypes = ['application/zip']
  const fileSize = 5
  const fileTypeMessage = 'File must be .zip'
  const backendPath = '#'

  return (
    <UploadFileLayout
      uploadMethod={uploadType}
      allowedFileTypes={allowedTypes}
      maxFileSize={fileSize}
      fileTypeHint={fileTypeMessage}
      backendRoute={backendPath}
    />
  )
}
