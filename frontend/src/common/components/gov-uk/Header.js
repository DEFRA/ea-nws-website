import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import OrganisationHeader from '../custom/OrganisationHeader'

export default function Header() {
  const location = useLocation()
  const authToken = useSelector((state) => state.session.authToken)
  const signinType = useSelector((state) => state.session.signinType) // Assuming signinType is a different state property

  const isOrganisationPage = location.pathname.includes('organisation')

  return (
    <>
      {isOrganisationPage ? (
        <OrganisationHeader />
      ) : (
        <header className='govuk-header' data-module='govuk-header'>
          <div className='govuk-width-container govuk-header__container'>
            <div className='govuk-header__logo'>
              <a
                href='/#'
                className='govuk-header__link govuk-header__link--homepage'
              >
                <svg
                  focusable='false'
                  role='img'
                  className='govuk-header__logotype'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 148 30'
                  height='30'
                  width='148'
                  aria-label='GOV.UK'
                >
                  <title>GOV.UK</title>
                  <path d='...'> {/* SVG path data */} </path>
                </svg>
              </a>
            </div>
            <div
              className='govuk-header__content govuk-grid-row'
              style={{ display: 'inline-block' }}
            >
              <p className='govuk-header__service-name'>
                {isOrganisationPage
                  ? 'Get flood warnings for your organisation'
                  : 'Get flood warnings by text, phone or email'}
              </p>
              {authToken ? (
                <Link
                  className='govuk-header__link custom-header-link'
                  to={
                    signinType === 'org' ? '/organisation/signout' : '/signout'
                  }
                >
                  Sign Out
                </Link>
              ) : (
                <Link
                  className='govuk-header__link custom-header-link'
                  to='/contact'
                >
                  Contact us
                </Link>
              )}
            </div>
          </div>
        </header>
      )}
    </>
  )
}
