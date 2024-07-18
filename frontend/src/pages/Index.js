import * as React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '../gov-uk-components/Button'
import NotificationBanner from '../gov-uk-components/NotificationBanner'
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

  const mockOne = {
    id: '',
    enabled: true,
    firstname: 'John',
    lastname: 'Smith',
    emails: ['matthew.pepper@gmail.com', 'perry.pepper@gmail.com'],
    mobilePhones: ['07343 454590', '07889 668367'],
    homePhones: ['01475 721535'],
    language: 'EN',
    additionals: [],
    unverified: {
      emails: [],
      mobilePhones: [],
      homePhones: []
    },
    pois: [
      {
        address: 'Exeter, Royaume-Uni',
        coordinates: {
          latitude: 51.4998415,
          longitude: -0.1246377
        }
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
    additionals: [],
    unverified: {
      emails: [],
      mobilePhones: [],
      homePhones: []
    },
    pois: [
      {
        address: 'Exeter, Royaume-Uni',
        coordinates: {
          latitude: 50726037,
          longitude: -3527489
        }
      },
      {
        address: 'Exeter, Royaume-Uni',
        coordinates: {
          latitude: 50726037,
          longitude: -3527489
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
    additionals: [],
    unverified: {
      emails: [],
      mobilePhones: [],
      homePhones: []
    },
    pois: [
      {
        address: 'Exeter, Royaume-Uni',
        coordinates: {
          latitude: 50726037,
          longitude: -3527489
        }
      },
      {
        address: 'Exeter, Royaume-Uni',
        coordinates: {
          latitude: 50726037,
          longitude: -3527489
        }
      },
      {
        address: 'Exeter, Royaume-Uni',
        coordinates: {
          latitude: 50726037,
          longitude: -3527489
        }
      },
      {
        address: 'Exeter, Royaume-Uni',
        coordinates: {
          latitude: 50726037,
          longitude: -3527489
        }
      },
      {
        address: 'Exeter, Royaume-Uni',
        coordinates: {
          latitude: 50726037,
          longitude: -3527489
        }
      },
      {
        address: 'Exeter, Royaume-Uni',
        coordinates: {
          latitude: 50726037,
          longitude: -3527489
        }
      },
      {
        address: 'Exeter, Royaume-Uni',
        coordinates: {
          latitude: 50726037,
          longitude: -3527489
        }
      },
      {
        address: 'Exeter, Royaume-Uni',
        coordinates: {
          latitude: 50726037,
          longitude: -3527489
        }
      },
      {
        address: 'Exeter, Royaume-Uni',
        coordinates: {
          latitude: 50726037,
          longitude: -3527489
        }
      },
      {
        address: 'Exeter, Royaume-Uni',
        coordinates: {
          latitude: 50726037,
          longitude: -3527489
        }
      },
      {
        address: 'Exeter, Royaume-Uni',
        coordinates: {
          latitude: 50726037,
          longitude: -3527489
        }
      },
      {
        address: 'Exeter, Royaume-Uni',
        coordinates: {
          latitude: 50726037,
          longitude: -3527489
        }
      }
    ]
  }
  
  function mockSession () {
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
      const profile = {
        id: '',
        enabled: true,
        firstName: 'John',
        lastName: 'Smith',
        emails: ['matthew.pepper@gmail.com', 'perry.pepper@gmail.com'],
        mobilePhones: ['07343 454590', '07889 668367'],
        homePhones: ['01475 721535'],
        language: 'EN',
        additionals: [],
        unverified: {
          emails: [],
          mobilePhones: [],
          homePhones: []
        },
        pois: [
          {
            address: 'Exeter, Royaume-Uni',
            coordinates: {
              latitude: 50726037,
              longitude: -3527489
            }
          }
        ]
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

  return (
    <>
      <div className='govuk-width-container'>
        <main className='govuk-main-wrapper'>
          <div className='govuk-grid-row'>
            <div className='govuk-grid-column-two-thirds'>
              <h1 className='govuk-heading-xl'>Next Warning Service Index</h1>
              <NotificationBanner
                className='govuk-notification-banner govuk-notification-banner--success'
                title='Mock session'
                text={mockSessionActive ? 'Active' : 'Not Active'}
              />
              <p className='govuk-body'>A quick link to each page</p>
              <ul className='govuk-list'>
                <li>
                  <Link to='/' className='govuk-link'>
                    Start page
                  </Link>
                </li>
                <li>
                  <Link to='/signin' className='govuk-link'>
                    Sign in page
                  </Link>
                </li>
                <li>
                  <Link to='/signup' className='govuk-link'>
                    Sign up page
                  </Link>
                </li>
              </ul>

              <p className='govuk-body'>
                A session is required to access the below pages - click below to
                start/kill the mock session
              </p>
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
              </ul>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
