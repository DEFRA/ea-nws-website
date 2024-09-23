import * as React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '../components/gov-uk/Button'
import NotificationBanner from '../components/gov-uk/NotificationBanner'
import {
  clearAuth,
  setAuthToken,
  setContactPreferences,
  setProfile,
  setRegistrations
} from '../redux/userSlice'

export default function IndexPage () {
  const dispatch = useDispatch()
  const [mockSessionActive, setmockSessionActive] = useState(false)
  const [emptyProfileActive, setEmptyProfileActive] = useState(false)

  const mockOne = {
    id: '',
    enabled: true,
    firstname: 'John',
    lastname: 'Smith',
    emails: ['matthew.pepper@gmail.com', 'perry.pepper@gmail.com'],
    mobilePhones: ['07343 454590', '07889 668367'],
    homePhones: ['01475 721535'],
    language: 'EN',
    additionals: [{ id: 'signUpComplete', value: true }],
    unverified: {
      emails: [],
      mobilePhones: [],
      homePhones: []
    },
    pois: [
      {
        name: 'House Of Commons, Houses Of Parliament, London, SW1A 0AA',
        address: '10033540874',
        coordinates: {
          latitude: 51.4998415,
          longitude: -0.1246377
        },
        categories: ['severe', 'alert']
      }
    ]
  }

  const mockTwo = {
    id: '',
    enabled: true,
    firstname: 'John',
    lastname: 'Smith',
    emails: ['matthew.pepper@gmail.com', 'perry.pepper@gmail.com'],
    mobilePhones: ['07343 454590', '07889 668367'],
    homePhones: ['01475 721535'],
    language: 'EN',
    additionals: [{ id: 'signUpComplete', value: true }],
    unverified: {
      emails: [],
      mobilePhones: [],
      homePhones: []
    },
    pois: [
      {
        name: 'Big Ben, London, SW1A 0AA',
        address: 'UPRN',
        coordinates: {
          latitude: 51.5007,
          longitude: 0.1246
        }
      },
      {
        name: 'Kingfisher Way, London, NW10 8TZ',
        address: 'UPRN',
        coordinates: {
          latitude: 51.550738,
          longitude: -0.257635
        }
      }
    ]
  }

  const mockThree = {
    id: '',
    enabled: true,
    firstname: 'John',
    lastname: 'Smith',
    emails: ['matthew.pepper@gmail.com', 'perry.pepper@gmail.com'],
    mobilePhones: ['07343 454590', '07889 668367'],
    homePhones: ['01475 721535'],
    language: 'EN',
    additionals: [{ id: 'signUpComplete', value: true }],
    unverified: {
      emails: [],
      mobilePhones: [],
      homePhones: []
    },
    pois: [
      {
        name: 'Big Ben, London, SW1A 0AA',
        address: 'UPRN',
        coordinates: {
          latitude: 51.5007,
          longitude: 0.1246
        }
      },
      {
        name: 'Kingfisher Way, London, NW10 8TZ',
        address: 'UPRN',
        coordinates: {
          latitude: 51.550738,
          longitude: -0.257635
        }
      },
      {
        name: 'Big Ben, London, SW1A 0AA',
        address: 'UPRN',
        coordinates: {
          latitude: 51.5007,
          longitude: 0.1246
        }
      },
      {
        name: 'Kingfisher Way, London, NW10 8TZ',
        address: 'UPRN',
        coordinates: {
          latitude: 51.550738,
          longitude: -0.257635
        }
      },
      {
        name: 'Big Ben, London, SW1A 0AA',
        address: 'UPRN',
        coordinates: {
          latitude: 51.5007,
          longitude: 0.1246
        }
      },
      {
        name: 'Kingfisher Way, London, NW10 8TZ',
        address: 'UPRN',
        coordinates: {
          latitude: 51.550738,
          longitude: -0.257635
        }
      },
      {
        name: 'Big Ben, London, SW1A 0AA',
        address: 'UPRN',
        coordinates: {
          latitude: 51.5007,
          longitude: 0.1246
        }
      },
      {
        name: 'Kingfisher Way, London, NW10 8TZ',
        address: 'UPRN',
        coordinates: {
          latitude: 51.550738,
          longitude: -0.257635
        }
      },
      {
        name: 'Big Ben, London, SW1A 0AA',
        address: 'UPRN',
        coordinates: {
          latitude: 51.5007,
          longitude: 0.1246
        }
      },
      {
        name: 'Kingfisher Way, London, NW10 8TZ',
        address: 'UPRN',
        coordinates: {
          latitude: 51.550738,
          longitude: -0.257635
        }
      },
      {
        name: 'Big Ben, London, SW1A 0AA',
        address: 'UPRN',
        coordinates: {
          latitude: 51.5007,
          longitude: 0.1246
        }
      },
      {
        name: 'Kingfisher Way, London, NW10 8TZ',
        address: 'UPRN',
        coordinates: {
          latitude: 51.550738,
          longitude: -0.257635
        }
      },
      {
        name: 'Big Ben, London, SW1A 0AA',
        address: 'UPRN',
        coordinates: {
          latitude: 51.5007,
          longitude: 0.1246
        }
      },
      {
        name: 'Kingfisher Way, London, NW10 8TZ',
        address: 'UPRN',
        coordinates: {
          latitude: 51.550738,
          longitude: -0.257635
        }
      },
      {
        name: 'Big Ben, London, SW1A 0AA',
        address: 'UPRN',
        coordinates: {
          latitude: 51.5007,
          longitude: 0.1246
        }
      },
      {
        name: 'Kingfisher Way, London, NW10 8TZ',
        address: 'UPRN',
        coordinates: {
          latitude: 51.550738,
          longitude: -0.257635
        }
      }
    ]
  }

  const mockOrgOne = {
    id: '',
    enabled: true,
    firstname: 'John',
    lastname: 'Smith',
    emails: ['matthew.pepper@gmail.com'],
    mobilePhones: ['07343454590'],
    homePhones: ['01475721535'],
    language: 'EN',
    additionals: [
      {
        id: 'organisation',
        value: {
          name: 'THE 123 GROUP LIMITED',
          address: 'Boulton House 17-21 Chorlton Street, Manchester, M1 3HY',
          compHouseNum: '05897191',
          emergencySector: false,
          isAdminRegistering: true,
          alternativeContact: {
            firstName: 'Julia Joyce',
            lastName: 'Breen',
            email: 'julia@email.com',
            telephone: '01339944433',
            jobTitle: 'Director'
          }
        }
      },
      { id: 'signUpComplete', value: false }
    ],
    unverified: {
      emails: [],
      mobilePhones: [],
      homePhones: []
    },
    pois: [
      {
        name: 'Big Ben, London, SW1A 0AA',
        address: 'UPRN',
        coordinates: {
          latitude: 51.5007,
          longitude: 0.1246
        }
      },
      {
        name: 'Kingfisher Way, London, NW10 8TZ',
        address: 'UPRN',
        coordinates: {
          latitude: 51.550738,
          longitude: -0.257635
        }
      }
    ]
  }

  function mockSession (profile) {
    if (mockSessionActive === false) {
      const authToken = 'MockAuthToken'
      const contactPreferences = ['Text']
      const registrations = {
        partner: {
          id: '4',
          name: 'NWS England',
          description: 'We work to create better places for people and...',
          longName: 'Environment Agency - England',
          logoUrl: 'logo.png',
          backgroundUrl: 'http://assets.gov.uk',
          urlSlug: 'england'
        },
        registrationDate: '1683741990',
        params: {
          channelVoiceEnabled: true,
          channelSmsEnabled: true,
          channelEmailEnabled: true,
          partnerCanView: false,
          partnerCanEdit: false,
          categories: [
            {
              domain: 'NFWS',
              code: 'FLOOD_ALERT'
            },
            {
              domain: 'NFWS',
              code: 'FLOOD_WARNING'
            },
            {
              domain: 'NFWS',
              code: 'SEVERE_FLOOD_WARNING'
            }
          ]
        }
      }

      dispatch(setAuthToken(authToken))
      dispatch(setRegistrations(registrations))
      dispatch(setContactPreferences(contactPreferences))
      dispatch(setProfile(profile))
      setmockSessionActive(true)
    } else {
      dispatch(clearAuth())
      setmockSessionActive(false)
    }
  }

  function mockEmptyProfileWithNoAuthentication () {
    if (!emptyProfileActive) {
      const emptyProfile = {
        id: '',
        enabled: true,
        firstname: '',
        lastname: '',
        emails: [],
        mobilePhones: [],
        homePhones: [],
        language: 'EN', // [TODO] is this always english?
        additionals: [],
        unverified: {
          emails: [],
          mobilePhones: [],
          homePhones: []
        },
        pois: []
      }

      dispatch(setProfile(emptyProfile))
    } else {
      dispatch(clearAuth())
    }
  }

  return (
    <>
      <div className='govuk-width-container'>
        <main className='govuk-main-wrapper govuk-!-padding-top-4'>
          <div className='govuk-grid-row'>
            <div className='govuk-grid-column-two-thirds'>
              <h1 className='govuk-heading-xl'>Next Warning Service Index</h1>
              <NotificationBanner
                className='govuk-notification-banner govuk-notification-banner--success'
                title='Empty profile'
                text={emptyProfileActive ? 'Active' : 'Not Active'}
              />
              <Button
                className='govuk-button'
                text='Activate/Deactivate Empty profile - Used for sign up tests'
                onClick={() => {
                  setEmptyProfileActive(!emptyProfileActive)
                  mockEmptyProfileWithNoAuthentication()
                }}
              />
              <br />

              <p className='govuk-body'>A quick link to each page:</p>
              <ul className='govuk-list'>
                <li>
                  <Link to='/' className='govuk-link'>
                    Start page
                  </Link>
                </li>
                <br />
                Citizen:
                <li>
                  &emsp;
                  <Link to='/signin' className='govuk-link'>
                    Sign in page
                  </Link>
                </li>
                <li>
                  &emsp;
                  <Link to='/signup' className='govuk-link'>
                    Sign up page
                  </Link>
                </li>
                <br />
                Organisation:
                <li>
                  &emsp;
                  <Link to='/organisation/sign-up' className='govuk-link'>
                    Register
                  </Link>
                </li>
              </ul>

              <p className='govuk-body'>
                A session is required to access the below pages - click below to
                start/kill the mock session
              </p>
              <br />
              <NotificationBanner
                className='govuk-notification-banner govuk-notification-banner--success'
                title='Mock session'
                text={mockSessionActive ? 'Active' : 'Not Active'}
              />
              <Button
                className='govuk-button'
                text='Activate/Deactivate Mock Session 1'
                onClick={() => mockSession(mockOne)}
              />
              <Button
                className='govuk-button'
                text='Activate/Deactivate Mock Session 2'
                onClick={() => mockSession(mockTwo)}
              />
              <Button
                className='govuk-button'
                text='Activate/Deactivate Mock Session 3'
                onClick={() => mockSession(mockThree)}
              />
              <Button
                className='govuk-button'
                text='Activate/Deactivate Mock Org Session 1'
                onClick={() => mockSession(mockOrgOne)}
              />
              <ul className='govuk-list'>
                <li>
                  <Link to='/home' className='govuk-link'>
                    Home page
                  </Link>
                </li>
                <li>
                  <Link to='/managecontacts' className='govuk-link'>
                    Manage Contacts page
                  </Link>
                </li>
                <li>
                  <Link to='/signup/review' className='govuk-link'>
                    Sign up review
                  </Link>
                </li>
                <li>
                  <Link to='/organisation/home' className='govuk-link'>
                    Organisation home page
                  </Link>
                </li>
                <li>
                  <Link
                    to='/organisation/manage-locations/add'
                    className='govuk-link'
                  >
                    Organisation add location
                  </Link>
                </li>
                <li>
                  <Link
                    to='/organisation/sign-up/review'
                    className='govuk-link'
                  >
                    Sign up organisation review
                  </Link>
                </li>
                <li>
                  <Link
                    to='/organisation/manage-locations/add/optional-location-info'
                    className='govuk-link'
                  >
                    add location information
                  </Link>
                </li>
                <li>
                  <Link
                    to='/organisation/manage-locations/add/name'
                    className='govuk-link'
                  >
                    location already exists
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
