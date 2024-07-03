import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../gov-uk-components/Button'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import PhaseBanner from '../../gov-uk-components/PhaseBanner'



export default function AccountPage () {

  const navigate = useNavigate()
  const handleButton = () => {
    navigate('/account/delete')
  }

  const profile = useSelector((state) => state.session.profile)
  const name = profile.firstName+' '+profile.lastName || '-'
  const email = profile.emails[0] || '-'
  const businessName = profile.additionals[0]?.businessName || '-'
  const jobTitle = profile.additionals[0]?.jobTitle || '-'

  return (
    <>
      <Header />
      <div className='govuk-width-container'>
        <PhaseBanner />
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
                          to='/'
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
                          to='/'
                          className='govuk-link'
                        >
                          Change
                        </Link>
                      </td>
                    </tr>
                    <tr className="govuk-table__row">
                      <th scope="row" className="govuk-table__header">Job title (optional)</th>
                      <td className="govuk-table__cell">{jobTitle}</td>
                      <td className='govuk-table__cell govuk-!-text-align-right'>
                        <Link
                          to='/'
                          className='govuk-link'
                        >
                          Change
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
