import {
  faAngleDown,
  faAngleUp,
  faCircleUser,
  faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function OrganisationHeader () {
  const [activeHeader, setActiveHeader] = useState(null)

  return (
    <>
      <header className='cross-service-header'>
        <div className='one-login-header toggle-enabled'>
          <div className='one-login-header__container custom-width-container'>
            <div className='one-login-header__logo'>
              <a
                href='/#'
                className='one-login-header__link one-login-header__link--homepage'
              >
                <span className='one-login-header__logotype'>
                  <svg
                    aria-hidden='true'
                    focusable='false'
                    className='one-login-header__logotype-crown'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 32 30'
                    height='30'
                    width='32'
                  >
                    <path
                      fill='currentColor'
                      fill-rule='evenodd'
                      d='M22.6 10.4c-1 .4-2-.1-2.4-1-.4-.9.1-2 1-2.4.9-.4 2 .1 2.4 1s-.1 2-1 2.4m-5.9 6.7c-.9.4-2-.1-2.4-1-.4-.9.1-2 1-2.4.9-.4 2 .1 2.4 1s-.1 2-1 2.4m10.8-3.7c-1 .4-2-.1-2.4-1-.4-.9.1-2 1-2.4.9-.4 2 .1 2.4 1s0 2-1 2.4m3.3 4.8c-1 .4-2-.1-2.4-1-.4-.9.1-2 1-2.4.9-.4 2 .1 2.4 1s-.1 2-1 2.4M17 4.7l2.3 1.2V2.5l-2.3.7-.2-.2.9-3h-3.4l.9 3-.2.2c-.1.1-2.3-.7-2.3-.7v3.4L15 4.7c.1.1.1.2.2.2l-1.3 4c-.1.2-.1.4-.1.6 0 1.1.8 2 1.9 2.2h.7c1-.2 1.9-1.1 1.9-2.1 0-.2 0-.4-.1-.6l-1.3-4c-.1-.2 0-.2.1-.3m-7.6 5.7c.9.4 2-.1 2.4-1 .4-.9-.1-2-1-2.4-.9-.4-2 .1-2.4 1s0 2 1 2.4m-5 3c.9.4 2-.1 2.4-1 .4-.9-.1-2-1-2.4-.9-.4-2 .1-2.4 1s.1 2 1 2.4m-3.2 4.8c.9.4 2-.1 2.4-1 .4-.9-.1-2-1-2.4-.9-.4-2 .1-2.4 1s0 2 1 2.4m14.8 11c4.4 0 8.6.3 12.3.8 1.1-4.5 2.4-7 3.7-8.8l-2.5-.9c.2 1.3.3 1.9 0 2.7-.4-.4-.8-1.1-1.1-2.3l-1.2 4c.7-.5 1.3-.8 2-.9-1.1 2.5-2.6 3.1-3.5 3-1.1-.2-1.7-1.2-1.5-2.1.3-1.2 1.5-1.5 2.1-.1 1.1-2.3-.8-3-2-2.3 1.9-1.9 2.1-3.5.6-5.6-2.1 1.6-2.1 3.2-1.2 5.5-1.2-1.4-3.2-.6-2.5 1.6.9-1.4 2.1-.5 1.9.8-.2 1.1-1.7 2.1-3.5 1.9-2.7-.2-2.9-2.1-2.9-3.6.7-.1 1.9.5 2.9 1.9l.4-4.3c-1.1 1.1-2.1 1.4-3.2 1.4.4-1.2 2.1-3 2.1-3h-5.4s1.7 1.9 2.1 3c-1.1 0-2.1-.2-3.2-1.4l.4 4.3c1-1.4 2.2-2 2.9-1.9-.1 1.5-.2 3.4-2.9 3.6-1.9.2-3.4-.8-3.5-1.9-.2-1.3 1-2.2 1.9-.8.7-2.3-1.2-3-2.5-1.6.9-2.2.9-3.9-1.2-5.5-1.5 2-1.3 3.7.6 5.6-1.2-.7-3.1 0-2 2.3.6-1.4 1.8-1.1 2.1.1.2.9-.3 1.9-1.5 2.1-.9.2-2.4-.5-3.5-3 .6 0 1.2.3 2 .9l-1.2-4c-.3 1.1-.7 1.9-1.1 2.3-.3-.8-.2-1.4 0-2.7l-2.9.9C1.3 23 2.6 25.5 3.7 30c3.7-.5 7.9-.8 12.3-.8'
                    />
                  </svg>
                  <span>GOV.UK</span>
                </span>
              </a>
            </div>

            <p className='govuk-header__org-service-name'>
              Get flood warnings for your organisation
            </p>

            <nav className='one-login-header__nav'>
              <ul className='one-login-header__nav__list'>
                <li
                  className={`one-login-header__nav__list-item ${
                    activeHeader === 'orgDetails' && 'active'
                  }`}
                  onClick={() => setActiveHeader('orgDetails')}
                >
                  <FontAwesomeIcon
                    icon={
                      activeHeader === 'orgDetails' ? faAngleDown : faAngleUp
                    }
                    size='lg'
                    className={`${
                      activeHeader === 'orgDetails' && 'active'
                    } highlighted`}
                  />
                  <FontAwesomeIcon
                    icon={faCircleUser}
                    size='xl'
                    className={`${
                      activeHeader === 'orgDetails' && 'active'
                    } highlighted`}
                  />
                  <span>Flood Inc.</span>
                </li>
                <li
                  className={`one-login-header__nav__list-item ${
                    activeHeader === 'accountDetails' && 'active'
                  }`}
                  onClick={() => setActiveHeader('accountDetails')}
                >
                  <FontAwesomeIcon
                    icon={
                      activeHeader === 'accountDetails'
                        ? faAngleDown
                        : faAngleUp
                    }
                    size='lg'
                    className={`${
                      activeHeader === 'accountDetails' && 'active'
                    } highlighted`}
                  />
                  <FontAwesomeIcon
                    icon={faCircleUser}
                    size='xl'
                    className={`${
                      activeHeader === 'accountDetails' && 'active'
                    } highlighted`}
                  />
                  <span>F.Waters</span>
                </li>

                <li className='one-login-header__nav__list-item org-header-divider-line-container'>
                  <div className='org-header-divider-line' />
                </li>
                <li
                  className='one-login-header__nav__list-item'
                  style={{
                    backgroundColor: '#1d70b8'
                  }}
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} size='lg' />
                </li>
                <li className='one-login-header__nav__list-item'>
                  <a className='one-login-header__nav__link' href='#'>
                    Sign out
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Toggled menu */}
        {activeHeader === 'orgDetails' && (
          <div className='service-header toggle-enabled govuk-!-padding-top-5 govuk-!-padding-bottom-5'>
            <div>
              <div className='service-header__container'>
                <h2 className='service-header__heading'>
                  Organisation
                  <br />
                  details
                </h2>
                <div>
                  <nav>
                    <ul
                      className='service-header__nav-list service-header__nav'
                      id='service-header__nav'
                      data-open-className='service-header__nav--open'
                    >
                      <li className='service-header__nav-list-item '>
                        <Link
                          className='service-header__nav-list-item-link'
                          to='/organisation/manage-organisation-details'
                        >
                          Organisation Details
                        </Link>
                      </li>
                      <li className='service-header__nav-list-item '>
                        <a className='service-header__nav-list-item-link'>
                          Manage admin users
                        </a>
                      </li>
                      <li className='service-header__nav-list-item'>
                        <a className='service-header__nav-list-item-link'>
                          Manage Keywords
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}
        <div
          style={{
            backgroundColor: '#1d70b8',
            margin: '0 auto',
            padding: '0.3rem',
            marginRight: '1.875rem',
            marginLeft: '1.875rem'
          }}
        />
      </header>
    </>
  )
}
