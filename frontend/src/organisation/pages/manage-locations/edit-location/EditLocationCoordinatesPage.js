import React, { useState } from 'react'
import OrganisationAccountNavigation from '../../../../common/components/custom/OrganisationAccountNavigation'
import { useNavigate } from 'react-router'
import Button from '../../../../common/components/gov-uk/Button'
import Input from '../../../../common/components/gov-uk/Input'
import BackLink from '../../../../common/components/custom/BackLink'

export default function EditLocationCoordinatesPage () {
  const navigate = useNavigate()
  const [XCoordinate, setXCoordinate] = useState('')
  const [YCoordinate, setYCoordinate] = useState('')

  const handleButton = () => {
    // error checking here depending on figma
    // coordinate verifcation
    const isInEnglad = () => {
      return true
    }
    if (!isInEnglad) {
      // change when page made
      navigate('/')
    } else {
      // Change to confirm location page
      navigate('/')
    }
  }
  return (
    <>
      <OrganisationAccountNavigation />
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-one-half'>
            <h1 className='govuk-heading-l'>How do you want to change the existing location?</h1>
            <h3 className='govuk-heading-s govuk-!-margin-bottom-0'>X coordinate</h3>
            <p className='govuk-body govuk-!-margin-bottom-0'>A number representing how far east or west a location is (also known as an ‘easting’), for example: 362105.</p>
            <Input
              className='govuk-input govuk-input--width-20'
              name='Enter X coordinate'
              inputType='text'
              value={XCoordinate}
              onChange={(val) => setXCoordinate(val)}
            />

            <h3 className='govuk-heading-s govuk-!-margin-bottom-0'>Y coordinate</h3>
            <p className='govuk-body govuk-!-margin-bottom-0'>A number representing how far north or south a location is (also known as a ‘northing’), for example: 387217.</p>
            <Input
              className='govuk-input govuk-input--width-20'
              name='Enter Y coordinate'
              inputType='text'
              value={YCoordinate}
              onChange={(val) => setYCoordinate(val)}
            />

            <Button
              className='govuk-button'
              text='Continue'
              onClick={handleButton}
            />
          </div>
        </div>
      </main>
    </>
  )
}
