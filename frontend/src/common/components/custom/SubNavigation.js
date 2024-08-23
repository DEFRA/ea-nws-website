import { Link } from 'react-router-dom'
import '../../css/custom.css'

export default function SubNavigation({ pages, currentPage }) {
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
