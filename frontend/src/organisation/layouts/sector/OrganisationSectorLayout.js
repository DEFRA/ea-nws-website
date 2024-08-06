import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import Radio from '../../../common/components/gov-uk/Radio'
import { setOrgEmergencySector } from '../../../common/redux/userSlice'

export default function OrganisationSectorLayout({
  NavigateToNextPage,
  NavigateToPreviousPage
}) {
  const dispatch = useDispatch()
  const organisation = useSelector((state) => state.session.organisation)
  const [emergencySector, setEmergencySector] = useState(null)
  const [error, setError] = useState('')

  // Clear error when user makes changes
  useEffect(() => {
    setError('')
  }, [emergencySector])

  // RP DEBUG
  useEffect(() => {
    console.log('Updated organisation:', organisation)
  }, [organisation])

  const handleSubmit = async () => {
    if (emergencySector === null) {
      setError(
        'Select whether your organisation is involved in responding to public emergencies or incidents'
      )
      return
    }

    dispatch(setOrgEmergencySector(emergencySector))
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
                Known as Category 1 or Category 2 responders. For example,
                police, fire or ambulance services, local authorities or member
                of a local resilience forum.
                {error && (
                  <p className='govuk-error-message'>
                    <br />
                    {error}
                  </p>
                )}
                <div className='govuk-radios'>
                  <Radio
                    key='radio_yes'
                    name='Yes'
                    label='Yes'
                    onChange={() => setEmergencySector(true)}
                  />
                  <Radio
                    key='radio_no'
                    name='Yes'
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
