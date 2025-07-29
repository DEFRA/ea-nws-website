import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../components/custom/BackLink'
import Button from '../../components/gov-uk/Button'
import NotificationBanner from '../../components/gov-uk/NotificationBanner'
import { backendCall } from '../../services/BackendService'
import PrivateBetaCookiesPage from '../private-beta/PrivateBetaCookiesPage'

export default function CookiesPage () {
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie] = useCookies(['CookieControl'])
  const navigate = useNavigate()
  const [servicePhase, setServicePhase] = useState(false)
  const [acceptCookies, setAcceptCookies] = useState(cookies.CookieControl?.analytics)
  const [bannerText, setBannerText] = useState(null)

  async function getServicePhase () {
    const { data } = await backendCall(
      'data',
      'api/service/get_service_phase'
    )
    setServicePhase(data)
  }

  useEffect(() => {
    getServicePhase()
  }, [])

  const saveCookies = (event) => {
    event.preventDefault()
    setCookie('CookieControl', {analytics: acceptCookies, preferencesSet: true, popup: false}, {maxAge: 60*60*24*365})
    setBannerText(`You've ${acceptCookies ? 'accepted' : 'rejected'} analytics cookies.`)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      <Helmet>
        <title>Cookies - Get flood warnings - GOV.UK</title>
      </Helmet>
      {servicePhase === 'beta'
        ? (
          <>
            <PrivateBetaCookiesPage />
          </>
          )
        : (
          <>
            <BackLink onClick={() => navigate(-1)} />
            <main className='govuk-main-wrapper govuk-!-padding-top-0'>
              <div className='govuk-grid-row'>
                {bannerText &&
                  <div className='govuk-!-padding-left-3 govuk-!-padding-right-3'>
                    <NotificationBanner
                      className='govuk-notification-banner govuk-notification-banner--success'
                      title='Success'
                      text={bannerText}
                    />
                  </div>
                }
                <div className='govuk-grid-column-two-thirds'>
                  <div className='govuk-body'>
                    <h1 className='govuk-heading-l'>Cookies</h1>
                    <p>Cookies are small files saved on your phone, tablet or computer when you visit a website.</p>
                    <p>We use cookies to make the ‘Get flood warnings’ service work and to collect information about how you use this service.</p>
                    <h2 className='govuk-heading-m govuk-!-margin-top-6 govuk-!-margin-bottom-6'>Essential cookies and storing information on your browser</h2>
                    <p>Essential cookies keep your information secure while you use this service. We do not need to ask permission to use them.</p>
                    <p>We use the following:</p>
                    <table className='govuk-table govuk-!-margin-top-6' aria-label='Essential cookies table'>
                      <thead className='govuk-table__head'>
                        <tr className='govuk-table__row'>
                          <th scope='col' className='govuk-table__header'>Name</th>
                          <th scope='col' className='govuk-table__header'>Purpose</th>
                          <th scope='col' className='govuk-table__header'>Expires</th>
                        </tr>
                      </thead>
                      <tbody className='govuk-table__body'>
                        <tr className='govuk-table__row'>
                          <td className='govuk-table__cell govuk-!-width-one-third'>authToken</td>
                          <td className='govuk-table__cell govuk-!-width-one-third'>Remembers your identity when using this service.</td>
                          <td className='govuk-table__cell govuk-!-width-one-third'>When you close your browser</td>
                        </tr>
                        <tr className='govuk-table__row'>
                          <td className='govuk-table__cell govuk-!-width-one-third'>CookieControl</td>
                          <td className='govuk-table__cell govuk-!-width-one-third'>Remembers your cookie preferences for this service.</td>
                          <td className='govuk-table__cell govuk-!-width-one-third'>1 year</td>
                        </tr>
                      </tbody>
                    </table>
                    <p className='govuk-!-font-weight-bold govuk-!-margin-bottom-0'>Storage on your browser</p>
                    <p>When you enter data into our service, we may store some data locally on your browser. (known as ‘local storage’)</p>
                    <p>We do this to make sure the service works properly and carries your answers and data forward from one screen to another.</p>
                    <p>For example, the email address you use to sign in to the test service, or any locations you enter, will be stored locally on your browser. This data is stored until you sign out or are automatically signed out.</p>
                    <p>You could also clear your history and cache if you wanted to remove this information from your browser. </p>
                    <h2 className='govuk-heading-m govuk-!-margin-top-6 govuk-!-margin-bottom-6'>Analytics cookies (optional)</h2>
                    <p>With your permission, we use Google Analytics to collect data about how you use this test service. This data helps us improve our service.</p>
                    <p>Google is not allowed to use or share our analytics data with anyone. It stores anonymised information about:</p>
                    <ul className='govuk-list govuk-list--bullet govuk-!-margin-left-2'>
                      <li>how you got to this service</li>
                      <li>the pages you visit on the service and how long you stay on them</li>
                      <li>what you click on while you're using the service</li>
                      <li>any errors you see while using the service</li>
                    </ul>
                    <p>Google Analytics sets the following cookies:</p>
                    <table className='govuk-table govuk-!-margin-top-6' aria-label='Analytics cookies table'>
                      <thead className='govuk-table__head'>
                        <tr className='govuk-table__row'>
                          <th scope='col' className='govuk-table__header'>Name</th>
                          <th scope='col' className='govuk-table__header'>Purpose</th>
                          <th scope='col' className='govuk-table__header'>Expires</th>
                        </tr>
                      </thead>
                      <tbody className='govuk-table__body'>
                        <tr className='govuk-table__row'>
                          <td className='govuk-table__cell govuk-!-width-one-third'>_ga</td>
                          <td className='govuk-table__cell govuk-!-width-one-third'>Checks if you’ve visited this service before. This helps us count how many people visit our site.</td>
                          <td className='govuk-table__cell govuk-!-width-one-third'>1 year</td>
                        </tr>
                        <tr className='govuk-table__row'>
                          <td className='govuk-table__cell govuk-!-width-one-third'>{'_ga_<container-id>'}</td>
                          <td className='govuk-table__cell govuk-!-width-one-third'>Used by Google Analytics to find and track an individual session with your device.</td>
                          <td className='govuk-table__cell govuk-!-width-one-third'>1 year</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className='govuk-form-group govuk-!-margin-top-8'>
                      <fieldset className='govuk-fieldset' aria-label='Select to accept or reject analytics cookies'>
                        <legend className='govuk-fieldset__legend govuk-fieldset__legend--s'>
                          <h3 className='govuk-fieldset__heading'>
                            Do you want to accept analytics cookies?
                          </h3>
                        </legend>
                        <div className='govuk-radios govuk-radios--inline' data-module='govuk-radios'>
                          <div className='govuk-radios__item'>
                            <input className='govuk-radios__input' id='acceptCookies' name='acceptCookies' type='radio' value='yes' onChange={(e) => setAcceptCookies(true)} checked={acceptCookies}/>
                            <label className='govuk-label govuk-radios__label' for='acceptCookies'>
                              Yes
                            </label>
                          </div>
                          <div className='govuk-radios__item'>
                            <input className='govuk-radios__input' id='acceptCookies-2' name='acceptCookies' type='radio' value='no' onChange={(e) => setAcceptCookies(false)} checked={!acceptCookies}/>
                            <label className='govuk-label govuk-radios__label' for='acceptCookies-2'>
                              No
                            </label>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                    <Button
                      text='Save cookie settings'
                      className='govuk-button'
                      onClick={saveCookies}
                    />
                  </div>
                </div>
              </div>
            </main>
          </>
          )}
    </>
  )
}
