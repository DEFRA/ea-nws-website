import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import OrganisationAccountNavigation from '../../../../../common/components/custom/OrganisationAccountNavigation'
import Button from '../../../../../common/components/gov-uk/Button'
import Details from '../../../../../common/components/gov-uk/Details'
import Input from '../../../../../common/components/gov-uk/Input'
import {
  setCurrentLocationCriticality,
  setCurrentLocationReference,
  setCurrentLocationType
} from '../../../../../common/redux/userSlice'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'

export default function AddKeyInformationPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [internalReference, setInternalReference] = useState('')
  const [businessCriticality, setBusinessCriticality] = useState('')
  const [locationType, setLocationType] = useState('')

  const handleButton = () => {
    if (internalReference !== '') {
      dispatch(setCurrentLocationReference(internalReference))
    }
    if (businessCriticality !== '') {
      dispatch(setCurrentLocationCriticality(businessCriticality))
    }
    if (locationType !== '') {
      dispatch(setCurrentLocationType(locationType))
    }
    navigate(orgManageLocationsUrls.optionalInformation.addKeywords)
  }

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  const detailsText = (
    <>
      <p>
        Adding optional information allows you to filter your organisation’s
        locations and helps you identify them more easily.{' '}
      </p>
      <p>
        <h3 className='govuk-heading-s'>Internal reference</h3>
        Your internal reference, for example: PS01, unit 57, Brid_04. This can
        help you identify the location more easily.
      </p>
      <p>
        <h3 className='govuk-heading-s'>Location type</h3>
        For example, pumping station, ground floor flat, office, retail unit.
      </p>
      <p>
        <h3 className='govuk-heading-s'>Business critically</h3>
        How important the location is to your business. For example, low or
        medium business critical.
      </p>
    </>
  )

  return (
    <>
      <OrganisationAccountNavigation />
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <h1 className='govuk-heading-l'>Key information</h1>
            <div className='govuk-body'>
              <Details
                title='Why add optional information?'
                text={detailsText}
              />
              <Input
                inputType='text'
                name='Internal reference (optional)'
                onChange={(val) => setInternalReference(val)}
                className='govuk-input govuk-input--width-20'
                isNameBold
                labelSize='s'
              />
              <Input
                inputType='text'
                name='Business criticality (optional)'
                onChange={(val) => setBusinessCriticality(val)}
                className='govuk-input govuk-input--width-20'
                isNameBold
                labelSize='s'
              />
              <Input
                inputType='text'
                name='Location type (optional)'
                onChange={(val) => setLocationType(val)}
                className='govuk-input govuk-input--width-20'
                isNameBold
                labelSize='s'
              />
              <Button
                text='Continue'
                className='govuk-button'
                onClick={handleButton}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
