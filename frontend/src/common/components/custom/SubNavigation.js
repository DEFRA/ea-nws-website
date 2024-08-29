import { Link } from 'react-router-dom'
import '../../css/custom.css'

export default function SubNavigation ({ pages, currentPage, type }) {
  if (type === 'org') {
    return (
      <nav aria-label='Sub navigation' className='sub-navigation-org'>
        <ul className='sub-navigation-org__list'>
          {pages.map((page, index) => (
            <li key={index} className='sub-navigation__item bold'>
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
          {pages.map((page, index) => (
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
