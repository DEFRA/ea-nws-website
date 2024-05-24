import * as React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import PhaseBanner from '../../gov-uk-components/PhaseBanner'

export default function StartPage () {
  return (
    <>
      <Header />
      <div className='govuk-width-container'>
        <PhaseBanner />
        <main className='govuk-main-wrapper'>
          <div className='govuk-grid-row'>
            <div className='govuk-grid-column-two-thirds'>
              <h1 className='govuk-heading-l'>
                Get flood warnings by text, phone or email
              </h1>
              <p className='govuk-body'>
                You can get flood warnings if your home or business in England
                is at risk of flooding.{' '}
              </p>
              <p className='govuk-body'>
                This service sends warnings about flooding from rivers, the sea
                or groundwater, depending on your area.
              </p>
              <p className='govuk-body'>
                You cannot get flood warnings for surface water flooding
                (sometimes known as 'flash flooding').
              </p>
              <h2 className='govuk-heading-m'>Sign up for the first time</h2>
              <p className='govuk-body'>
                <Link to='/signin' className='govuk-link'>
                  Sign in
                </Link>{' '}
                to your account to:
              </p>
              <ul className='govuk-list govuk-list--bullet'>
                <li>update your details</li>
                <li>remove warnings</li>
                <li>delete your account</li>
              </ul>
              <h2 className='govuk-heading-m'>
                If you live in Scotland, Wales, or Northern Ireland
              </h2>
              <p className='govuk-body'>
                Sign up for flood warnings in Scotland or flood warnings in
                Wales.
              </p>
              <p className='govuk-body'>
                Use flood maps to check flooding risk in Northern Ireland.
              </p>
              <h2 className='govuk-heading-m'>Other ways to register</h2>
              <p className='govuk-body'>
                If you're in England, Scotland or Wales you can register, update
                your details or cancel your account by calling Floodline.
              </p>
              <h3 className='govuk-heading-s'>Floodline</h3>
              <ul className='govuk-list'>
                <li>
                  <p className='govuk-body'>Telephone: 0345 968 118</p>
                </li>
                <li>
                  <p className='govuk-body'>Telephone: 0345 602 6340</p>
                </li>
                <li>
                  <p className='govuk-body'>24 hour service</p>
                </li>
              </ul>
              <p className='govuk-body'>
                <a href='#' className='govuk-link'>
                  Find out about call charges
                </a>
              </p>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}
