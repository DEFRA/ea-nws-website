import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import '../../css/custom.css'

export default function SubNavigation ({ pages, currentPage, type }) {
  const session = useSelector((state) => state.session)
  const authToken = session.authToken
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  if (type === 'org') {
    return (
      <nav aria-label='Sub navigation'>
        <ul className='sub-navigation__list'>
          <li className='sub-navigation__item bold'>
            <a href='/' style={{ textDecoration: 'none', color: 'black' }}>
              Get flood warnings
            </a>
          </li>

          {
            authToken !== null &&
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
          ))
}
        </ul>
      </nav>
    )
  } else {
    return (
      <nav aria-label='Sub navigation'>
        <ul className='sub-navigation__list'>
          <li className='sub-navigation__item bold'>
            <a href='/' style={{ textDecoration: 'none', color: 'black' }}>
              Get flood warnings
            </a>
          </li>
          {authToken !== null &&
            <li className='sub-navigation__item'>
              <button onClick={() => toggleMenu()} className='sub-navigation__menu'>
                Menu {menuOpen ? '\u{25B2}' : '\u{25BC}'}
              </button>
            </li>}

          {authToken !== null &&
          pages.map((page, index) => (
            <li key={index} className={`sub-navigation__item ${!menuOpen && 'closed'}`}>
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
