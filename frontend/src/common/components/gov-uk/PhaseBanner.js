import { useSelector } from 'react-redux'

export default function Header({ type, phase }) {
  const serviceType = useSelector((state) => state.session.serviceType)
  const currentPageUrl = window.location.href
  // const getFeedbackLink = () => {
  //   let feedbackLink = '/signup/feedback'

  //   if (phase === 'beta') {
  //     if (type === 'org') {
  //       feedbackLink = 'https://forms.office.com/e/XWwCaDWu6A'
  //     } else {
  //       feedbackLink = 'https://forms.office.com/e/YpBL2ecL2a'
  //     }
  //   }

  //   return feedbackLink
  // }

  return (
    <>
      <div className='govuk-phase-banner govuk-body'>
        <div
          className={`${
            type === 'org' ? 'custom-width-container' : 'govuk-width-container'
          }`}
        >
          <p
            className='govuk-!-margin-bottom-0 '
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <strong className='govuk-tag govuk-phase-banner__content__tag'>
              Beta
            </strong>
            <span className='govuk-phase-banner__text'>
              This is a new service. Help us improve it and{' '}
              <a
                href={
                  type === 'org' || serviceType === 'organisation'
                    ? `https://defragroup.eu.qualtrics.com/jfe/form/SV_3z9xqQivBNzX1D8?Source=${encodeURIComponent(
                        currentPageUrl
                      )}`
                    : `https://defragroup.eu.qualtrics.com/jfe/form/SV_6Y9YvJmgRnqd19Y?Source=${encodeURIComponent(
                        currentPageUrl
                      )}`
                }
                className='govuk-link'
                target='_blank'
                rel='noopener noreferrer'
              >
                give your feedback (opens in new tab)
              </a>{' '}
              .
            </span>
          </p>
        </div>
      </div>
    </>
  )
}
