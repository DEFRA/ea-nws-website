import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useLocation, useNavigate } from 'react-router-dom'
import BackLink from '../../components/custom/BackLink'
import { backendCall } from '../../services/BackendService'

export default function AccessibilityStatementPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [servicePhase, setServicePhase] = useState(false)

  async function getServicePhase() {
    const { data } = await backendCall('data', 'api/service/get_service_phase')
    setServicePhase(data)
  }

  useEffect(() => {
    getServicePhase()
  }, [])

  return (
    <>
      <Helmet>
        <title>Accessibility statement - Get flood warnings - GOV.UK</title>
      </Helmet>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-three-quarters'>
            <div className='govuk-body'>
              <h1 className='govuk-heading-l' id='main-content'>
                Accessibility statement
              </h1>
              <p>
                This accessibility statement applies to the Get flood warnings
                {location.pathname.includes('organisation')
                  ? ' professional'
                  : ' standard'}{' '}
                service which is built as a website application.
              </p>
              <p>
                The Environment Agency is committed to making its flood warnings
                service accessible, in accordance with the Public Sector Bodies
                (Websites and Mobile Applications) (No. 2) Accessibility
                Regulations 2018.
              </p>
              <p>
                We want as many people as possible to be able to use this
                service. For example, you should be able to:
              </p>
              <ul className='govuk-list govuk-list--bullet'>
                <li>
                  use browser settings or plugins to change colours, contrast
                  and fonts
                </li>
                <li>
                  use browser settings or other software to zoom in to 200%
                  without the text splitting off the screen
                </li>
              </ul>
              <p>We've also made the text as simple as possible to use</p>

              <h2 className='govuk-heading-m govuk-!-padding-top-2 govuk-!-margin-bottom-0'>
                How accessible this website is
              </h2>
              <p>We know some parts of this service are not accessible.</p>
              <p>
                There are issues that make the journeys difficult to navigate
                for low vision users.
              </p>
              <p>
                Users navigating with a keyboard will be unable to complete all
                tasks independently as some components cannot be operated with a
                keyboard.
              </p>
              <p>
                Voice activation users will find that some components are
                inconsistent and as a result, they may not be sure how to
                interact with certain elements.
              </p>
              <p>
                Screen reader users may not be able to complete all tasks within
                the service without help.
              </p>
              <h2 className='govuk-heading-m govuk-!-padding-top-2 govuk-!-margin-bottom-0'>
                Feedback and contact information
              </h2>
              <p>
                If you find any problems not listed on this page or think we're
                not meeting accessibility requirements, contact{' '}
                <a
                  className='govuk-link'
                  href='enquiries@environment-agency.gov.uk'
                >
                  enquiries@environment-agency.gov.uk
                </a>
                .
              </p>
              {location.pathname.includes('organisation') ? (
                <p>
                  If you need help using this service, email us at{' '}
                  <a
                    className='govuk-link'
                    href='getfloodwarnings@environment-agency.gov.uk'
                  >
                    getfloodwarnings@environment-agency.gov.uk
                  </a>
                  .
                </p>
              ) : (
                <p>
                  You can also call Floodline, who will provide all of the
                  information that's on our website and tell you if you're
                  currently at risk of flooding. They can register you to the
                  service, update your existing details and cancel your account.
                  They also provide a text relay service for people who are
                  D/deaf, hearing impaired or have a speech impediment.
                </p>
              )}

              <h3 className='govuk-heading-s govuk-!-margin-bottom-0'>
                Floodline
              </h3>
              <p>
                Floodline Telephone: 0345 988 1188
                <br />
                Textphone: 0345 602 6340
                <br />
                This is a 24 hour service.
              </p>
              <h2 className='govuk-heading-m govuk-!-padding-top-2 govuk-!-margin-bottom-0'>
                Compliance status
              </h2>
              <p>
                This website is partially compliant with the
                <a
                  href='https://www.w3.org/TR/WCAG22/'
                  className='govuk-link'
                  target='_blank'
                >
                  {' '}
                  Web Content Accessibility Guidelines version 2.2
                </a>{' '}
                AA standard, due to the non-compliances listed below.
              </p>
              <h2 className='govuk-heading-m govuk-!-padding-top-2'>
                Non-accessible content
              </h2>
              <p>
                The content listed below is non-accessible for the following
                reasons.
              </p>
              <h3 className='govuk-heading-s'>
                Non-compliance with the accessibility regulations
              </h3>
              <ol className='govuk-list govuk-list--number'>
                <li className='govuk-!-margin-bottom-2'>
                  When a new page is loaded, screen reader users are not always
                  taken to the start of each page. And when reading a page,
                  users may not be taken to the next point on the page
                  correctly. This is likely to be confusing for those who rely
                  on keyboard alone to navigate. This fails WCAG 2.2 success
                  criterion 2.4.3 Focus Order (A)
                </li>
                <li className='govuk-!-margin-bottom-2'>
                  Some headings do not display correctly. They may look like
                  normal text or a different type of heading. This may make
                  content difficult to follow if you use a screenreader.{' '}
                  {location.pathname.includes('organisation') &&
                    'Also, some tables do not have table row or column headers, so screen reader users may not understand the relationship between information in the table. '}
                  This fails WCAG 2.2 success criterion 1.3.1 Info and
                  Relationships (A).
                </li>
                {location.pathname.includes('organisation') && (
                  <>
                    <li>
                      There are some instances where link text is not read out
                      correctly for screen readers. It will be difficult for
                      screen reader users to fully understand the purpose of
                      these links.This fails WCAG 2.2 success criteria Link
                      purpose (A) and 1.3.1 Info and Relationships (A).
                    </li>
                    <li>
                      Labels on fields do not always have accessible names. If
                      you use voice activation software or a screen reader, you
                      may have problems understanding these fields. This fails
                      WCAG 2.2 success criteria 1.3.1 Info and Relationships
                      (A), 2.5.3 Label in Name (A) and 4.1.2 Name, Role, Value
                      (A).
                    </li>
                  </>
                )}
                <li className='govuk-!-margin-bottom-2'>
                  Some content that belongs together is not presented as a group
                  for screen reader users, for example, field labels and
                  checkbox answers. It may not be clear how these elements are
                  related. Screen reader users may have to look through the
                  surrounding page content to find the group label to understand
                  this content. This fails WCAG 2.2 success criteria 1.3.1 Info
                  and Relationships (A), 2.5.3 Label in name (A) and 4.1.2 Name,
                  Role, Value (A)
                </li>
                <li className='govuk-!-margin-bottom-2'>
                  It's not clear to screen reader users that maps are present.
                  And map controls are not always grouped together with the maps
                  to allow screenreader users to bypass them or understand their
                  purpose. This fails WCAG 2.2 success criteria 1.3.1 Info and
                  Relationships (A) and 1.1.1 Non-text Content (A).
                </li>
                {!location.pathname.includes('organisation') && (
                  <>
                    <li className='govuk-!-margin-bottom-2'>
                      There are one or two error messages that do not fully
                      explain the error to screen reader users. These need to be
                      replaced with a clear explanation of what the error is and
                      how to fix the error. This fails WCAG 2.2 success
                      criterion 3.3.3 Error Suggestion (AA).
                    </li>
                    <li className='govuk-!-margin-bottom-2'>
                      There are some instances where link text is not read out
                      correctly for screen readers. It will be difficult for
                      screen reader users to fully understand the purpose of
                      these links. This fails WCAG 2.2 success criteria Link
                      purpose (A) and 1.3.1 Info and Relationships (A).
                    </li>
                  </>
                )}
                {location.pathname.includes('organisation') && (
                  <>
                    <li className='govuk-!-margin-bottom-2'>
                      When users press the 'More actions' button, it reveals an
                      expanded dropdown list of actions. But this list is not
                      presented correctly to screen reader users so they cannot
                      quickly work out what has been shown This fails WCAG 2.2
                      success criteria 1.3.1 Info and Relationships (A) and
                      4.1.2 Name, Role, Value (A).
                    </li>
                    <li className='govuk-!-margin-bottom-2'>
                      Users cannot trigger all possible actions if they use
                      keyboard alone to navigate. For example, actions from
                      buttons, links or dropdown menus. This fails WCAG 2.2
                      success criteria 2.1.1 Keyboard (A) and 2.1.3 Keyboard (No
                      Exception) (AAA).
                    </li>
                    <li className='govuk-!-margin-bottom-2'>
                      Some components have show and hide functionality but are
                      not marked up so that screen readers users can interact
                      with them. This fails WCAG success criteria 1.3.1 Info and
                      Relationships (A) and 4.1.2 Name, Role, Value (A).
                    </li>
                    <li className='govuk-!-margin-bottom-2'>
                      Some text has poor colour contrast to its background.
                      People, especially partially sighted people, will find it
                      hard to read some text because the contrast is low. This
                      fails WCAG 2.2 success criterion 1.4.3 Contrast (Minimum)
                      (AA).
                    </li>
                    <li className='govuk-!-margin-bottom-2'>
                      There are a small number of error messages that do not
                      explain the error to screen reader users. These need to be
                      replaced with a clear explanation of what the error is and
                      how to fix the error. This fails WCAG 2.2 success
                      criterion 3.3.3 Error Suggestion (AA).
                    </li>
                  </>
                )}
              </ol>
              <h2 className='govuk-heading-m govuk-!-padding-top-2'>
                What we're doing to improve the accessibility of this website
              </h2>
              <p>
                We intend to make sure this website is compliant with the{' '}
                <a
                  href='https://www.w3.org/TR/WCAG22/'
                  className='govuk-link'
                  target='_blank'
                >
                  {' '}
                  Web Content Accessibility Guidelines version 2.2
                </a>{' '}
                AA standard.
              </p>
              <p>We plan to fix the issues listed by 15 February 2026.</p>
              <h2 className='govuk-heading-m govuk-!-padding-top-2'>
                Preparation of this accessibility statement
              </h2>
              <p>This statement was prepared on 21 July 2025.</p>
              <p>
                This website was first tested on 20 February 2025. Testing was
                carried out by Digital Accessibility Centre (DAC). DAC retested
                this website on 11 July 2025.
              </p>

              {/* {
What we’re doing to improve the accessibility of this website
We intend to make sure the new website is compliant with the Web Content Accessibility Guidelines version 2.2 AA standard.

We plan to fix these issues by 15 February 2026.

Preparation of this accessibility statement
This statement was prepared on 21 July 2025.

This website was first tested 20 February 2025. Testing was carried out by Digital Accessibility Centre (DAC). It was retested by DAC on 11 July 2025.
 */}

              <h2 className='govuk-heading-m govuk-!-padding-top-2'>
                Enforcement procedure
              </h2>
              <p>
                The Equality and Human Rights Commission (EHRC) is responsible
                for enforcing the Public Sector Bodies (Websites and Mobile
                Applications) (No. 2) Accessibility Regulations 2018 (the
                'accessibility regulations').
              </p>
              <p>
                If you're not happy with how we respond to your complaint,
                contact the
                <a
                  href='https://www.equalityadvisoryservice.com/'
                  className='govuk-link'
                  target='_blank'
                >
                  {' '}
                  Equality Advisory and Support Service (EASS)
                </a>
                .
              </p>
              <p></p>
              <p></p>
              {servicePhase === 'beta' && (
                <p>
                  We'll publish our accessibility statement after this testing
                  phase finishes.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
