import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

export default function ServicePreviewPage () {
  const FeatureSection = ({ title, description, imgSrc, imgAlt }) => (
    <div className='govuk-grid-row govuk-!-margin-bottom-9'>
      <div className='govuk-grid-column-one-half'>
        <h2 className='govuk-heading-m'>{title}</h2>
        <p className='govuk-body'>{description}</p>
      </div>
      <div className='govuk-grid-column-one-half'>
        <img src={imgSrc} alt={imgAlt} className='govuk-!-width-full' />
      </div>
    </div>
  )

  return (
    <>
      <Helmet>
        <title>Service Overview – Professional service – GOV.UK</title>
      </Helmet>

      <div className='service-overview-banner'>
        <div className='govuk-width-container service-overview-banner__inner '>
          <Link
            to={'/'}
            className='service-overview-banner__icon govuk-header__link'
          >
            <img
              src='/assets/images/govuk-overview-page-icon.svg'
              className='service-overview-banner__icon'
            />
            <span className='service-overview-banner__icon-text'>GOV.UK</span>
          </Link>
          <br />
          <br />
          <h1
            className='govuk-heading-xl service-overview-banner__title'
            id='main-content'
          >
            Get flood warnings
          </h1>
          <h2 className='govuk-heading-l govuk-!-font-weight-bold service-overview-banner__subtitle'>
            Professional service
          </h2>
          <br />
          <p className='govuk-body-l service-overview-banner__text'>
            Recommended for organisations, local authorities and
            <br />
            category 1 or 2 responders
          </p>
        </div>
      </div>
      <main className='govuk-main-wrapper'>
        <div className='govuk-width-container govuk-!-padding-top-9'>
          <div className='govuk-grid-row'>
            <div className='govuk-grid-column-full'>
              <FeatureSection
                title='Add unlimited locations'
                description={
                  <>
                    <p>You can add locations by:</p>
                    <ul className='govuk-list govuk-list--bullet'>
                      <li>selecting areas</li>
                      <li>adding individually</li>
                      <li>bulk-uploading in a file</li>
                    </ul>
                  </>
                }
                imgSrc='/assets/images/preview-locations-dashboard.png'
                imgAlt='Screenshot: Manage your organisation’s locations'
              />
              <hr className='service-overview-section-hr' />

              <FeatureSection
                reverse
                title='Use maps to monitor flood risk'
                description={
                  <>
                    Find out which of your locations currently have flood
                    warnings in place.
                  </>
                }
                imgSrc='/assets/images/preview-live-flood-warnings.png'
                imgAlt='Screenshot: Live flood warnings map'
              />
              <hr className='service-overview-section-hr' />

              <FeatureSection
                title='Add unlimited users to get flood messages by text, phone call or email'
                description={
                  <>
                    You can set up as many colleagues and contacts as you like.
                  </>
                }
                imgSrc='/assets/images/preview-adding-new-user.png'
                imgAlt='Screenshot: Your organisation’s users'
              />
              <hr className='service-overview-section-hr' />

              <FeatureSection
                reverse
                title='Multiple administrators allowed'
                description={
                  <>
                    Add others in your organisation to help manage your account.
                  </>
                }
                imgSrc='/assets/images/preview-users-dashboard.png'
                imgAlt='Screenshot: Select type of new user'
              />
              <hr className='service-overview-section-hr' />

              <FeatureSection
                title='Create reports'
                description={
                  <>
                    <p>You can view or filter:</p>
                    <ul className='govuk-list govuk-list--bullet'>
                      <li>live flood warnings</li>
                      <li>warnings no longer in force</li>
                      <li>historic warnings</li>
                      <li>locations</li>
                      <li>users</li>
                    </ul>
                  </>
                }
                imgSrc='/assets/images/preview-reports-dashboard.png'
                imgAlt='Screenshot: Flood warnings removed in the last 24 hours'
              />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
