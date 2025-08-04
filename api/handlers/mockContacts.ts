const contacts = [
  {
    id: '1',
    enabled: true,
    firstname: 'John',
    lastname: 'Smith',
    emails: ['matthew.pepper@gmail.com', 'perry.pepper@gmail.com'],
    mobilePhones: ['07343454590', '07889668367'],
    homePhones: ['01475721535'],
    language: 'EN',
    position: '',
    unit: '',
    service: '',
    comments: '',
    additionals: [
      { id: 'signupComplete', value: { s: '' } },
      { id: 'lastAccessedUrl', value: { s: '' } },
      { id: 'businessName', value: { s: '' } },
      { id: 'jobTitle', value: { s: '' } },
      { id: 'keywords', value: { s: '[]' } }
    ],
    metadata: {
      _Class: '',
      workspaceID: 1,
      workspaceName: ''
    },
    pois: [
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
        additionals: [
          {
            id: 'other',
            value: {
              s: JSON.stringify({
                alertTypes: ['ALERT_LVL_3', 'ALERT_LVL_2', 'ALERT_LVL_1']
              })
            }
          }
        ]
      }
    ],
    role: 'ADMIN',
    pendingRole: null
  },
  {
    id: '2',
    enabled: true,
    firstname: 'Mary',
    lastname: 'Pepper',
    emails: [],
    mobilePhones: ['07343454590'],
    homePhones: [],
    language: 'EN',
    position: null,
    unit: null,
    service: null,
    comments: null,
    additionals: [
      { id: 'lastAccessedUrl', value: { s: '/signup/accountname/add' } },
      { id: 'signupComplete', value: { s: 'true' } },
      { id: 'businessName', value: { s: 'thatOne' } },
      { id: 'jobTitle', value: { s: '' } },
      { id: 'keywords', value: { s: '[]' } }
    ],
    unverified: {
      homePhones: [{ address: '01475721535' }]
    },
    metatdata: null,
    pois: null,
    role: null,
    pendingRole: 'ADMIN'
  },
  {
    id: '3',
    enabled: true,
    firstname: 'Amanda',
    lastname: 'Jordan',
    emails: ['amanda.jordan@gmail.com'],
    mobilePhones: ['07343454590', '07889668367'],
    homePhones: ['01475721535'],
    language: 'EN',
    position: null,
    unit: null,
    service: null,
    comments: null,
    additionals: [
      { id: 'lastAccessedUrl', value: { s: '/signup/accountname/add' } },
      { id: 'signupComplete', value: { s: 'true' } },
      { id: 'businessName', value: { s: 'thatOne' } },
      { id: 'jobTitle', value: { s: 'Regional Manager' } },
      { id: 'keywords', value: { s: '[]' } }
    ],
    unverified: {
      homePhones: [{ address: '01475721535' }]
    },
    metatdata: null,
    pois: null,
    role: null,
    pendingRole: null
  },
  {
    id: '4',
    enabled: true,
    firstname: 'Steve',
    lastname: 'Binns',
    emails: ['steve.binns@gmail.com', 'steven.binns@gmail.com'],
    mobilePhones: ['07343454590', '07889668367'],
    homePhones: ['01475721535'],
    language: 'EN',
    position: null,
    unit: null,
    service: null,
    comments: 'Steven binns is the admin',
    additionals: [
      { id: 'lastAccessedUrl', value: { s: '/signup/accountname/add' } },
      { id: 'signupComplete', value: { s: 'true' } },
      { id: 'businessName', value: { s: 'thatOne' } },
      { id: 'jobTitle', value: { s: 'Site Manager' } },
      { id: 'keywords', value: { s: '["Team 2", "Team 3"]' } }
    ],
    unverified: {
      homePhones: [{ address: '01475721535' }]
    },
    metatdata: null,
    pois: null,
    role: 'ADMIN',
    pendingRole: null
  },
  {
    id: '5',
    enabled: true,
    firstname: 'Stephanie',
    lastname: 'Beach',
    emails: ['stephanie.beach@gmail.com', 'steph.beach@gmail.com'],
    mobilePhones: ['07343454590', '07889668367'],
    homePhones: ['01475721535'],
    language: 'EN',
    position: null,
    unit: null,
    service: null,
    comments: 'This is a comment',
    additionals: [
      { id: 'lastAccessedUrl', value: { s: '/signup/accountname/add' } },
      { id: 'signupComplete', value: { s: 'true' } },
      { id: 'businessName', value: { s: 'thatOne' } },
      { id: 'jobTitle', value: { s: 'Operations Director' } },
      { id: 'keywords', value: { s: '["Team 1", "Team 2"]' } }
    ],
    unverified: {
      homePhones: [{ address: '01475721535' }]
    },
    metatdata: null,
    pois: null,
    role: null,
    pendingRole: 'ADMIN'
  }
]

module.exports = {
  allContacts: contacts
}
