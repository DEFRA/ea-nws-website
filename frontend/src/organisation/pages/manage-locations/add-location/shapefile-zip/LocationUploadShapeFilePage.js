import React from 'react'
import { Helmet } from 'react-helmet'
import UploadFileLayout from '../../../../layouts/location/upload/UploadFileLayout'

export default function LocationUploadShapeFilePage () {
  // Prop value for setting the info to be displayed
  const uploadType = 'shape'

  return (
    <>
      <Helmet>
        <title>Upload shapefile - GOV.UK</title>
      </Helmet>
      <UploadFileLayout uploadMethod={uploadType} />
    </>
  )
}
