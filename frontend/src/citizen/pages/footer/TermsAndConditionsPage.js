import { Helmet } from 'react-helmet'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'

export default function TermsAndConditionsPage() {
  const navigate = useNavigate()

  return (
    <>
      <Helmet>
        <title>Terms and conditions - Get flood warnings - GOV.UK</title>
      </Helmet>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <div className='govuk-body'>
              <h1 className='govuk-heading-l' id='main-content'>
                Terms and conditions
              </h1>
              <h2 className='govuk-heading-m'>What we will do</h2>
              <p>
                We'll make all reasonable efforts to send the flood warnings
                you’ve asked for but we cannot guarantee they’ll be sent or
                arrive. For example, you may fail to receive a warning due to
                unplanned network disruption.
              </p>
              <p>Warnings may be sent at any time of the day or night.</p>
              <p>
                We aim to develop and issue flood warnings based on the best
                available data and as early as possible before flooding is
                likely. However, we cannot guarantee warnings are always
                accurate or complete due to the sometimes unpredictable nature
                of weather and flooding. In certain circumstances we may not be
                able to give as much early notice as we would like.
              </p>

              <h2 className='govuk-heading-m'>What we will not do</h2>
              <p>We do not:</p>
              <ul className='govuk-list govuk-list--bullet'>
                <li>accept responsibility if you fail to receive a warning</li>
                <li>
                  guarantee that our online or phone services will be available
                </li>
                <li>
                  accept responsibility for any loss, damage or costs incurred
                  by you (or anyone you share our flood warnings with) caused by
                  flooding or by issuing or failing to issue warnings, except
                  where the law says we must
                </li>
              </ul>

              <h2 className='govuk-heading-m'>What you’re responsible for</h2>
              <p>You’re responsible for:</p>
              <ul className='govuk-list govuk-list--bullet'>
                <li>providing us with accurate contact details</li>
                <li>
                  telling us about any changes to your contact information
                </li>
              </ul>

              <h2 className='govuk-heading-m'>
                How we will use your personal information
              </h2>
              <p>
                Our{' '}
                <Link
                  to='/privacy'
                  className='govuk-link'
                  target='_blank'
                  style={{ cursor: 'pointer' }}
                >
                  privacy notice (opens new window)
                </Link>{' '}
                explains how we treat your personal information.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
