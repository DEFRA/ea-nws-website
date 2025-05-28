import React from 'react'
import { Helmet } from 'react-helmet'
import CannotChangeLocationManuallyLayout from '../../../../../../layouts/location/add-or-edit-location/edit-shape/CannotChangeLocationManuallyLayout'

export default function CannotChangeLocationPolygonPage () {
  return (
    <>
      <Helmet>
        <title>Cannot Change Location - GOV.UK</title>
      </Helmet>
      <CannotChangeLocationManuallyLayout LocationType='polygon' />
    </>
  )
}
