import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import Radio from '../../../common/components/gov-uk/Radio'
import TextArea from '../../../common/components/gov-uk/TextArea'
import { backendCall } from '../../../common/services/BackendService'

export default function AccountDeletePage () {
  const navigate = useNavigate()
  const charLimit = 2000
  const charLimitText = 'Your answer must be 2000 characters or fewer'
  const accountDeletionReasonOptions = [
    { value: 'MovedOutOfArea', label: 'Moved out of area' },
    { value: 'TooManyWarnings', label: 'Too many warnings' },
    { value: 'WarningsAreTooLate', label: 'Warnings are too late' },
    { value: 'NotGettingAnyWarnings', label: 'Not getting any warnings' },
    { value: 'MyDetailsAreIncorrect', label: 'My details are incorrect' },
    { value: 'ConcernedAboutPrivacy', label: 'Concerned about privacy' }
  ]

  const [accountDeletionReason, setAccountDeletionReason] = useState('')
  const [accountDeletionReasonText, setaccountDeletionReasonText] = useState('')
  const [accountDeletionFurtherInfo, setAccountDeletionFurtherInfo] =
    useState('')
  const [reasonError, setReasonError] = useState('')
  const [reasonTextError, setReasonTextError] = useState('')
  const [furtherInfoError, setFurtherInfoError] = useState('')

  const session = useSelector((state) => state.session)
  const authToken = session.authToken

  useEffect(() => {
    setReasonError('')
  }, [accountDeletionReason])

  useEffect(() => {
    setReasonTextError('')
  }, [accountDeletionReasonText])

  useEffect(() => {
    setFurtherInfoError('')
  }, [accountDeletionFurtherInfo])

  const handleButton = async (event) => {
    event.preventDefault()
    let isValidInput = true

    // Check if reason is selected
    if (!accountDeletionReason) {
      setReasonError('Select a reason for deleting your account')
      isValidInput = false
    }

    // Checks for 'other' reason selected
    if (accountDeletionReason === 'Other') {
      if (!accountDeletionReasonText) {
        setReasonTextError('Enter reason for deleting your account')
        isValidInput = false
      } else if (accountDeletionReasonText.length > charLimit) {
        setReasonTextError(charLimitText)
        isValidInput = false
      }
    }

    // Check for further information text length
    if (accountDeletionFurtherInfo.length > charLimit) {
      setFurtherInfoError(charLimitText)
      isValidInput = false
    }

    if (isValidInput) {
      const dataToSend = {
        authToken,
        accountDeletionReason,
        accountDeletionReasonText,
        accountDeletionFurtherInfo
      }

      const { errorMessage } = await backendCall(
        dataToSend,
        'api/account/delete',
        navigate
      )

      if (!errorMessage) {
        navigate('/account/delete/confirm')
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>Delete your account - GOV.UK</title>
      </Helmet>
      <BackLink onClick={() => navigate(-1)} />
      {/* Main body */}
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-full'>
            {/* Error summary */}
            {(reasonError || reasonTextError || furtherInfoError) && (
              <ErrorSummary
                errorList={[reasonError, reasonTextError, furtherInfoError]}
              />
            )}
            <h1 className='govuk-heading-l'>
              Delete your account and cancel flood messages
            </h1>
            <div className='govuk-body'>
              <p className='govuk-body govuk-!-margin-bottom-6'>
                We'll no longer send you any flood messages for all your
                locations.
              </p>
              <fieldset className='govuk-fieldset'>
                <legend className='govuk-fieldset__legend'>
                  <h2 className='govuk-heading-m'>
                    Select reason for deleting your account
                  </h2>
                </legend>
                <p className='govuk-body govuk-!-margin-bottom-6'>
                  This helps us to improve this service.
                </p>

                {/* Select account deletion reason */}
                <div
                  className={
                        reasonError
                          ? 'govuk-form-group govuk-form-group--error'
                          : 'govuk-form-group'
                      }
                >
                  <div className='govuk-radios' data-module='govuk-radios'>
                    {reasonError && (
                      <p className='govuk-error-message'>{reasonError}</p>
                    )}
                    {accountDeletionReasonOptions.map((option) => (
                      <Radio
                        key={option.value}
                        name='accountDeletionReasonRadios'
                        label={option.label}
                        value={option.value}
                        onChange={(e) =>
                          setAccountDeletionReason(e.target.value)}
                      />
                    ))}
                    <Radio
                      label='Other'
                      value='Other'
                      name='accountDeletionReasonRadios'
                      onChange={(e) =>
                        setAccountDeletionReason(e.target.value)}
                      conditional={accountDeletionReason === 'Other'}
                      conditionalQuestion='Reason for deleting account'
                      conditionalInput={(val) =>
                        setaccountDeletionReasonText(val)}
                      conditionalError={reasonTextError}
                    />
                  </div>
                </div>
              </fieldset>

                <br />

                {/* Enter account deletion optional information */}
                <div
                  className={
                        furtherInfoError
                          ? 'govuk-form-group govuk-form-group--error'
                          : 'govuk-form-group'
                      }
                >
                  <fieldset className='govuk-fieldset' />
                  <h2 className='govuk-label-wrapper'>
                    <label
                      id="more-detail-hint"
                      className='govuk-label govuk-label--m'
                      htmlFor='more-detail'
                    >
                      Any more information you'd like to tell us? (optional)
                    </label>
                  </h2>
                  {furtherInfoError && (
                    <p className='govuk-error-message'>{furtherInfoError}</p>
                  )}
                  <TextArea
                    className='govuk-textarea govuk-!-width-one-half'
                    id='more-detail'
                    rows='5'
                    onChange={(val) => setAccountDeletionFurtherInfo(val)}
                    labelledByID="more-detail-hint"
                  />
                </div>

                <Button
                  text='Delete account'
                  className='govuk-button govuk-button--warning'
                  onClick={handleButton}
                />
                <Link to='/account' className='govuk-link inline-link' style={{ cursor: 'pointer' }}>
                  Cancel
                </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
