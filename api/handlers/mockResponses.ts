const citizenContactAdditionals = [
  { id: 'signupComplete', value: { s: '' } },
  { id: 'lastAccessedUrl', value: { s: '' } },
  { id: 'businessName', value: { s: '' } },
  { id: 'jobTitle', value: { s: '' } },
  { id: 'keywords', value: { s: '[]' } }
]

const orgContactAdditionals = [
  { id: 'signupComplete', value: { s: '' } },
  { id: 'lastAccessedUrl', value: { s: '' } },
  { id: 'businessName', value: { s: '' } },
  { id: 'jobTitle', value: { s: '' } },
  { id: 'keywords', value: { s: '[]' } }
]

const locationAdditionals = [
  { id: 'locationName', value: { s: '' } },
  { id: 'parentID', value: { s: '' } },
  { id: 'targetAreas', value: { s: '' } },
  { id: 'keywords', value: { s: '[]' } },
  {
    id: 'other',
    value: {
      s: JSON.stringify({
        alertTypes: ['ALERT_LVL_3', 'ALERT_LVL_2', 'ALERT_LVL_1']
      })
    }
  }
]

const citizenPOIs = [
  // below is a location added that lies within a flood area
  {
    name: '10023463293',
    address: 'House Of Commons, Houses Of Parliament, London,  SW1A 0AA',
    coordinates: {
      latitude: '51499841.5',
      longitude: '-012463770.0'
    },
    id: '1',
    enabled: true,
    geometry: { geoJson: '' },
    geocode: '',
    metadata: { nbAttachedContacts: 0 },
    additionals: [
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            alertTypes: ['ALERT_LVL_3', 'ALERT_LVL_2', 'ALERT_LVL_1'],
            targetAreas: [
              {
                TA_CODE: '063FWT23WestminA',
                TA_Name:
                  'Tidal Thames from Blackfriars Bridge to Vauxhall Bridge',
                category: 'Flood Warning'
              },
              {
                TA_CODE: '063WAT23Central',
                TA_Name:
                  'Tidal Thames riverside from the Thames Barrier to Putney Bridge',
                category: 'Flood alert'
              },
              {
                TA_CODE: '063WAT232N',
                TA_Name:
                  'Tidal Thames in the boroughs of Tower Hamlets, City of London, City of Westminster, Ken and Chelsea',
                category: 'Flood alert'
              }
            ]
          })
        }
      }
    ]
  },
  // below is a nearby target area added
  {
    name: '',
    address:
      'Town Beck at Ulverston from The Gill downstream to The Ellers area',
    coordinates: {
      latitude: '54194843.0',
      longitude: '-30912570.0'
    },
    id: '1',
    enabled: true,
    geometry: { geoJson: '' },
    geocode: '',
    metadata: { nbAttachedContacts: 0 },
    additionals: [
      {
        id: 'locationName',
        value: { s: '1, Sun Street, Ulverston,  LA12 7BX' }
      },
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            alertTypes: ['ALERT_LVL_2', 'ALERT_LVL_1']
          })
        }
      }
    ]
  }
]

const orgPOI = [
  {
    name: '10023463293',
    address:
      'Royal Mail, Great Yarmouth Delivery Office, 6, North Quay, Great Yarmouth,  NR30 1AA',
    coordinates: {
      latitude: '52612444.5',
      longitude: '1724640.5'
    },
    id: '1',
    enabled: true,
    geometry: { geoJson: '' },
    geocode: '',
    metadata: { nbAttachedContacts: 0 },
    additionals: locationAdditionals
  }
]

