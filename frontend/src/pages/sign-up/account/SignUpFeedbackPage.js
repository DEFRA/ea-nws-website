import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../gov-uk-components/Button'
import ErrorSummary from '../../../gov-uk-components/ErrorSummary'
import Footer from '../../../gov-uk-components/Footer'
import Header from '../../../gov-uk-components/Header'
import Input from '../../../gov-uk-components/Input'
import PhaseBanner from '../../../gov-uk-components/PhaseBanner'
import Radio from '../../../gov-uk-components/Radio'
import TextArea from '../../../gov-uk-components/TextArea'
import { backendCall } from '../../../services/BackendService'

export default function FeedbackPage () {
  const navigate = useNavigate()
  const [feedbackPreference, setFeedbackPreference] = useState('')
  const [feedbackText, setFeedbackText] = useState('')
  const [optionalFeedbackText, setOptionalFeedbackText] = useState('')
  const [error, setError] = useState('')
  const [textError, setTextError] = useState('')
  const charLimit = 2000

  const feedbackOptions = [
    { value: 'Very Satisfied', label: 'Very Satisfied' },
    { value: 'Satisfied', label: 'Satisfied' },
    {
      value: 'Neither satisfied or dissatisfied',
      label: 'Neither satisfied or dissatisfied'
    },
    { value: 'Dissatisfied', label: 'Dissatisfied' },
    { value: 'Very Dissatisfied', label: 'Very Dissatisfied' }
  ]

  useEffect(() => {
    setError('')
  }, [feedbackPreference])

  useEffect(() => {
    setTextError('')
  }, [feedbackText])

  const handleSubmit = async () => {
    let valid = true

    if (!feedbackPreference) {
      setError('Select an answer to tell us how you feel about this service')
      valid = false
    }
    if (!feedbackText) {
      setTextError(
        'Tell us anything you like or do not like about this service'
      )
      valid = false
    }
    if (feedbackText.length > charLimit) {
      setTextError('Your answer must be 2000 characters or fewer')
      valid = false
    }

    if (!valid) {
      return
    }

    const dataToRecord = {
      feedbackPreference,
      feedbackText,
      optionalFeedbackText
    }
    const { errorMessage } = await backendCall(
      dataToRecord,
      'api/signup/feedback',
      navigate
    )
    if (errorMessage) {
      setError(errorMessage)
    } else {
      navigate('/signup/feedback/confirmation')
    }
  }

  return (
    <>
      <div className='page-container'>
        <Header />
        <div className='govuk-width-container body-container'>
          <PhaseBanner />
          {(error || textError) && (
            <ErrorSummary errorList={[error, textError]} />
          )}
          <h1 className='govuk-heading-l'>Give feedback about signing up</h1>
          <div className='govuk-body'>
            This helps us to improve this service
            <br />
            <p className='govuk-inset-text'>
              Only tell us about feedback on this page. If you need to check you
              have <br /> signed up correctly or have a question about your
              flood risk,{' '}
              <a href='/contact' className='govuk-link'>
                contact us.
              </a>
            </p>
            <br />
            <div
              className={
                error
                  ? 'govuk-form-group govuk-form-group--error'
                  : 'govuk-form-group'
              }
            >
              <fieldset className='govuk-fieldset'>
                <h2 className='govuk-heading-m'>
                  Overall, how do you feel about this service?
                </h2>
                {error && <p className='govuk-error-message'>{error}</p>}
                <div className='govuk-radios' data-module='govuk-radios'>
                  {feedbackOptions.map((option) => (
                    <Radio
                      key={option.value}
                      name='feedbackRadios'
                      label={option.label}
                      value={option.value}
                      onChange={() => setFeedbackPreference(option.value)}
                    />
                  ))}
                </div>
              </fieldset>
            </div>
            <br />
            <div
              className={
                textError
                  ? 'govuk-form-group govuk-form-group--error'
                  : 'govuk-form-group'
              }
            >
              <fieldset className='govuk-fieldset' />
              <h3 className='govuk-label-wrapper'>
                <label class='govuk-label govuk-label--m' for='more-detail'>
                  Is there anything you like or do not like about this service?
                </label>
              </h3>
              <div id='more-detail-hint' class='govuk-hint'>
                Do not include your personal or financial details
              </div>
              {textError && <p className='govuk-error-message'>{textError}</p>}
              <TextArea
                className='govuk-textarea'
                id='more-detail'
                rows='5'
                onChange={(val) => setFeedbackText(val)}
              />
            </div>
          </div>
          <h4 className='govuk-heading-m'>
            Take part in research sessions (optional)
          </h4>
          <p className='govuk-hint'>
            {' '}
            Enter email address to take part. We will not use this for any
            <br /> other reason and will delete it after 2 years.
          </p>
          <Input
            className='govuk-input govuk-input--width-30'
            inputType='text'
            onChange={(val) => setOptionalFeedbackText(val)}
          />
          <div>
            <Button
              text='Send feedback'
              className='govuk-button'
              onClick={handleSubmit}
            />
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
