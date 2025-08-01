import React from 'react'
import { Helmet } from 'react-helmet'
import CannotChangeLocationManuallyLayout from '../../../../../../layouts/location/add-or-edit-location/edit-shape/CannotChangeLocationManuallyLayout'

export default function CannotChangeLocationPolygonPage () {
  return (
    <>
      <Helmet>
        <title>This location cannot be changed - Manage locations - Get flood warnings (professional) - GOV.UK</title>
      </Helmet>
      <CannotChangeLocationManuallyLayout LocationType='polygon' />
    </>
  )
}
