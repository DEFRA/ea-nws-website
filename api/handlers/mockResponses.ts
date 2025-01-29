

const citizenContactAdditionals = [
  { id: 'signupComplete', value: { s: '' } },
  { id: 'lastAccessedUrl', value: { s: '' } },
  { id: 'businessName', value: { s: '' } },
  { id: 'jobTitle', value: { s: '' } },
  { id: 'keywords', value: { s: '[]' } },
]

const orgContactAdditionals = [
  { id: 'signupComplete', value: { s: '' } },
  { id: 'lastAccessedUrl', value: { s: '' } },
  { id: 'businessName', value: { s: '' } },
  { id: 'jobTitle', value: { s: '' } },
  { id: 'keywords', value: { s: '[]' } },
]

const locationAdditionals = [
  { id: 'locationName', value: { s: '' } },
  { id: 'parentID', value: { s: '' } },
  { id: 'targetAreas', value: { s: '' } },
  { id: 'keywords', value: { s: '[]' } },
  { id: 'other', value: { s: '' } },
]

const citizenPOIs = [{
  name: '10023463293',
  address: 'Royal Mail, Great Yarmouth Delivery Office, 6, North Quay, Great Yarmouth,  NR30 1AA',
  coordinates: {
    latitude: '52612444.5',
    longitude: '1724640.5'
  },
  id: '1',
  enabled: true,
  geometry: { geoJson: '' },
  geocode: '',
  metadata: { nbAttachedContacts: 0 },
  additionals: []
}]

const orgPOI = [{
  name: '10023463293',
  address: 'Royal Mail, Great Yarmouth Delivery Office, 6, North Quay, Great Yarmouth,  NR30 1AA',
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
}]

const citizenContact = {
  id: '1',
  enabled: true,
  firstname: 'John',
  lastname: 'Smith',
  emails: [
    'updated.matthew.pepper@gmail.com',
    'perry.pepper@gmail.com'
  ],
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
  firstname: '',
  lastname: '',
  emails: ['matthew.pepper@gmail.com', 'perry.pepper@gmail.com'],
  mobilePhones: ['07343454590', '07889668367'],
  homePhones: ['01475721535'],
  language: 'EN',
  additionals: [{ id: "lastAccessedUrl", value: { s: "/signup/accountname/add" } }, { id: "signupComplete", value: { s: 'true' } }],
  unverified: {
    homePhones: [{ address: '01475721535' }]
  },
  pois: [
    {
      address: 'Royal Mail, Great Yarmouth Delivery Office, 6, North Quay, Great Yarmouth,  NR30 1AA',
      name: '10023463293',
      coordinates: {
        latitude: '52612444.5',
        longitude: '1724640.5'
      }
    },
    {
      address: 'Exmouth, United Kingdom',
      name: '',
      coordinates: {
        latitude: '50621091',
        longitude: '-3412665'
      }
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
  id: '1',
  name: 'Royal Mail',
  description: '',
  postalCode: 'NR30 1AA',
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
      holes:
        [{
          points: [{ latitude: 0, longitude: 0 }]
        }]

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