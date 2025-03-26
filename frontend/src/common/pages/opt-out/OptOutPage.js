import React from 'react'
import { useNavigate } from 'react-router-dom'
import floodAlertIcon from '../../assets/images/flood_alert.svg'
import floodWarningIcon from '../../assets/images/flood_warning.svg'
import floodSevereWarningIcon from '../../assets/images/severe_flood_warning.svg'
import BackLink from '../../components/custom/BackLink'
import ContactDetails, {
  TelephoneNumber
} from '../../layouts/footer-link-layouts/ContactDetails'

export default function OptOutPage() {
  const navigate = useNavigate()
  const email = 'enquiries@environment-agency.gov.uk'

  return (
    <>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <div className='govuk-body'>
              <h1 className='govuk-heading-l'>
                This phone number has been automatically opted-in to receive
                flood warnings
              </h1>
              <p>
                In England, the Environment Agency sends flood warnings to phone
                numbers registered in areas at risk of flooding from rivers or
                the sea. The service is anonymous and free.
              </p>
              <div class='govuk-inset-text'>
                <p>
                  You can provide{' '}
                  <a class='govuk-link' href='/signup/feedback'>
                    feedback on this service.
                  </a>
                </p>
              </div>
              <h2 class='govuk-heading-m'>Why did we send you this message?</h2>
              <p>
                We have a{' '}
                <a
                  class='govuk-link'
                  href='https://www.gov.uk/guidance/preparation-and-planning-for-emergencies-responsibilities-of-responder-agencies-and-others'
                >
                  legal duty
                </a>{' '}
                to warn people who may be at risk of flooding so they can take
                action to protect themselves, their family and property.
              </p>
              <p>
                This phone number was automatically added to the list of numbers
                to which we send flood warnings. This is because it was
                registered in an area that’s at risk of flooding in the future
                and that may have flooded in the past.
              </p>
              <h2 class='govuk-heading-m'>How did we get your number?</h2>
              <p>
                We tell phone companies about areas at risk of flooding. They
                send us a list of the phone numbers registered in those areas.
              </p>
              <p>
                They do not give us the names or addresses associated with those
                numbers. We store the numbers securely, in line with our{' '}
                <a class='govuk-link' href='/privacy' target='_blank'>
                  privacy notice.
                </a>
              </p>
              <h2 class='govuk-heading-m'>Do you need to do anything?</h2>
              <p>
                You can choose to fully register your details or stop receiving
                flood warnings. If you do nothing, your phone will continue to
                automatically receive local flood warnings whenever they are
                issued.{' '}
                <b>
                  However, your number could be removed from the system at any
                  time. You would not be notified of this and you would no
                  longer receive flood warnings. The only way to be sure your
                  number remains on the system is to fully register. This will
                  give you full control over what messages you receive and how
                  we contact you.
                </b>
              </p>
              <h3 class='govuk-heading-s'>
                How to fully register your details
              </h3>
              <p>
                You can{' '}
                <a class='govuk-link' href='/signup/service-selection'>
                  fully register your details
                </a>{' '}
                to get the best experience of the flood warning service. The
                service is free.
              </p>
              <p>
                You can register more than one phone number. You can also choose
                to be sent:
              </p>
              <ul class='govuk-list govuk-list--bullet'>
                <li>flood alerts, which indicate that flooding is possible</li>
                <li>warnings and alerts by phone, email or text message</li>
                <li>warnings and alerts for more than one location</li>
              </ul>
              <h3 class='govuk-heading-s'>
                How to stop receiving flood warnings
              </h3>
              <p>To opt out of the service, you can do any of the following.</p>
              <ul class='govuk-list govuk-list--bullet'>
                <li>
                  send an email, including your phone number, to{' '}
                  <a
                    class='govuk-link'
                    href='mailto:enquiries@environment-agency.gov.uk'
                  >
                    enquiries@environment-agency.gov.uk
                  </a>
                </li>
                <li>
                  text ‘REMOVE’ to 60006, using the phone which received the
                  original text
                </li>
                <li>
                  call Floodline on <TelephoneNumber /> (
                  <a class='govuk-link' href='https://www.gov.uk/call-charges'>
                    call charges
                  </a>{' '}
                  may apply)
                </li>
              </ul>
              <p>
                Your number will be removed from the service and you will no
                longer receive warnings of potential floods.
              </p>
              <h2 class='govuk-heading-m'>What the flood warnings mean</h2>
              <p>We issue 3 levels of flood warning:</p>
              <h3 class='govuk-heading-s'>Flood alert</h3>
              <img
                src={floodAlertIcon}
                alt='Alert Icon'
                style={{ width: '100px', height: '75px' }}
              />
              <p>
                A flood alert means you need to prepare as flooding is possible.
                If you haven’t already done so, you should:
              </p>
              <ul class='govuk-list govuk-list--bullet'>
                <li>
                  <a class='govuk-link' href='/signup/service-selection'>
                    sign up for flood warnings
                  </a>
                </li>
                <li>
                  keep up to date with the{' '}
                  <a
                    class='govuk-link'
                    href='https://check-for-flooding.service.gov.uk'
                  >
                    latest flood risk situation
                  </a>
                </li>
                <li>
                  have a bag ready with vital items like insurance documents and
                  medications in case you need to leave your home
                </li>
                <li>
                  check you know how to turn off your gas, electricity and water
                  mains supplies
                </li>
                <li>plan how you'll move family and pets to safety</li>
              </ul>
              <h3 class='govuk-heading-s'>Flood warning</h3>
              <img
                src={floodWarningIcon}
                alt='Warning Icon'
                style={{ width: '100px', height: '75px' }}
              />
              <p>
                A flood warning means you need to act as flooding is expected.
                You should do all the actions for a flood alert, but also:
              </p>
              <ul class='govuk-list govuk-list--bullet'>
                <li>move vehicles to higher ground if it’s safe to do so</li>
                <li>move family and pets to safety</li>
                <li>
                  move important items upstairs or to a safe place in your
                  property, starting with cherished items and valuables, then
                  furniture and furnishings
                </li>
                <li>
                  turn off gas, electricity and water supplies if it’s safe to
                  do so; never touch an electrical switch if you’re standing in
                  water
                </li>
                <li>
                  if you have property protection products such as flood
                  barriers, or air brick covers, use them now
                </li>
              </ul>
              <h3 class='govuk-heading-s'>Severe flood warning</h3>
              <img
                src={floodSevereWarningIcon}
                alt='Severe Warning Icon'
                style={{ width: '100px', height: '75px' }}
              />
              <p>
                A severe flood warning means there is danger to life and you
                must act now.
              </p>
              <ul class='govuk-list govuk-list--bullet'>
                <li>call 999 if you’re in immediate danger</li>
                <li>
                  follow advice from the emergency services and evacuate if
                  you’re told to do so
                </li>
                <li>
                  make sure you have an emergency kit including a torch, spare
                  batteries, mobile phone and charger, warm clothes, important
                  numbers like your home insurance, water, food, first aid kit
                  and any medicines and babycare items you may need
                </li>
                <li>alert neighbours and offer help if it's safe to do so</li>
                <li>
                  avoid driving or walking through flood water: just 30cm (1
                  foot) of fast flowing water could move your car and even
                  shallow moving water can knock you off your feet
                </li>
                <li>
                  keep your family and pets away from floodwater – it may
                  contain heavy debris, sharp objects, open manhole covers,
                  sewage and chemicals
                </li>
                <li>
                  wash your hands if you’ve been in contact with flood water
                  which may contain toxic substances{' '}
                </li>
              </ul>
              <p>
                All floods are different and you should take advice from the
                emergency services and your local authority if you’re in a
                flood.
              </p>
              <h2 class='govuk-heading-m'>Learn about your local flood risk</h2>
              <p>
                Flooding puts lives at risk and causes millions of pounds worth
                of damage every year. Even if you haven’t seen it at your home
                or business premises, this doesn’t mean flooding won’t happen.
              </p>
              <p>Get more information about the flood risk in your area by:</p>
              <ul class='govuk-list govuk-list--bullet'>
                <li>
                  finding out about{' '}
                  <a
                    class='govuk-link'
                    href='https://check-long-term-flood-risk.service.gov.uk'
                  >
                    the likelihood of a property flooding in the future
                  </a>
                </li>
                <li>
                  get advice on how to{' '}
                  <a
                    class='govuk-link'
                    href='https://www.gov.uk/prepare-for-flooding'
                  >
                    prepare for a flood
                  </a>
                  ,{' '}
                  <a
                    class='govuk-link'
                    href='https://www.gov.uk/help-during-flood'
                  >
                    get help during a flood
                  </a>{' '}
                  and on{' '}
                  <a class='govuk-link' href='https://www.gov.uk/after-flood'>
                    what to do after a flood
                  </a>
                </li>
                <li>
                  checking the latest{' '}
                  <a
                    class='govuk-link'
                    href='https://check-for-flooding.service.gov.uk/river-and-sea-levels'
                  >
                    river and sea levels
                  </a>
                </li>
                <li>
                  getting{' '}
                  <a
                    class='govuk-link'
                    href='https://www.gov.uk/prepare-for-flooding/get-insurance'
                  >
                    insurance
                  </a>
                  , even if you’ve been flooded before
                </li>
              </ul>
              <h2 class='govuk-heading-m'>Current flooding information</h2>
              <p>
                For the latest flood risk situation, visit the{' '}
                <a
                  class='govuk-link'
                  href='https://check-for-flooding.service.gov.uk'
                >
                  check for flooding service
                </a>{' '}
                or call our 24 hour Floodline service.
              </p>
              <div class='govuk-inset-text'>
                <p>
                  <b>Floodline</b>
                </p>
                <ContactDetails />
              </div>
              <h2 className='govuk-heading-m'>Get help with your account</h2>
              <p>
                <span className='govuk-!-font-weight-bold'>
                  Floodline helpline
                  <br />
                </span>
                <ContactDetails />
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
