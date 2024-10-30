import React from 'react'
import UploadFileLayout from '../../../../layouts/location/upload/UploadFileLayout'

export default function LocationAddUploadFilePage () {
  // Prop value for the setting the type of file upload
  const uploadType = 'bulk'

  return <UploadFileLayout uploadMethod={uploadType} />
}
