import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../../gov-uk-components/Button'
import ErrorSummary from '../../../gov-uk-components/ErrorSummary'
import Footer from '../../../gov-uk-components/Footer'
import Header from '../../../gov-uk-components/Header'
import PhaseBanner from '../../../gov-uk-components/PhaseBanner'

export default function Declaration() {
  const [isChecked, setIsChecked] = useState()
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async () => {
    setIsChecked(isChecked)
    if (isChecked === true) {
      //this will change to whatever the next page is
      navigate('/')
    } else {
      setError('Tick to confirm you agree with the terms and conditions')
    }
  }

  return (
    <>
      <Header />
      <div className="govuk-width-container">
        <PhaseBanner />
        <Link to="/" className="govuk-back-link">
          Back
        </Link>
        {error && <ErrorSummary errorList={[error]} />}
        <h1 class="govuk-heading-l">Check the terms and conditions</h1>
        <h3 class="govuk-heading-s">What we will do</h3>
        <p class="govuk-body">
          We make all reasonable efforts to send the flood warnings you have
          asked for. but we cannot guarantee they will be sent or arrive.
          Warnings may be sent at any time of day or night.
        </p>

        <h3 class="govuk-heading-s">We do not:</h3>
        <ul class="govuk-list govuk-list--bullet">
          <li>accept responsibility if you fail to receive a warning</li>
          <li>guarantee that our online or phone services will be availible</li>
          <li>
            accept responsibility for any loss, damage or costs incurred by you
            caused by flooding, or by issuing or failing to issue warnings,
            except where the law says we must
          </li>
        </ul>

        <h3 class="govuk-heading-s">You are responsible for:</h3>
        <ul class="govuk-list govuk-list--bullet">
          <li>providing us with accurate contact details</li>
          <li>telling us about any changes to your contact information</li>
        </ul>

        <h3 class="govuk-heading-s">
          How will we use your personal information
        </h3>
        <p class="govuk-body">
          We may use the personal information you provide to:
        </p>
        <ul class="govuk-list govuk-list--bullet">
          <li>send you warnings you've asked for</li>
          <li>
            send you a small number of services or administrative messages
          </li>
          <li>
            help emergancy services and local councils respond to flooding
          </li>
          <li>
            help with out work on flood warning and local flood risk management
          </li>
        </ul>

        <p class="govuk-body">
          We may give your information to our agents or representatives so they
          can do any of these things for us. And we may share you information
          with other organisations if the laws say we must.
        </p>

        <p class="govuk-body">
          The Environment Agency manages the flood warning systems. Our
          <a href="#" class="govuk-link">
            {' '}
            privacy notice (open new window)
          </a>
          explains how we treat your personal information.
        </p>

        <p class="govuk-body">
          Natural Resources Wales use the same systems and will have access to
          your personal information if you ask for a service in Wales. Read how
          Natural Resources Wales
          <a href="#" class="govuk-link">
            {' '}
            Treat your personal information (opens new window)
          </a>
        </p>
        {error}
        <div class="govuk-form-group">
          <fieldset class="govuk-fieldset" aria-describedby="waste-hint">
            <div class="govuk-checkboxes" data-module="govuk-checkboxes">
              <div class="govuk-checkboxes__item">
                <input
                  class="govuk-checkboxes__input"
                  type="checkbox"
                  checked={isChecked}
                  error={error}
                />
                <label class="govuk-label govuk-checkboxes__label" for="waste">
                  I agree to the terms and conditions
                </label>
              </div>
            </div>
          </fieldset>
        </div>
        <Button
          className={'govuk-button'}
          text={'Continue'}
          onClick={handleSubmit}
        />
      </div>
      <Footer />
    </>
  )
}
