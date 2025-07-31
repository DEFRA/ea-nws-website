import { Link } from 'react-router-dom'

export default function ServiceNavigation ({
  serviceLink,
  navLinks,
  currentPage,
  updatePage,
  removeGreyBackground = false
}) {
  return (
    <>
      <section
        aria-label='Service information'
        className='govuk-service-navigation'
        data-module='govuk-service-navigation'
        style={removeGreyBackground ? { backgroundColor: 'transparent' } : {}}
      >
        <div className='govuk-width-container'>
          <div className='govuk-service-navigation__container'>
            {serviceLink && (
              <span className='govuk-service-navigation__service-name'>
                <Link
                  to={serviceLink.url}
                  className='govuk-service-navigation__link'
                >
                  {serviceLink.name}
                </Link>
              </span>
            )}
            <nav aria-label='Menu' className='govuk-service-navigation__wrapper'>
              <ul className='govuk-service-navigation__list' id='navigation'>
                {navLinks.map((link, index) => (
                  <li
                    key={index}
                    className={`govuk-service-navigation__item ${
                      currentPage === link.url &&
                      'govuk-service-navigation__item--active'
                    }`}
                  >
                    <Link
                      className='govuk-service-navigation__link'
                      onClick={() => updatePage(link.url)}
                      aria-current='true'
                    >
                      {currentPage === link.url
                        ? (
                          <strong className='govuk-service-navigation__active-fallback'>
                            {link.name}
                          </strong>
                          )
                        : (
                            link.name
                          )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </>
  )
}
