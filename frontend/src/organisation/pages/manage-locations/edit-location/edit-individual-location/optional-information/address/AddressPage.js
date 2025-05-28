import { React, useState } from 'react'
import { Helmet } from 'react-helmet'
import AddressLayout from '../../../../../../layouts/optional-info/AddressLayout'
import updateLocationAndNavigate from '../../../../updateLocationAndNavigate'

export default function AddressPage () {
  const [error, setError] = useState(null)

  const navigateToNextPage = updateLocationAndNavigate(
    setError,
    'Address changed'
  )

  const additionalInfo = (
    <p>
      If you change the address for this location it will not update the X and Y
      coordinates associated with this location.
      <br />
      <br />
      If you want to update the X and Y coordinates associated with this
      location, you'll need to change them separately.
    </p>
  )

  return (
    <>
      <Helmet>
        <title>Edit Address - GOV.UK</title>
      </Helmet>
      <AddressLayout
        navigateToNextPage={navigateToNextPage}
        additionalInfo={additionalInfo}
        error={error}
        setError={setError}
      />
    </>
  )
}
