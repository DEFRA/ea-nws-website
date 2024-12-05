import React from 'react'
import UploadFileLayout from '../../../../layouts/location/upload/UploadFileLayout'

export default function LocationAddUploadFilePage () {
  // Prop value for setting the info to be displayed
  const uploadType = 'csv'

  return <UploadFileLayout uploadMethod={uploadType} />
}