const citizenContact = {
  id: '1',
  enabled: true,
  firstname: 'John',
  lastname: 'Smith',
  emails: ['updated.matthew.pepper@gmail.com', 'perry.pepper@gmail.com'],
  mobilePhones: ['07343454590', '07889668367'],
  homePhones: ['01475721535'],
  language: 'EN',
  position: '',
  unit: '',
  service: '',
  comments: '',
  additionals: citizenContactAdditionals,
  metadata: {
    _Class: '',
    workspaceID: 1,
    workspaceName: ''
  },
  pois: citizenPOIs,
  role: 'SELF|ADMIN|READONLY',
  pendingRole: 'SELF|ADMIN|READONLY'
}

const citizenContact2 = {
  id: '1',
  enabled: true,
  firstname: 'John',
  lastname: 'Smith',
  emails: ['matthew.pepper@gmail.com', 'perry.pepper@gmail.com'],
  mobilePhones: ['07343454590', '07889668367'],
  homePhones: ['01475721535'],
  language: 'EN',
  additionals: [
    { id: 'lastAccessedUrl', value: { s: '/signup/accountname/add' } },
    { id: 'signupComplete', value: { s: 'true' } }
  ],
  unverified: {
    homePhones: [{ address: '01475721535' }]
  },
  pois: [
    {
      address:
        'Royal Mail, Great Yarmouth Delivery Office, 6, North Quay, Great Yarmouth,  NR30 1AA',
      name: '10023463293',
      coordinates: {
        latitude: '52612444.5',
        longitude: '1724640.5'
      },
      additionals: [
        {
          id: 'other',
          value: {
            s: JSON.stringify({
              alertTypes: [
                'ALERT_LVL_1',
                'ALERT_LVL_2',
                'ALERT_LVL_3',
                'INFO', // info alert type required on all citizen locations
                'MONTHLY', // remove severe warning
                'RESEVERVED' // remove flood warning
              ]
            })
          }
        }
      ]
    },
    {
      address: 'Exmouth, United Kingdom',
      name: '',
      coordinates: {
        latitude: '50621091',
        longitude: '-3412665'
      },
      additionals: [
        {
          id: 'other',
          value: {
            s: JSON.stringify({
              // this location should have flood alerts turned off in the optional setting on view location
              alertTypes: [
                'ALERT_LVL_1',
                'ALERT_LVL_2',
                'INFO',
                'MONTHLY',
                'RESEVERVED'
              ]
            })
          }
        }
      ]
    }
  ]
}

const registrations = {
  partner: {
    id: '4',
    name: 'NWS England',
    description: 'We work to create better places for people and...',
    longName: 'Environment Agency - England',
    logoUrl: 'logo.png',
    backgroundUrl: 'https://assets.gov.uk',
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

const organization = {
  id: '13',
  name: 'Flood Inc.',
  description: JSON.stringify({
    name: 'Flood Inc.',
    address: '1 ALL SAINTS HOUSE, THE CAUSEWAY, MARLOW, SL7 2AA',
    compHouseNum: '787878',
    emergencySector: true,
    isAdminRegistering: true,
    alternativeContact: {
      firstName: 'Joan',
      lastName: 'Smith',
      email: 'j.smith@floodinc.com',
      telephone: '02071739372',
      jobTitle: 'IT Director'
    }
  }),
  postalCode: '',
  longName: '',
  logoUrl: '',
  backgroundUrl: '',
  alertDiffusionZone: {
    rings: {
      points: [{ latitude: 0, longitude: 0 }]
    },
    circles: {
      center: { latitude: 0, longitude: 0 },
      radius: 0,
      angleStart: 0,
      angleEnd: 0
    },
    polygons: {
      boundary: {
        points: [{ latitude: 0, longitude: 0 }]
      },
      holes: [
        {
          points: [{ latitude: 0, longitude: 0 }]
        }
      ]
    }
  },
  alertDiffusionZoneBoundingBox: {
    southWest: { latitude: 0, longitude: 0 },
    northEast: { latitude: 0, longitude: 0 }
  },
  urlSlug: ''
}

module.exports = {
  citizenProfile: citizenContact,
  citizenProfile2: citizenContact2,
  registrations: registrations,
  organization: organization
}
