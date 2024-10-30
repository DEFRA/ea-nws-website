import React from 'react'
import UploadFileLayout from '../../../../../layouts/location/upload/UploadFileLayout'

export default function LocationUploadShapeFilePage () {
  // Prop value for the setting the type of file upload
  const uploadType = 'shape'

  return <UploadFileLayout uploadMethod={uploadType} />
}
