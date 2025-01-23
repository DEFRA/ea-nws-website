import { useState } from 'react'
import {
  faCircleExclamation,
  faCircleChevronDown,
  faCircleChevronUp
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../css/custom.css'

export default function PrivateBetaHeader () {
  const [infoOpen, setInfoOpen] = useState(false)

  const toggleInfo = () => {
    setInfoOpen(!infoOpen)
  }

  return (
    <>
      <header className='private-beta-header govuk-header--full-width-border'>
        <div className='private-beta-header-container govuk-width-container'>
          <FontAwesomeIcon
            icon={faCircleExclamation}
            style={{ height: '35px', width: '35px' }}
          />
          This is a test service only - do not rely on this for flood warnings
          <div className='private-beta-header-container-toggle'>
            <FontAwesomeIcon
              icon={infoOpen ? faCircleChevronUp : faCircleChevronDown}
              onClick={() => toggleInfo()}
              style={{ height: '20px', width: '20px' }}
            />
            {!infoOpen && ('Show')}
            {infoOpen && ('Hide')}
          </div>
        </div>
        {infoOpen && (
          <div className='private-beta-header-info-container govuk-width-container'>
            <p>Thank you for taking part in our trial for our new new flood warning service.</p>
            <p>This site contains test content only.</p>
            <p className='govuk-!-font-weight-bold'>
              You must not rely on this for flood warnings.
            </p>
            <p>If you need live flood warnings,
              &nbsp;
              <a
                href='https://www.gov.uk/sign-up-for-flood-warnings'
                className='govuk-link govuk-link--inverse'
                target='_blank' rel='noreferrer'
              >
                sign up here
              </a>
              .
            </p>
            <p>
              If you need to contact us about this test service or our trial phase, email us at<br />
              <a
                href='mailto:testfloodwarnings@environment-agency.gov.uk'
                className='govuk-link govuk-link--inverse'
                target='_blank' rel='noreferrer'
              >
                testfloodwarnings@environment-agency.gov.uk
              </a>
            </p>
          </div>
        )}
      </header>
    </>
  )
}
