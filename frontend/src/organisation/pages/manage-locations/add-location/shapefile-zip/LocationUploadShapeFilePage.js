import React from 'react'
import UploadFileLayout from '../../../../layouts/location/upload/UploadFileLayout'

export default function LocationUploadShapeFilePage() {
  // Prop value for setting the info to be displayed
  const uploadType = 'shape'

  return (
    <>
      <UploadFileLayout uploadMethod={uploadType} />
    </>
  )
}
