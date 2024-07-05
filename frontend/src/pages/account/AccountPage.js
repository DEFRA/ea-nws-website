import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../../gov-uk-components/Button'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import NotificationBanner from '../../gov-uk-components/NotificationBanner'
import PhaseBanner from '../../gov-uk-components/PhaseBanner'


export default function AccountPage () {

  const location = useLocation()

  const navigate = useNavigate()
  const handleButton = () => {
    navigate('/account/delete')
  }

  const getAdditionals = (profile, id) => {
    for (let i = 0; i < profile.additionals.length; i++) {
      if (profile.additionals[i].id === id) {
        return profile.additionals[i].value
      }
    }
    return ''
  }

  const profile = useSelector((state) => state.session.profile)
  const name = profile.firstName+' '+profile.lastName || ''
  const email = profile.emails[0] || ''
  const businessName = getAdditionals(profile, 'businessName')
  const jobTitle = getAdditionals(profile, 'jobTitle')

  const bannerText = (location.state?.changeBusinessDetails) ? 
  [
    'Business name: '+((location.state?.businessName) ? location.state?.businessName : ''), 
    'Job title: '+((location.state?.jobTitle) ? location.state?.jobTitle : '')
  ]
  : (location.state?.changeEmail) && location.state?.email+' is your new email address to sign in with'

  const bannerHeading = (location.state?.changeBusinessDetails) ? 'Business details updated' : (location.state?.changeEmail) && 'Email address updated'


  return (
    <>
      <Header />
      <div className='govuk-width-container'>
        <PhaseBanner />
        {location.state !== null
          ? (
            <NotificationBanner
              className='govuk-notification-banner govuk-notification-banner--success govuk-!-margin-bottom-0'
              title='Success'
              heading={bannerHeading}
              text={bannerText}
            />
            )
          : null}
        <main className='govuk-main-wrapper'>
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <h1 className='govuk-heading-l'>Manage your account</h1>
              <div className="govuk-body">
              <h2 class="govuk-heading-m">Your account details</h2>
                <table className="govuk-table">
                  <tbody className="govuk-table__body">
                    <tr className="govuk-table__row">
                      <th scope="row" className="govuk-table__header" style={{width: '12.75em'}}>Name</th>
                      <td className="govuk-table__cell">{name}</td>
                      <td className='govuk-table__cell govuk-!-text-align-right'>
                        <Link
                          to='/'
                          className='govuk-link'
                        >
                          Change
                        </Link>
                      </td>
                    </tr>
                    <tr className="govuk-table__row">
                      <th scope="row" className="govuk-table__header">Sign in email</th>
                      <td className="govuk-table__cell">{email}</td>
                      <td className='govuk-table__cell govuk-!-text-align-right'>
                        <Link
                          to='/account/change-email'
                          className='govuk-link'
                        >
                          Change
                        </Link>
                      </td>
                    </tr>
                    <tr className="govuk-table__row">
                      <th scope="row" className="govuk-table__header">Business name (optional)</th>
                      <td className="govuk-table__cell">{businessName}</td>
                      <td className='govuk-table__cell govuk-!-text-align-right'>
                        <Link
                          to='/account/change-business-details'
                          className='govuk-link'
                        >
                          {(businessName === '') ? 'Add' : 'Change'}
                        </Link>
                      </td>
                    </tr>
                    <tr className="govuk-table__row">
                      <th scope="row" className="govuk-table__header">Job title (optional)</th>
                      <td className="govuk-table__cell">{jobTitle}</td>
                      <td className='govuk-table__cell govuk-!-text-align-right'>
                        <Link
                          to='/account/change-business-details'
                          className='govuk-link'
                        >
                        {(jobTitle === '') ? 'Add' : 'Change'}
                        </Link>
                      </td>
                    </tr>     
                  </tbody>
                </table>
                <h2 class="govuk-heading-m govuk-!-margin-bottom-6">Delete your account</h2>
                <p className='govuk-body govuk-!-margin-bottom-6'>If you no longer want to receive any flood messages, you can delete your account.</p>
                <Button
                  text='Delete your account'
                  className='govuk-button govuk-button--warning'
                  onClick={handleButton}
                />                
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}
