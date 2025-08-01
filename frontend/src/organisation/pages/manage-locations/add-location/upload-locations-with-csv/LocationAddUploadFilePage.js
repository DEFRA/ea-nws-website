import React from 'react'
import { Helmet } from 'react-helmet'
import UploadFileLayout from '../../../../layouts/location/upload/UploadFileLayout'

export default function LocationAddUploadFilePage () {
  // Prop value for setting the info to be displayed
  const uploadType = 'csv'

  return (
    <>
      <Helmet>
        <title>Upload file - Manage locations - Get flood warnings (professional) - GOV.UK</title>
      </Helmet>
      <UploadFileLayout uploadMethod={uploadType} />
    </>
  )
}
