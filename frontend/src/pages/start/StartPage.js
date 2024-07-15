import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../gov-uk-components/Button'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import PhaseBanner from '../../gov-uk-components/PhaseBanner'

export default function StartPage () {
  const navigate = useNavigate()

  return (
    <>
      <div className='page-container'>
        <Header />
        <div className='govuk-width-container body-container'>
          <PhaseBanner />
          <main className='govuk-main-wrapper'>
            <div className='govuk-grid-row'>
              <div className='govuk-grid-column-two-thirds'>
                <h1 className='govuk-heading-l'>
                  Get flood warnings by text, phone or email
                </h1>
              </div>
            </div>
            <div className='govuk-grid-row'>
              <div className='govuk-grid-column-two-thirds'>
                <div className='govuk-body'>
                  <p>
                    You can get flood warnings if your home or business in
                    England is at risk of flooding.{' '}
                  </p>
                  <p>
                    These are sent by the Environment Agency, the offical source
                    of flood information in England. They help you:
                  </p>
                  <ul class='govuk-list govuk-list--bullet'>
                    <li>prepare for possible flooding</li>
                    <li>
                      take action if needed, for exaple protecting or evacuating
                      your home
                    </li>
                  </ul>
                  <p>
                    This service sends messages about flooding from rivers, the
                    sea or groundwater, depending on your area.
                  </p>
                  <p>
                    You cannot get flood warnings for surface water flooding
                    (sometimes known as 'flash flooding').
                  </p>
                  <br />{' '}
                  <h2 className='govuk-heading-m'>
                    Sign up for the first time
                  </h2>
                  <p>You'll need:</p>
                  <ul class='govuk-list govuk-list--bullet'>
                    <li>an email address to sign up with</li>
                    <li>
                      a way to contact you at any time of the day or night - you
                      can choose to get a call, text or email
                    </li>
                  </ul>
                  <Button
                    text='Sign up for the first time'
                    className='govuk-button'
                    onClick={() => navigate('/signup')}
                  />
                  <br />
                  <h2 className='govuk-heading-m'>
                    If you've already signed up
                  </h2>
                  <p className='govuk-body'>
                    <Link to='/signin' className='govuk-link'>
                      Sign in
                    </Link>{' '}
                    to your account to:
                  </p>
                  <ul class='govuk-list govuk-list--bullet'>
                    <li>update your details</li>
                    <li>remove warnings</li>
                    <li>delete your account</li>
                  </ul>
                  <h2 className='govuk-heading-m'>
                    If you live in Scotland, Wales, or Northern Ireland
                  </h2>
                  <p>
                    Sign up for{' '}
                    <a
                      href='https://floodline.sepa.org.uk/floodingsignup/'
                      className='govuk-link'
                    >
                      flood warnings in Scotland
                    </a>{' '}
                    or{' '}
                    <a
                      href='https://naturalresources.wales/splash?orig=%2fflooding%2fsign-up-to-receive-flood-warnings%2f&lang=cy'
                      className='govuk-link'
                    >
                      flood warnings in Wales.
                    </a>
                  </p>
                  <p>
                    Use flood maps to{' '}
                    <a
                      href='https://www.nidirect.gov.uk/articles/check-risk-flooding-your-area'
                      className='govuk-link'
                    >
                      check flooding risk in Northern Ireland
                    </a>
                    .
                  </p>
                  <h2 className='govuk-heading-m'>Other ways to register</h2>
                  <p>
                    If you're in England, Scotland or Wales you can register,
                    update your details or cancel your account by calling
                    Floodline.
                  </p>
                  <h3 class='govuk-heading-s'>Floodline</h3>
                  <ul class='govuk-list'>
                    <li>Telephone: 0345 988 1188</li>
                    <li>Textphone: 0345 602 6340</li>
                    <li>24 hour service</li>
                  </ul>
                  <p class='govuk-body'>
                    <a
                      href='https://www.gov.uk/call-charges'
                      class='govuk-link'
                    >
                      Find out about call charges
                    </a>
                  </p>
                </div>
              </div>
              <div class='govuk-grid-column-one-third'>
                <h3 class='govuk-heading-s'>related content</h3>
                <ul class='govuk-list'>
                  <li>
                    <a
                      className='govuk-link'
                      href='https://www.gov.uk/prepare-for-flooding'
                    >
                      Prepare for flooding
                    </a>
                  </li>
                  <li>
                    <a
                      className='govuk-link'
                      href='https://www.gov.uk/help-during-flood'
                    >
                      What to do before or during a flood
                    </a>
                  </li>
                  <li>
                    <a
                      className='govuk-link'
                      href='https://www.gov.uk/after-flood'
                    >
                      What to do after a flood
                    </a>
                  </li>
                  <li>
                    <a
                      className='govuk-link'
                      href='https://www.gov.uk/check-flooding'
                    >
                      Check for flooding
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </>
  )
}
