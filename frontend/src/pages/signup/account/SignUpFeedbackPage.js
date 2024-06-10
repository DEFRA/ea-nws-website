import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../../../gov-uk-components/Button'
import ErrorSummary from '../../../gov-uk-components/ErrorSummary'
import Footer from '../../../gov-uk-components/Footer'
import Header from '../../../gov-uk-components/Header'
import Input from '../../../gov-uk-components/Input'
import InsetText from '../../../gov-uk-components/InsetText'
import PhaseBanner from '../../../gov-uk-components/PhaseBanner'
import { backendCall } from '../../../services/BackendService'
import { emailValidation } from '../../../services/validations/EmailValidation'
import Checkbox from '../../../gov-uk-components/CheckBox'
import { useDispatch } from 'react-redux'

export default function FeedbackPage () {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [feedbackPreference, setFeedbackPreference] = useState('')
  const [feedbackText, setFeedbackText] = useState('')
  const [optionalFeedbackText, setOptionalFeedbackText] = useState('')
  const [error, setError] = useState('')
  const [textError, setTextError] = useState('')
  
  const feedbackOptions = [
    {value: 'Very Satisfied', label: 'Very Satisfied'},
    {value: 'Satisfied', label: 'Satisfied'},
    {value: 'Neither satisfied or dissatisfied', label: 'Neither satisfied or dissatisfied'},
    {value: 'Dissatisfied', label: 'Dissatisfied'},
    {value: 'Very Dissatisfied', label: 'Very Dissatisfied'}
  ]

  const handleSubmit = async () => {
    if (feedbackPreference.length === 0){
      setError('Select an answer to tell us how you feel about this service')
    }
    else{
      setError(null)
      setFeedbackPreference(feedbackPreference)
    }
    if (feedbackText === ''){
      setTextError('Tell us anything you like or do not like about this service')
    }else{
      setTextError(null)
      setFeedbackText(feedbackText)
    }

    if(feedbackText !== '' && feedbackPreference.length !== 0){
      const dataToRecord = {feedbackPreference, feedbackText, optionalFeedbackText}
      console.log("optional feedbacl text", optionalFeedbackText)
      console.log("feedback data to record", dataToRecord)
    
      await backendCall(dataToRecord, 'signup/feedback', navigate)

      navigate('/signup')
    }
  }

  const setFeedback = (event) => {
    const { value } = event.target
    setFeedbackPreference((prev) => {
      if (prev.includes(value)) {
        return prev.filter((preference) => preference !== value)
      } else {
        return [...prev, value]
      }
    })
  }

  return (
    <>
      <Header />
      <div className='govuk-width-container'>
        <PhaseBanner />
        <Link to='/signup' className='govuk-back-link'>
          Back
        </Link>
        { (error && textError) && <ErrorSummary errorList={[error, textError]}  />}
        { ( textError && !error) && <ErrorSummary errorList={[textError]}  />}
        { ( !textError && error) && <ErrorSummary errorList={[error]}  />}
        <h1 className='govuk-heading-l'>Give feedback about signing up</h1>
        <div className='govuk-body'>
          This helps is to improve this service
          <br />
          <InsetText text='Only tell us about feedback on this page. If you need to check your signed up correctly or have a question about 
          your flood risk. Contact us' />
          <br />
          <div className={
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
                    <Checkbox
                      key={option.value}
                      label={option.label}
                      value={option.value}
                      checked={feedbackPreference.includes(option.value)}
                      onChange={setFeedback}
                    />
                  ))}
                </div>
              </fieldset>
            </div>
          <br />
          <div className={
                textError
                  ? 'govuk-form-group govuk-form-group--error'
                  : 'govuk-form-group'
              }
            >
              <fieldset className='govuk-fieldset'></fieldset>
          <h3 className='govuk-heading-m'>
            Is there anything you like or do not like about this service?
          </h3>
          <p className='govuk-hint'> Do not include your personal or financial details</p>
          {textError && <p className='govuk-error-message'>{textError}</p>}
          <Input
            className='govuk-input govuk-input--width-30'
            inputType='text'
            onChange={(val) => setFeedbackText(val)}
          />
        </div>
        </div>
        <h4 className='govuk-heading-m'>
            Take part in research sessions (optional)
          </h4>
          <p className='govuk-hint'> Enter email address to take part. We will not use this for any other reason and will 
          delete it after 2 years.</p>
          <Input
            className='govuk-input govuk-input--width-30 govuk-input--height-100'
            inputType='text'
            onChange={(val) => setOptionalFeedbackText(val)}
          />
          <div>
          <Button
              text='Continue'
              className='govuk-button'
              onClick={handleSubmit}
            />
          </div>
      </div>
      <Footer />
    </>
  )
}
