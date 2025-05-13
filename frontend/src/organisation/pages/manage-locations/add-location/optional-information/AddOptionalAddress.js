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
        <title>Add Optional Address - Next Warning Service GOV.UK</title>
      </Helmet>
      <AddressLayout
        navigateToNextPage={navigateToNextPage}
        error={error}
        setError={setError}
      />
    </>
  )
}
