import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { orgManageLocationsUrls } from '../../../organisation/routes/manage-locations/ManageLocationsRoutes'
import { orgSignUpUrls } from '../../../organisation/routes/sign-up/SignUpRoutes'
import '../../css/custom.css'

export default function SubNavigation({ pages, currentPage, type }) {
  const session = useSelector((state) => state.session)
  const authToken = session.authToken
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const isSignedInAndNotOnSignUpPath = (journey) => {
    const baseUrls = ['declaration']

    const urls =
      journey === 'org'
        ? [orgSignUpUrls.signUp, 'organisation/admin-controls', ...baseUrls]
        : ['/signup', ...baseUrls]

    return (
      authToken !== null && !urls.some((url) => location.pathname.includes(url))
    )
  }

  if (type === 'org') {
    return (
      <nav aria-label='Sub navigation'>
        <ul className='sub-navigation__list'>
          <li className='sub-navigation__item bold'>
            <a
              href={
                isSignedInAndNotOnSignUpPath('org')
                  ? orgManageLocationsUrls.monitoring.view
                  : '/'
              }
              style={{ textDecoration: 'none', color: 'black' }}
            >
              Get flood warnings
            </a>
            <br />
            <span style={{ color: '#505a5f', fontSize: '12px' }}>
              Professional
            </span>
          </li>
          {isSignedInAndNotOnSignUpPath('org') && (
            <li className='sub-navigation__item'>
              <button
                onClick={() => toggleMenu()}
                className='sub-navigation__menu'
              >
                Menu {menuOpen ? '\u{25B2}' : '\u{25BC}'}
              </button>
            </li>
          )}
          {isSignedInAndNotOnSignUpPath('org') &&
            pages.map((page, index) => (
              <li
                key={index}
                className={`sub-navigation__item ${!menuOpen && 'closed'}`}
              >
                <Link
                  to={page.link}
                  className='sub-navigation__link'
                  aria-current={currentPage === page.link ? 'page' : 'no'}
                >
                  {page.title}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    )
  } else if (type === 'sub') {
    return (
      <nav aria-label='Sub navigation'>
        <ul className='sub-navigation__list sub'>
          {authToken !== null &&
            pages.map((page, index) => (
              <li key={index} className='sub-navigation__item'>
                <Link
                  to={page.link}
                  className='sub-navigation__link'
                  aria-current={currentPage === page.link ? 'page' : 'no'}
                >
                  {page.title}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    )
  } else {
    return (
      <nav aria-label='Sub navigation'>
        <ul className='sub-navigation__list'>
          <li className='sub-navigation__item bold'>
            <a
              href={isSignedInAndNotOnSignUpPath('citizen') ? '/home' : '/'}
              style={{ textDecoration: 'none', color: 'black' }}
            >
              Get flood warnings
            </a>
          </li>
          {isSignedInAndNotOnSignUpPath('citizen') && (
            <li className='sub-navigation__item'>
              <button
                onClick={() => toggleMenu()}
                className='sub-navigation__menu'
              >
                Menu {menuOpen ? '\u{25B2}' : '\u{25BC}'}
              </button>
            </li>
          )}
          {isSignedInAndNotOnSignUpPath('citizen') &&
            pages.map((page, index) => (
              <li
                key={index}
                className={`sub-navigation__item ${!menuOpen && 'closed'}`}
              >
                <Link
                  to={page.link}
                  className='sub-navigation__link'
                  aria-current={currentPage === page.link ? 'page' : 'no'}
                >
                  {page.title}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    )
  }
}
