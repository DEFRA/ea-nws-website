import { React, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router'
import AddressLayout from '../../../../layouts/optional-info/AddressLayout'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'

export default function AddOptionalAddress () {
  const navigate = useNavigate()
  const [error, setError] = useState(null)

  const navigateToNextPage = () => {
    navigate(orgManageLocationsUrls.add.optionalInformation.addKeyInformation)
  }

  return (
    <>
      <Helmet>
        <title>Add optional address for this location - Manage locations - Get flood warnings (professional) - GOV.UK</title>
      </Helmet>
      <AddressLayout
        navigateToNextPage={navigateToNextPage}
        error={error}
        setError={setError}
      />
    </>
  )
}
