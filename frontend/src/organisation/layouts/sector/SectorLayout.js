import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import Radio from '../../../common/components/gov-uk/Radio'
import { setProfile } from '../../../common/redux/userSlice'
import {
  getOrganisationAdditionals,
  updateOrganisationAdditionals
} from '../../../common/services/ProfileServices'

export default function SectorLayout ({
  NavigateToNextPage,
  NavigateToPreviousPage
}) {
  const dispatch = useDispatch()
  const [emergencySector, setEmergencySector] = useState(null)
  const [error, setError] = useState('')
  const profile = useSelector((state) => state.session.profile)

  const handleSubmit = async () => {
    if (emergencySector === null) {
      setError(
        'Select whether your organisation is involved in responding to public emergencies or incidents'
      )
      return
    }

    const organisation = Object.assign({}, getOrganisationAdditionals(profile))
    organisation.emergencySector = emergencySector

    const updatedProfile = updateOrganisationAdditionals(profile, organisation)
    dispatch(setProfile(updatedProfile))
    NavigateToNextPage()
  }

  const navigateBack = async (event) => {
    event.preventDefault()
    NavigateToPreviousPage()
  }

  return (
    <>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {error && <ErrorSummary errorList={[error]} />}
            <h1 className='govuk-heading-l'>
              Is your organisation involved in responding to public emergencies
              or incidents?
            </h1>
            <div className='govuk-body'>
              <div
                className={
                  error
                    ? 'govuk-form-group govuk-form-group--error'
                    : 'govuk-form-group'
                }
              >
                <p className='govuk-hint'>
                  Known as Category 1 or Category 2 responders. For example,
                  police, fire or ambulance services, local authorities or
                  member of a local resilience forum.
                </p>
                {error && (
                  <p className='govuk-error-message'>
                    <br />
                    {error}
                  </p>
                )}
                <div className='govuk-radios'>
                  <Radio
                    key='radio_yes'
                    name='emergencySectorRadio'
                    label='Yes'
                    onChange={() => setEmergencySector(true)}
                  />
                  <Radio
                    key='radio_no'
                    name='emergencySectorRadio'
                    label='No'
                    onChange={() => setEmergencySector(false)}
                  />
                  <br />
                </div>
              </div>
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
