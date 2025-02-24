import { Link } from 'react-router-dom'

export default function ServiceNavigation({
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
        class='govuk-service-navigation'
        data-module='govuk-service-navigation'
        style={removeGreyBackground ? { backgroundColor: 'transparent' } : {}}
      >
        <div class='govuk-width-container'>
          <div class='govuk-service-navigation__container'>
            {serviceLink && (
              <span class='govuk-service-navigation__service-name'>
                <Link
                  to={serviceLink.url}
                  class='govuk-service-navigation__link'
                >
                  {serviceLink.name}
                </Link>
              </span>
            )}
            <nav aria-label='Menu' class='govuk-service-navigation__wrapper'>
              <ul class='govuk-service-navigation__list' id='navigation'>
                {navLinks.map((link) => (
                  <li
                    class={`govuk-service-navigation__item ${
                      currentPage === link.url &&
                      'govuk-service-navigation__item--active'
                    }`}
                  >
                    <Link
                      class='govuk-service-navigation__link'
                      onClick={() => updatePage(link.url)}
                      aria-current='true'
                    >
                      {currentPage === link.url ? (
                        <strong className='govuk-service-navigation__active-fallback'>
                          {link.name}
                        </strong>
                      ) : (
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
