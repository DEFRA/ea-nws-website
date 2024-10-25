

  const contactAdditionals = [{id: '', value: {s: ''}}]
  const locationAdditionals = [{id: '', value: {s: ''}}]

  const POIs = [{
    name: '10023463293',
  address: 'Royal Mail, Great Yarmouth Delivery Office, 6, North Quay, Great Yarmouth,  NR30 1AA',
  coordinates: {
    latitude: '52612444.5',
    longitude: '1724640.5'
  },
  id: '1',
  enabled: true,
  geometry: {geoJson: ''},
  geocode: '',
  metadata: {nbAttachedContacts: 0},
  additionals: locationAdditionals
  }]
  
  const CONTACT = {
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
  additionals: contactAdditionals,
  unverified: {
    emails: [{address: ''}],
    mobilePhones: [{address: ''}],
    homePhones: [{address: ''}],
  },
  metadata: {
    _Class: '', 
    workspaceID: 1, 
    workspaceName: ''
  },

  pois: POIs,
  role: 'SELF|ADMIN|READONLY',
  pendingRole: 'SELF|ADMIN|READONLY'

  }

  module.exports = {
    profile: CONTACT
  }