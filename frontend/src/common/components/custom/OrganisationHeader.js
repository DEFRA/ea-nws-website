import {
  faAngleDown,
  faAngleUp,
  faL
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { orgAccountUrls } from '../../../organisation/routes/account/AccountRoutes'
import { urlManageKeywordsOrg } from '../../../organisation/routes/manage-keywords/ManageKeywordsRoutes'
import { useLocation } from 'react-router-dom'
export default function OrganisationHeader () {
  const [activeHeader, setActiveHeader] = useState(null)
  const navigate = useNavigate()
  const firstname = useSelector((state) => state?.session?.profile?.firstname) || null
  const lastname = useSelector((state) => state?.session?.profile?.lastname) || null
  const formattedName = firstname && lastname ? firstname.charAt(0) + '.' + lastname : ''
  const orgName = useSelector((state) => state?.session?.organization?.name) || null
  const [menuOpen,setMenuOpen] = useState(false)
  const session = useSelector((state) => state.session)
  const authToken = session.authToken
  const location = useLocation()
  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const handleActiveHeader = (item) => {
    if (item === activeHeader) {
      setActiveHeader(null)
    } else {
      setActiveHeader(item)
    }
  }

  const handleAdmin = (event) => {
    event.preventDefault()
    if (activeHeader === 'accountDetails') {
      setActiveHeader(null)
      navigate(-1)
    } else {
      setActiveHeader('accountDetails')
      navigate(orgAccountUrls.admin.details)
    }
  }

  const handleClick = (event, link) => {
    event.preventDefault()
    setActiveHeader(null)
    navigate(link)
  }

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
                      fillRule='evenodd'
                      d='M22.6 10.4c-1 .4-2-.1-2.4-1-.4-.9.1-2 1-2.4.9-.4 2 .1 2.4 1s-.1 2-1 2.4m-5.9 6.7c-.9.4-2-.1-2.4-1-.4-.9.1-2 1-2.4.9-.4 2 .1 2.4 1s-.1 2-1 2.4m10.8-3.7c-1 .4-2-.1-2.4-1-.4-.9.1-2 1-2.4.9-.4 2 .1 2.4 1s0 2-1 2.4m3.3 4.8c-1 .4-2-.1-2.4-1-.4-.9.1-2 1-2.4.9-.4 2 .1 2.4 1s-.1 2-1 2.4M17 4.7l2.3 1.2V2.5l-2.3.7-.2-.2.9-3h-3.4l.9 3-.2.2c-.1.1-2.3-.7-2.3-.7v3.4L15 4.7c.1.1.1.2.2.2l-1.3 4c-.1.2-.1.4-.1.6 0 1.1.8 2 1.9 2.2h.7c1-.2 1.9-1.1 1.9-2.1 0-.2 0-.4-.1-.6l-1.3-4c-.1-.2 0-.2.1-.3m-7.6 5.7c.9.4 2-.1 2.4-1 .4-.9-.1-2-1-2.4-.9-.4-2 .1-2.4 1s0 2 1 2.4m-5 3c.9.4 2-.1 2.4-1 .4-.9-.1-2-1-2.4-.9-.4-2 .1-2.4 1s.1 2 1 2.4m-3.2 4.8c.9.4 2-.1 2.4-1 .4-.9-.1-2-1-2.4-.9-.4-2 .1-2.4 1s0 2 1 2.4m14.8 11c4.4 0 8.6.3 12.3.8 1.1-4.5 2.4-7 3.7-8.8l-2.5-.9c.2 1.3.3 1.9 0 2.7-.4-.4-.8-1.1-1.1-2.3l-1.2 4c.7-.5 1.3-.8 2-.9-1.1 2.5-2.6 3.1-3.5 3-1.1-.2-1.7-1.2-1.5-2.1.3-1.2 1.5-1.5 2.1-.1 1.1-2.3-.8-3-2-2.3 1.9-1.9 2.1-3.5.6-5.6-2.1 1.6-2.1 3.2-1.2 5.5-1.2-1.4-3.2-.6-2.5 1.6.9-1.4 2.1-.5 1.9.8-.2 1.1-1.7 2.1-3.5 1.9-2.7-.2-2.9-2.1-2.9-3.6.7-.1 1.9.5 2.9 1.9l.4-4.3c-1.1 1.1-2.1 1.4-3.2 1.4.4-1.2 2.1-3 2.1-3h-5.4s1.7 1.9 2.1 3c-1.1 0-2.1-.2-3.2-1.4l.4 4.3c1-1.4 2.2-2 2.9-1.9-.1 1.5-.2 3.4-2.9 3.6-1.9.2-3.4-.8-3.5-1.9-.2-1.3 1-2.2 1.9-.8.7-2.3-1.2-3-2.5-1.6.9-2.2.9-3.9-1.2-5.5-1.5 2-1.3 3.7.6 5.6-1.2-.7-3.1 0-2 2.3.6-1.4 1.8-1.1 2.1.1.2.9-.3 1.9-1.5 2.1-.9.2-2.4-.5-3.5-3 .6 0 1.2.3 2 .9l-1.2-4c-.3 1.1-.7 1.9-1.1 2.3-.3-.8-.2-1.4 0-2.7l-2.9.9C1.3 23 2.6 25.5 3.7 30c3.7-.5 7.9-.8 12.3-.8'
                    />
                  </svg>
                  <span>GOV.UK</span>
                </span>
              </a>
            </div>

            
            {(authToken !== null && !location.pathname.includes('signup') && !location.pathname.includes('declaration')) &&
                  
                    <button onClick={() => toggleMenu()} className='header-navigation-menu'>
                      Menu {menuOpen ? '\u{25B2}' : '\u{25BC}'}
                    </button>
                  }
            <nav className='one-login-header__nav'>
              <ul className='one-login-header__nav__list'>
                <li
                  className={`one-login-header__nav__list-item ${
                    activeHeader === 'orgDetails' && 'active'
                  }`}
                  onClick={() => handleActiveHeader('orgDetails')}
                > 
                  <FontAwesomeIcon
                    icon={
                      activeHeader === 'orgDetails' ? faAngleUp : faAngleDown
                    }
                    className={`${
                      activeHeader === 'orgDetails' && 'active'
                    } highlighted`}
                  />
                  <svg width='25' height='25' viewBox='0 0 21 21' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <g clipPath='url(#clip0_2324_180503)'>
                      <path d='M6.41797 4.58337V6.25004' strokeWidth='2' />
                      <path d='M6.41797 7.91669V9.58335' strokeWidth='2' />
                      <path d='M6.41797 11.25V12.9167' strokeWidth='2' />
                      <path d='M10.5859 7.91669V9.58335' strokeWidth='2' />
                      <path d='M10.5859 4.58337V6.25004' strokeWidth='2' />
                      <path d='M10.5859 11.25V12.9167' strokeWidth='2' />
                      <path d='M14.3359 8.33337H19.3359V18.3334H14.3359V8.33337Z' strokeWidth='2' />
                      <path d='M14.3346 18.3334V1.66669H2.66797V18.3334H14.3346Z' strokeWidth='2' />
                      <path d='M8.5 15V18.3333' strokeWidth='2' />
                    </g>
                    <defs>
                      <clipPath id='clip0_2324_180503'>
                        <rect width='20' height='20' fill={activeHeader === 'orgDetails' ? '#1D70B8' : 'white'} transform='translate(1)' />
                      </clipPath>
                    </defs>
                  </svg>
                  

                  <span className='govuk-!-font-weight-bold'>{orgName}</span>
                </li>
                <li className='one-login-header__nav__list-item org-header-divider-line-container no-highlight'>
                  <div className='org-header-divider-line' />
                </li>
                <li
                  className={`one-login-header__nav__list-item ${
                    activeHeader === 'accountDetails' && 'active'
                  }`}
                  onClick={(event) => handleAdmin(event)}
                >

                  <svg width='25' height='25' viewBox='0 0 23 23' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M11.3475 12.9411C13.5458 12.9411 15.3279 11.159 15.3279 8.9607C15.3279 6.76242 13.5458 4.98035 11.3475 4.98035C9.14926 4.98035 7.36719 6.76242 7.36719 8.9607C7.36719 11.159 9.14926 12.9411 11.3475 12.9411Z' strokeWidth='1.71' strokeLinecap='round' strokeLinejoin='round' />
                    <path d='M4.55078 19.1504C5.26126 17.9842 6.2598 17.0203 7.45041 16.3516C8.64101 15.6827 9.98363 15.3314 11.3492 15.3314C12.7148 15.3314 14.0575 15.6827 15.2481 16.3516C16.4387 17.0203 17.4371 17.9842 18.1477 19.1504' strokeWidth='1.71' strokeLinecap='round' strokeLinejoin='round' />
                    <path d='M11.3489 21.6979C17.0646 21.6979 21.6979 17.0646 21.6979 11.3489C21.6979 5.63338 17.0646 1 11.3489 1C5.63338 1 1 5.63338 1 11.3489C1 17.0646 5.63338 21.6979 11.3489 21.6979Z' strokeWidth='1.71' strokeLinecap='round' strokeLinejoin='round' />
                  </svg>

                  <span className='govuk-!-font-weight-bold'>{formattedName}</span>
                </li>

                <li className='one-login-header__nav__list-item org-header-divider-line-container no-highlight'>
                  <div className='org-header-divider-line' />
                </li>
                <li className='one-login-header__nav__list-item no-highlight'>
                  <Link
                    className='one-login-header__nav__link govuk-!-font-weight-bold'
                    to='organisation/signout'
                  >
                    Sign out
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Toggled menu */}
        {activeHeader === 'orgDetails' && (
          <div className='service-header toggle-enabled govuk-!-padding-top-5 govuk-!-padding-bottom-5'>
            <div>
              <div className='service-header__container custom-width-container'>
                <h2 className='service-header__heading govuk-!-font-weight-bold'>
                  {orgName}
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
                          onClick={(event) => handleClick(event, orgAccountUrls.organisation.orgDetails)}
                        >
                          Organisation Details
                        </Link>
                      </li>
                      {/* TODO: option 2 to manage admin users
                      <li className='service-header__nav-list-item '>
                        <a className='service-header__nav-list-item-link'>
                          Manage admin users
                        </a>
                      </li> */}
                      <li className='service-header__nav-list-item'>
                        <Link
                          className='service-header__nav-list-item-link'
                          onClick={(event) => handleClick(event, urlManageKeywordsOrg)}
                        >
                          Manage Keywords
                        </Link>
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
            padding: '0.2rem'
          }}
        />
      </header>
    </>
  )
}
