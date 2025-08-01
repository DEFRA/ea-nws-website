import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'

export default function OsTermsPage() {
  const navigate = useNavigate()

  return (
    <>
      <Helmet>
        <title>
          Ordnance Survey terms and conditions - Get flood warnings - GOV.UK
        </title>
      </Helmet>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <div className='govuk-body'>
              <h1 className='govuk-heading-l' id='main-content'>
                Ordnance Survey terms and conditions
              </h1>
              <p>
                Addressing information and mapping data from{' '}
                <a href='https://www.ordnancesurvey.co.uk/' target='_blank'>
                  Ordnance Survey
                </a>{' '}
                is © Crown copyright and database rights 2025 OS AC0000807064.{' '}
              </p>

              <p>
                Use of this data is subject to the following conditions by way
                of exception to the standard Open Government Licence referred to
                at the foot of this page:
              </p>

              <h2 className='govuk-heading-m'>Terms and conditions</h2>
              <ul className='govuk-list'>
                <li>
                  I. You are granted a non-exclusive, royalty free revocable
                  licence solely to view the licensed mapping and addressing
                  data for non-commercial purposes for the period during which
                  we make it available;
                </li>
                <li>
                  II. You are not permitted to copy, sub-license, distribute,
                  sell or otherwise make available such data to third parties in
                  any form; and
                </li>
                <li>
                  III. Third party rights to enforce the terms of this licence
                  shall be reserved to OS.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
