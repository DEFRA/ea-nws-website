import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import Radio from '../../../common/components/gov-uk/Radio'
import { setOrganizationEmergencySector } from '../../../common/redux/userSlice'

export default function SectorLayout ({
  navigateToNextPage,
  NavigateToPreviousPage
}) {
  const dispatch = useDispatch()
  const [emergencySector, setEmergencySector] = useState(null)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (emergencySector === null) {
      setError(
        'Select whether your organisation is involved in responding to public emergencies or incidents'
      )
      return
    }
    dispatch(setOrganizationEmergencySector(emergencySector))
    navigateToNextPage()
  }

  const navigateBack = (event) => {
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
              Is your organisation a Category 1 or Category 2 responder?
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
                  For example, a  police, fire or ambulance service, local authority or member of <br />
                  a local resilience forum.
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
