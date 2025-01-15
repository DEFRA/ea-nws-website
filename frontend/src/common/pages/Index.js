import * as React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '../components/gov-uk/Button'
import NotificationBanner from '../components/gov-uk/NotificationBanner'
import AlertType from '../enums/AlertType'
import {
  clearAuth,
  setAuthToken,
  setContactPreferences,
  setContacts,
  setCurrentLocation,
  setCurrentLocationCoordinates,
  setCurrentLocationEasting,
  setCurrentLocationNorthing,
  setLocationBoundaries,
  setOrgId,
  setProfile,
  setRegistrations,
  setSelectedBoundary,
  setSelectedBoundaryType,
  setSigninType
} from '../redux/userSlice'
import { backendCall } from '../services/BackendService'

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
    additionals: [{ id: 'signupComplete', value: { s: 'true' } }],
    pois: [
      {
        id: 1,
        name: '12094563',
        address: 'House Of Commons, Houses Of Parliament, London, SW1A 0AA',
        coordinates: {
          latitude: 51.4998415,
          longitude: -0.1246377
        },
        additionals: [
          {
            id: 'other',
            value: {
              s: JSON.stringify({
                alertTypes: [
                  AlertType.SEVERE_FLOOD_WARNING,
                  AlertType.FLOOD_WARNING,
                  AlertType.FLOOD_ALERT
                ]
              })
            }
          }
        ]
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
    additionals: [{ id: 'signupComplete', value: { s: 'true' } }],
    pois: [
      {
        address: 'Big Ben, London, SW1A 0AA',
        name: 'UPRN',
        coordinates: {
          latitude: 51.5007,
          longitude: 0.1246
        }
      },
      {
        address: 'Kingfisher Way, London, NW10 8TZ',
        name: 'UPRN',
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
    additionals: [{ id: 'signupComplete', value: { s: 'true' } }],
    pois: [
      {
        address: 'Big Ben, London, SW1A 0AA',
        name: 'UPRN',
        coordinates: {
          latitude: 51.5007,
          longitude: 0.1246
        }
      },
      {
        address: 'Kingfisher Way, London, NW10 8TZ',
        name: 'UPRN',
        coordinates: {
          latitude: 51.550738,
          longitude: -0.257635
        }
      },
      {
        address: 'Big Ben, London, SW1A 0AA',
        name: 'UPRN',
        coordinates: {
          latitude: 51.5007,
          longitude: 0.1246
        }
      },
      {
        address: 'Kingfisher Way, London, NW10 8TZ',
        name: 'UPRN',
        coordinates: {
          latitude: 51.550738,
          longitude: -0.257635
        }
      },
      {
        address: 'Big Ben, London, SW1A 0AA',
        name: 'UPRN',
        coordinates: {
          latitude: 51.5007,
          longitude: 0.1246
        }
      },
      {
        address: 'Kingfisher Way, London, NW10 8TZ',
        name: 'UPRN',
        coordinates: {
          latitude: 51.550738,
          longitude: -0.257635
        }
      },
      {
        address: 'Big Ben, London, SW1A 0AA',
        name: 'UPRN',
        coordinates: {
          latitude: 51.5007,
          longitude: 0.1246
        }
      },
      {
        address: 'Kingfisher Way, London, NW10 8TZ',
        name: 'UPRN',
        coordinates: {
          latitude: 51.550738,
          longitude: -0.257635
        }
      },
      {
        address: 'Big Ben, London, SW1A 0AA',
        name: 'UPRN',
        coordinates: {
          latitude: 51.5007,
          longitude: 0.1246
        }
      },
      {
        address: 'Kingfisher Way, London, NW10 8TZ',
        name: 'UPRN',
        coordinates: {
          latitude: 51.550738,
          longitude: -0.257635
        }
      },
      {
        address: 'Big Ben, London, SW1A 0AA',
        name: 'UPRN',
        coordinates: {
          latitude: 51.5007,
          longitude: 0.1246
        }
      },
      {
        address: 'Kingfisher Way, London, NW10 8TZ',
        name: 'UPRN',
        coordinates: {
          latitude: 51.550738,
          longitude: -0.257635
        }
      },
      {
        address: 'Big Ben, London, SW1A 0AA',
        name: 'UPRN',
        coordinates: {
          latitude: 51.5007,
          longitude: 0.1246
        }
      },
      {
        address: 'Kingfisher Way, London, NW10 8TZ',
        name: 'UPRN',
        coordinates: {
          latitude: 51.550738,
          longitude: -0.257635
        }
      },
      {
        address: 'Big Ben, London, SW1A 0AA',
        name: 'UPRN',
        coordinates: {
          latitude: 51.5007,
          longitude: 0.1246
        }
      },
      {
        address: 'Kingfisher Way, London, NW10 8TZ',
        name: 'UPRN',
        coordinates: {
          latitude: 51.550738,
          longitude: -0.257635
        }
      }
    ]
  }

  const mockOrgOne = {
    id: '1',
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
          s: JSON.stringify({
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
          })
        }
      },
      { id: 'signupComplete', value: { s: 'false' } }
    ],
    pois: [
      {
        id: '1',
        address: 'Big Ben, London, SW1A 0AA',
        name: 'UPRN',
        coordinates: {
          latitude: 51.5007,
          longitude: 0.1246
        }
      },
      {
        id: '2',
        address: 'Kingfisher Way, London, NW10 8TZ',
        name: 'UPRN',
        coordinates: {
          latitude: 51.550738,
          longitude: -0.257635
        }
      }
    ]
  }

  function uuidv4 () {
    return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) =>
      (
        +c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
      ).toString(16)
    )
  }

  const mockContacts = [
    {
      name: 'Steve Binns',
      job_title: 'Regional Manager',
      email: 'steve.binns@company.com',
      linked_locations: ['Loc_1'],
      keywords: []
    },
    {
      name: 'Greg Swordy',
      job_title: 'Site Manager',
      email: 'greg.swordy@company.com',
      linked_locations: ['Loc_1', 'Loc_2'],
      keywords: ['Team 3', 'Team 4']
    },
    {
      name: 'Stephanie Two',
      job_title: 'Operations Director',
      email: 'stephanie.beach@company.com',
      linked_locations: ['Loc_1', 'Loc_2'],
      keywords: ['Team 1']
    },
    {
      name: 'Mary Two',
      job_title: 'Regional Manager',
      email: 'mary.pepper@company.com',
      linked_locations: [],
      keywords: ['Team 1', 'Team 2']
    },
    {
      name: 'Amanda Two',
      job_title: 'Regional Manager',
      email: 'amanda.jordan@company.com',
      linked_locations: ['Loc_3', 'Loc_4'],
      keywords: ['Team 1', 'Team 3']
    },
    {
      name: 'Steve Two',
      job_title: 'Regional Manager',
      email: 'steve.binns@company.com',
      linked_locations: ['Loc_1'],
      keywords: []
    },
    {
      name: 'Greg Two',
      job_title: 'Site Manager',
      email: 'greg.swordy@company.com',
      linked_locations: ['Loc_1', 'Loc_2'],
      keywords: ['Team 3', 'Team 4']
    },
    {
      name: 'Stephanie Three',
      job_title: 'Operations Director',
      email: 'stephanie.beach@company.com',
      linked_locations: ['Loc_1', 'Loc_2'],
      keywords: ['Team 1']
    },
    {
      name: 'Mary Three',
      job_title: 'Regional Manager',
      email: 'mary.pepper@company.com',
      linked_locations: [],
      keywords: ['Team 1', 'Team 2']
    },
    {
      name: 'Amanda Three',
      job_title: 'Regional Manager',
      email: 'amanda.jordan@company.com',
      linked_locations: ['Loc_3', 'Loc_4'],
      keywords: ['Team 1', 'Team 3']
    },
    {
      name: 'Steve Three',
      job_title: 'Regional Manager',
      email: 'steve.binns@company.com',
      linked_locations: ['Loc_1'],
      keywords: []
    },
    {
      name: 'Greg Three',
      job_title: 'Site Manager',
      email: 'greg.swordy@company.com',
      linked_locations: ['Loc_1', 'Loc_2'],
      keywords: ['Team 3', 'Team 4']
    },
    {
      name: 'Stephanie Four',
      job_title: 'Operations Director',
      email: 'stephanie.beach@company.com',
      linked_locations: ['Loc_1', 'Loc_2'],
      keywords: ['Team 1']
    },
    {
      name: 'Mary Four',
      job_title: 'Regional Manager',
      email: 'mary.pepper@company.com',
      linked_locations: [],
      keywords: ['Team 1', 'Team 5']
    },
    {
      name: 'Amanda Three',
      job_title: 'Regional Manager',
      email: 'amanda.jordan@company.com',
      linked_locations: ['Loc_3', 'Loc_4'],
      keywords: ['Team 1', 'Team 6']
    },
    {
      name: 'Steve Four',
      job_title: 'Regional Manager',
      email: 'steve.binns@company.com',
      linked_locations: ['Loc_1'],
      keywords: []
    },
    {
      name: 'Greg Four',
      job_title: 'Site Manager',
      email: 'greg.swordy@company.com',
      linked_locations: ['Loc_1', 'Loc_2'],
      keywords: ['Team 3', 'Team 4']
    },
    {
      name: 'Stephanie Five',
      job_title: 'Operations Director',
      email: 'stephanie.beach@company.com',
      linked_locations: ['Loc_1', 'Loc_2'],
      keywords: ['Team 1']
    },
    {
      name: 'Mary Five',
      job_title: 'Regional Manager',
      email: 'mary.pepper@company.com',
      linked_locations: [],
      keywords: ['Team 1', 'Team 2']
    },
    {
      name: 'Amanda Five',
      job_title: 'Regional Manager',
      email: 'amanda.jordan@company.com',
      linked_locations: ['Loc_3', 'Loc_4'],
      keywords: ['Team 1', 'Team 3']
    },
    {
      name: 'Steve Five',
      job_title: 'Regional Manager',
      email: 'steve.binns@company.com',
      linked_locations: ['Loc_1'],
      keywords: []
    },
    {
      name: 'Greg Five',
      job_title: 'Site Manager',
      email: 'greg.swordy@company.com',
      linked_locations: ['Loc_1', 'Loc_2'],
      keywords: ['Team 3', 'Team 4']
    }
  ]

  const mockCurrentLocation = {
    id: null,
    enabled: true,
    // name is the UPRN
    name: null,
    // address is the human readable address or flood area name
    address: null,
    // Coordinates in dd (degrees decimal)
    coordinates: null,
    geometry: null,
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: '' } },
      { id: 'parentID', value: { s: '' } },
      { id: 'targetAreas', value: { s: '' } },
      { id: 'keywords', value: { s: '[]' } },
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            full_address: null,
            postcode: null,
            // Easting EPSG: 27700
            x_coordinate: null,
            // Northing EPSG: 27700
            y_coordinate: null,
            internal_reference: null,
            business_criticality: null,
            location_type: null,
            action_plan: null,
            notes: null,
            location_data_type: null,
            alertTypes: null
          })
        }
      }
    ]
  }

  function mockSession (profile, type) {
    if (mockSessionActive === false) {
      const authToken = uuidv4()
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
          channelMobileAppEnabled: false,
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

      if (type === 'org') {
        ;(async () => {
          const dataToSend = {
            signinToken: uuidv4(),
            code: 123456,
            signinType: 'org'
          }

          await backendCall(dataToSend, 'api/sign_in_validate')
        })()
        dispatch(setSigninType('org'))
      }

      dispatch(setAuthToken(authToken))
      dispatch(setRegistrations(registrations))
      dispatch(setContactPreferences(contactPreferences))
      dispatch(setProfile(profile))
      dispatch(setCurrentLocation(mockCurrentLocation))
      const coordinates = { latitude: 50.84106, longitude: -1.05814 }
      dispatch(setCurrentLocationCoordinates(coordinates))
      dispatch(setSelectedBoundaryType(null))
      dispatch(setSelectedBoundary(null))
      dispatch(setLocationBoundaries([]))
      dispatch(setContacts(mockContacts))
      dispatch(setOrgId('1'))
      dispatch(setCurrentLocationEasting('520814'))
      dispatch(setCurrentLocationNorthing('185016'))
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
                onClick={() => mockSession(mockOne, 'citizen')}
              />
              <Button
                className='govuk-button'
                text='Activate/Deactivate Mock Session 2'
                onClick={() => mockSession(mockTwo, 'citizen')}
              />
              <Button
                className='govuk-button'
                text='Activate/Deactivate Mock Session 3'
                onClick={() => mockSession(mockThree, 'citizen')}
              />
              <Button
                className='govuk-button'
                text='Activate/Deactivate Mock Org Session 1'
                onClick={() => mockSession(mockOrgOne, 'org')}
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
                    to='/organisation/manage-locations/add/optional-address/info'
                    className='govuk-link'
                  >
                    add location information
                  </Link>
                </li>
                <li>
                  <Link
                    to='/organisation/manage-locations/edit/search-options'
                    className='govuk-link'
                  >
                    edit locations xy coordinates
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
