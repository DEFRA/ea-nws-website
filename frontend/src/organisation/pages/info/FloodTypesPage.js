import { useNavigate } from 'react-router-dom'
import floodAlertIcon from '../../../common/assets/images/flood_alert.svg'
import floodWarningIcon from '../../../common/assets/images/flood_warning.svg'
import severeFloodWarningIcon from '../../../common/assets/images/severe_flood_warning.svg'
import BackLink from '../../../common/components/custom/BackLink'

export default function FloodTypesPage () {
  const navigate = useNavigate()

  const navigateBack = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  return (
    <>

      <BackLink onClick={(e) => navigateBack(e)} />
      <main className='govuk-main-wrapper govuk-body'>
        <div className='govuk-grid-row govuk-body'>
          <div className='govuk-grid-column-one-half'>
            <h1 className='govuk-heading-l govuk-!-margin-top-3'>
              What are the different types of flood messages?
            </h1>
            <p>
              We send 3 types of flood messages when flooding is possible, is
              expected or is happening: flood alerts, flood warnings and severe
              flood warnings.
            </p>
            <p className='govuk-!-margin-top-6'>
              Your organisations's location may be in a place where you can get:
            </p>
            <ul className='govuk-list govuk-list--bullet govuk-!-margin-top-6'>
              <li>flood alerts (flood alert area)</li>
              <li>
                flood warnings and severe flood warnings (flood warning area)
              </li>
              <li>all 3 types of flood messages</li>
              <li>no flood messages</li>
            </ul>

            <br />
            {/* Flood Alert */}
            <h4 className='govuk-heading-m'>
              <img
                src={floodAlertIcon}
                alt='Flood alert icon'
                style={{ height: '50px' }}
              />
              Flood alert
            </h4>
            <p className='govuk-!-margin-top-6'>
              These are early alerts of possible flooding to help you be
              prepared.
            </p>
            <p className='govuk-!-margin-top-6'>
              The following may be at risk:
            </p>
            <ul className='govuk-list govuk-list--bullet govuk-!-margin-top-6'>
              <li>fields, recreational land and car parks</li>
              <li>minor roads</li>
              <li>farmland</li>
              <li>coastal areas affected by spray or waves overtopping</li>
            </ul>
            <p className='govuk-!-margin-top-6'>We usually send these:</p>
            <ul className='govuk-list govuk-list--bullet govuk-!-margin-top-6'>
              <li>2 to 12 hours before flooding</li>
              <li>during waking hours when possible</li>
            </ul>

            <br />
            {/* Flood Warning */}
            <h4 className='govuk-heading-m'>
              <img
                src={floodWarningIcon}
                alt='Flood warning icon'
                style={{ height: '50px' }}
              />
              Flood warning
            </h4>
            <p className='govuk-!-margin-top-6'>
              These warnings tell you flooding is expected and you'll need to
              act now.
            </p>
            <p className='govuk-!-margin-top-6'>Flooding may affect:</p>
            <ul className='govuk-list govuk-list--bullet govuk-!-margin-top-6'>
              <li>life and communities</li>
              <li>homes and businesses</li>
              <li>roads, railway lines and infrastructure</li>
              <li>coastal areas affected by spray or waves overtopping</li>
              <li>flood plains, including caravans park and campsites</li>
              <li>major tourist and leisure attractions</li>
            </ul>
            <p className='govuk-!-margin-top-6'>
              Flood warnings are usually sent 30 minutes to 2 hours before
              flooding.
            </p>

            <br />
            {/* Severe flood warning */}
            <h4 className='govuk-heading-m'>
              <img
                src={severeFloodWarningIcon}
                alt='Severe flood warning icon'
                style={{ height: '50px' }}
              />
              Severe flood warning
            </h4>
            <p className='govuk-!-margin-top-6'>
              These warnings tell you there is a risk of severe flooding and
              major disruption. Flooding could be a danger to life and property
              and you'll need to act now.
            </p>
            <p className='govuk-!-margin-top-6'>
              Severe flood warnings are sent to the same areas as flood
              warnings. They're sent any time there's danger to life.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
