import { Link } from 'react-router-dom'
import '../../css/custom.css'
import { useSelector } from 'react-redux'

export default function SubNavigation ({ pages, currentPage, type }) {
  const session = useSelector((state) => state.session)
  const authToken = session.authToken
  if (type === 'org') {
    return (
      <nav aria-label='Sub navigation' className='sub-navigation-org'>
        <ul className='sub-navigation-org__list'>
          <li className='sub-navigation__item bold'>Get flood warnings</li>

          {
            authToken !== null &&
          pages.map((page, index) => (
            <li key={index} className='sub-navigation__item bold'>
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
          <li className='sub-navigation__item'><b>Get flood warnings</b></li>
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
  }
}
