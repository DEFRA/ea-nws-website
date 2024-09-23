import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../../../../common/components/custom/BackLink'
import OrganisationAccountNavigation from '../../../../../../../common/components/custom/OrganisationAccountNavigation'
import Button from '../../../../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../../../../common/components/gov-uk/ErrorSummary'
import Input from '../../../../../../../common/components/gov-uk/Input'

export default function LocationXYCoordinatesSearchPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [xCoordinate, setXCoordinate] = useState('')
  const [xCoordinateError, setXCoordinateError] = useState('')
  const [yCoordinate, setYCoordinate] = useState('')
  const [yCoordinateError, setYCoordinateError] = useState('')

  // TODO Stll need async once complete?
  const handleSubmit = async () => {
    setXCoordinateError('')
    setYCoordinateError('')
    if (!xCoordinate) {
      setXCoordinateError('Enter an X coordinate')
    }
    if (!yCoordinate) {
      setYCoordinateError('Enter a Y coordinate')
    }
    // const postCodeValidationError = postCodeValidation(postCode)
    // if (!postCodeValidationError) {
    //   // normalise postcode
    //   const dataToSend = {
    //     postCode: postCode.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()
    //   }
    //   const { data, errorMessage } = await backendCall(
    //     dataToSend,
    //     'api/os-api/postcode-search',
    //     navigate
    //   )
    //   if (!errorMessage) {
    //     dispatch(setLocationPostCode(data[0].postcode))
    //     dispatch(setLocationSearchResults(data))
    //     navigate('/organisation/manage-locations/add/postcode-search-results')
    //   } else {
    //     // show error message from OS Api postcode search
    //     setError(errorMessage)
    //   }
    // } else {
    //   setError(postCodeValidationError)
    // }
  }

  const navigateBack = async (event) => {
    event.preventDefault()
    navigate(-1)
  }

  return (
    <>
      <OrganisationAccountNavigation />
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {(xCoordinateError || yCoordinateError) && (
              <ErrorSummary errorList={[xCoordinateError, yCoordinateError]} />
            )}
            <h1 className='govuk-heading-l'>
              What are the X and Y coordinates?
            </h1>
            <div className='govuk-body'>
              <Input
                name='X coordinate'
                subName="A number representing how far east or west a location is (also known as an 'easting'), for example: 362105."
                inputType='text'
                value={xCoordinate}
                onChange={(val) => setXCoordinate(val)}
                error={xCoordinateError}
                isNameBold={true}
                className='govuk-input govuk-input--width-20'
              />
              <Input
                name='Y coordinate'
                subName="A number representing how far north or south a location is (also known as a 'northing'), for example: 387217."
                inputType='text'
                value={yCoordinate}
                onChange={(val) => setYCoordinate(val)}
                error={yCoordinateError}
                isNameBold={true}
                className='govuk-input govuk-input--width-20'
              />
              <Button
                text='Continue'
                className='govuk-button'
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
