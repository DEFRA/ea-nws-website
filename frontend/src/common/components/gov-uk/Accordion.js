import { initAll } from 'govuk-frontend'
import React, { useEffect, useState } from 'react'

export default function Accordion({ sections = [], id = 'accordion-default' }) {
  const [openSections, setOpenSections] = useState(sections.map(() => false))

  useEffect(() => {
    initAll()
  }, [])

  const toggleSection = (index) => {
    setOpenSections((prev) =>
      prev.map((open, i) => (i === index ? !open : open))
    )
  }

  return (
    <div className='govuk-accordion' data-module='govuk-accordion' id={id}>
      {sections.map((section, index) => {
        const sectionId = `${id}-section-${index}`
        const headingId = `${sectionId}-heading`
        const contentId = `${sectionId}-content`
        const isOpen = openSections[index]

        return (
          <div className='govuk-accordion__section' key={sectionId}>
            <div className='govuk-accordion__section-header'>
              <h2 className='govuk-accordion__section-heading'>
                <button
                  type='button'
                  className='govuk-accordion__section-button'
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  id={headingId}
                  onClick={() => toggleSection(index)}
                >
                  {section.heading}
                </button>
              </h2>
            </div>
            <div
              id={contentId}
              className='govuk-accordion__section-content'
              aria-labelledby={headingId}
              hidden={!isOpen}
            >
              {section.content}
            </div>
          </div>
        )
      })}
    </div>
  )
}
