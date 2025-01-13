const locations = [
  {
    id: '1',
    enabled: true,
    name: 'UPRN',
    address: '34 Hughenden Road, High Wycombe, LE2 7BB',
    coordinates: { latitude: 51.629, longitude: -0.745 },
    geometry: null,
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Location_01 - address variant' } },
      { id: 'parentID', value: { s: '' } },
      { id: 'targetAreas', value: { s: '' } },
      { id: 'keywords', value: { s: '["Midlands"]' } },
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            full_address: 'some address',
            postcode: 'LE2 7BB',
            x_coordinate: 466413.18,
            y_coordinate: 105037.31,
            internal_reference: 'PS01, unit 57, HighW_07',
            business_criticality: 'Medium',
            location_type: 'Office',
            action_plan: '1. Dont panic!',
            notes:
              'John Smith has the flood plane for this location. His contact number is 01234 567 890',
            location_data_type: 'xycoords',
            alertTypes: ['ALERT_LVL_3']
          })
          s: JSON.stringify({
            full_address: 'some address',
            postcode: 'LE2 7BB',
            x_coordinate: 466413.18,
            y_coordinate: 105037.31,
            internal_reference: 'PS01, unit 57, HighW_07',
            business_criticality: 'Medium',
            location_type: 'Office',
            action_plan: '1. Dont panic!',
            notes:
              'John Smith has the flood plan for this location. His contact number is 01234 567 890',
            location_data_type: 'xycoords',
            alertTypes: ['ALERT_LVL_3']
          })
        }
      }
    ]
  },
  {
    id: '2',
    enabled: true,
    name: 'UPRN',
    address: 'London',
    coordinates: { latitude: 51.507, longitude: -0.126 },
    geometry: null,
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Location_02 - xy coord variant' } },
      { id: 'parentID', value: { s: '' } },
      { id: 'targetAreas', value: { s: '' } },
      { id: 'keywords', value: { s: '[]' } },
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            full_address: '',
            postcode: '',
            x_coordinate: 329000.58,
            y_coordinate: 478530.6,
            internal_reference: '',
            business_criticality: '',
            location_type: '',
            action_plan: '',
            notes: '',
            location_data_type: 'xycoords',
            alertTypes: ['ALERT_LVL_3', 'ALERT_LVL_2']
          })
        }
      }
    ]
  },
  {
    id: '3',
    enabled: true,
    name: 'UPRN',
    address: 'Brighton',
    coordinates: { latitude: 50.828, longitude: -0.142 },
    geometry: null,
    geocode: null,
    additionals: [
      {
        id: 'locationName',
        value: { s: 'Location_03 - shapefile polygon variant' }
      },
      { id: 'parentID', value: { s: '' } },
      { id: 'targetAreas', value: { s: '' } },
      { id: 'keywords', value: { s: '[]' } },
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            full_address: '',
            postcode: '',
            x_coordinate: '',
            y_coordinate: '',
            internal_reference: '',
            business_criticality: '',
            location_type: '',
            action_plan: '',
            notes: '',
            location_data_type: 'polygon',
            alertTypes: ['ALERT_LVL_3', 'ALERT_LVL_2']
          })
        }
      }
    ]
  },
  {
    id: '4',
    enabled: true,
    name: 'UPRN',
    address: 'Southampton',
    coordinates: { latitude: 50.907, longitude: -1.409 },
    geometry: null,
    geocode: null,
    additionals: [
      {
        id: 'locationName',
        value: { s: 'Location_04 - shapefile line variant' }
      },
      { id: 'parentID', value: { s: '' } },
      { id: 'targetAreas', value: { s: '' } },
      { id: 'keywords', value: { s: '[]' } },
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            full_address: '',
            postcode: '',
            x_coordinate: '',
            y_coordinate: '',
            internal_reference: '',
            business_criticality: '',
            location_type: '',
            action_plan: '',
            notes: '',
            location_data_type: 'line',
            alertTypes: ['ALERT_LVL_3', 'ALERT_LVL_2']
          })
        }
      }
    ]
  },
  {
    id: '5',
    enabled: true,
    name: 'UPRN',
    address: 'Durham',
    coordinates: { latitude: 54.777, longitude: -1.579 },
    geometry: null,
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Location_05 - boundary variant' } },
      { id: 'parentID', value: { s: '' } },
      { id: 'targetAreas', value: { s: '' } },
      { id: 'keywords', value: { s: '["keyword 1", "keyword 2"]' } },
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            full_address: '',
            postcode: '',
            x_coordinate: '',
            y_coordinate: '',
            internal_reference: '',
            business_criticality: '',
            location_type: '',
            action_plan: '',
            notes: '',
            location_data_type: 'boundary',
            alertTypes: ['ALERT_LVL_3', 'ALERT_LVL_2']
          })
        }
      }
    ]
  },
  {
    id: '6',
    enabled: true,
    name: 'UPRN',
    address: 'Milton Keynes',
    coordinates: { latitude: 52.041, longitude: -0.754 },
    geometry: null,
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Location_ID6' } },
      { id: 'parentID', value: { s: '' } },
      { id: 'targetAreas', value: { s: '' } },
      { id: 'keywords', value: { s: '["keywords"]' } },
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'long',
            internal_reference: 'reference',
            business_criticality: 'Low',
            location_type: 'Office',
            action_plan: 'action plan',
            notes: 'some notes',
            location_data_type: 'xycoords',
            alertTypes: []
          })
          s: JSON.stringify({
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'long',
            internal_reference: 'reference',
            business_criticality: 'Low',
            location_type: 'Office',
            action_plan: 'action plan',
            notes: 'some notes',
            location_data_type: 'polygon',
            alertTypes: []
          })
        }
      }
    ]
  },
  {
    id: '7',
    enabled: true,
    name: 'UPRN',
    address: 'Cambridge',
    coordinates: { latitude: 52.197, longitude: 0.133 },
    geometry: null,
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Location_ID7' } },
      { id: 'parentID', value: { s: '' } },
      { id: 'targetAreas', value: { s: '' } },
      { id: 'keywords', value: { s: '["keywords"]' } },
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'long',
            internal_reference: 'reference',
            business_criticality: 'High',
            location_type: 'Warehouse',
            action_plan: 'action plan',
            notes: 'some notes',
            location_data_type: 'xycoords',
            alertTypes: ['ALERT_LVL_2']
          })
          s: JSON.stringify({
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'long',
            internal_reference: 'reference',
            business_criticality: 'High',
            location_type: 'Warehouse',
            action_plan: 'action plan',
            notes: 'some notes',
            location_data_type: 'polygon',
            alertTypes: ['ALERT_LVL_2']
          })
        }
      }
    ]
  },
  {
    id: '8',
    enabled: true,
    name: 'UPRN',
    address: 'Derby',
    coordinates: { latitude: 52.922, longitude: -1.477 },
    geometry: null,
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Location_ID8' } },
      { id: 'parentID', value: { s: '' } },
      { id: 'targetAreas', value: { s: '' } },
      { id: 'keywords', value: { s: '["keywords"]' } },
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'long',
            internal_reference: 'reference',
            business_criticality: 'Medium',
            location_type: 'Retail space',
            action_plan: 'action plan',
            notes: 'some notes',
            location_data_type: 'xycoords',
            alertTypes: ['ALERT_LVL_2', 'ALERT_LVL_3']
          })
          s: JSON.stringify({
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'long',
            internal_reference: 'reference',
            business_criticality: 'Medium',
            location_type: 'Retail space',
            action_plan: 'action plan',
            notes: 'some notes',
            location_data_type: 'polygon',
            alertTypes: ['ALERT_LVL_2', 'ALERT_LVL_3']
          })
        }
      }
    ]
  },
  {
    id: '9',
    enabled: true,
    name: 'UPRN',
    address: 'Sheffield',
    coordinates: { latitude: 53.381, longitude: -1.47 },
    geometry: null,
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Location_ID9' } },
      { id: 'parentID', value: { s: '' } },
      { id: 'targetAreas', value: { s: '' } },
      { id: 'keywords', value: { s: '["keywords"]' } },
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'long',
            internal_reference: 'reference',
            business_criticality: 'Low',
            location_type: 'Warehouse',
            action_plan: 'action plan',
            notes: 'some notes',
            location_data_type: 'xycoords',
            alertTypes: ['ALERT_LVL_2']
          })
          s: JSON.stringify({
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'long',
            internal_reference: 'reference',
            business_criticality: 'Low',
            location_type: 'Warehouse',
            action_plan: 'action plan',
            notes: 'some notes',
            location_data_type: 'polygon',
            alertTypes: ['ALERT_LVL_2']
          })
        }
      }
    ]
  },
  {
    id: '10',
    enabled: true,
    name: 'UPRN',
    address: 'Blackburn',
    coordinates: { latitude: 53.748, longitude: -2.487 },
    geometry: null,
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Location_ID10' } },
      { id: 'parentID', value: { s: '' } },
      { id: 'targetAreas', value: { s: '' } },
      { id: 'keywords', value: { s: '["keywords"]' } },
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'long',
            internal_reference: 'reference',
            business_criticality: 'Medium',
            location_type: 'Office',
            action_plan: 'action plan',
            notes: 'some notes',
            location_data_type: 'xycoords',
            alertTypes: ['ALERT_LVL_2', 'ALERT_LVL_3']
          })
          s: JSON.stringify({
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'long',
            internal_reference: 'reference',
            business_criticality: 'Medium',
            location_type: 'Office',
            action_plan: 'action plan',
            notes: 'some notes',
            location_data_type: 'polygon',
            alertTypes: ['ALERT_LVL_2', 'ALERT_LVL_3']
          })
        }
      }
    ]
  },
  {
    id: '11',
    enabled: true,
    name: 'UPRN',
    address: 'Worcester',
    coordinates: { latitude: 52.193, longitude: -2.22 },
    geometry: null,
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Location_ID11' } },
      { id: 'parentID', value: { s: '' } },
      { id: 'targetAreas', value: { s: '' } },
      { id: 'keywords', value: { s: '["keywords"]' } },
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'long',
            internal_reference: 'reference',
            business_criticality: 'High',
            location_type: 'Warehouse',
            action_plan: 'action plan',
            notes: 'some notes',
            location_data_type: 'xycoords',
            alertTypes: ['ALERT_LVL_3']
          })
          s: JSON.stringify({
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'long',
            internal_reference: 'reference',
            business_criticality: 'High',
            location_type: 'Warehouse',
            action_plan: 'action plan',
            notes: 'some notes',
            location_data_type: 'polygon',
            alertTypes: ['ALERT_LVL_3']
          })
        }
      }
    ]
  },
  {
    id: '12',
    enabled: true,
    name: 'UPRN',
    address: 'Bradford',
    coordinates: { latitude: 53.794, longitude: -1.753 },
    geometry: null,
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Location_ID12' } },
      { id: 'parentID', value: { s: '' } },
      { id: 'targetAreas', value: { s: '' } },
      { id: 'keywords', value: { s: '["keywords"]' } },
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'long',
            internal_reference: 'reference',
            business_criticality: 'Low',
            location_type: 'Retail space',
            action_plan: 'action plan',
            notes: 'some notes',
            location_data_type: 'xycoords',
            alertTypes: ['ALERT_LVL_2']
          })
          s: JSON.stringify({
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'long',
            internal_reference: 'reference',
            business_criticality: 'Low',
            location_type: 'Retail space',
            action_plan: 'action plan',
            notes: 'some notes',
            location_data_type: 'polygon',
            alertTypes: ['ALERT_LVL_2']
          })
        }
      }
    ]
  },
  {
    id: '13',
    enabled: true,
    name: 'UPRN',
    address: 'Leeds',
    coordinates: { latitude: 53.798, longitude: -1.547 },
    geometry: null,
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Location_ID13' } },
      { id: 'parentID', value: { s: '' } },
      { id: 'targetAreas', value: { s: '' } },
      { id: 'keywords', value: { s: '["keywords"]' } },
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'long',
            internal_reference: 'reference',
            business_criticality: 'Medium',
            location_type: 'Warehouse',
            action_plan: 'action plan',
            notes: 'some notes',
            location_data_type: 'xycoords',
            alertTypes: []
          })
          s: JSON.stringify({
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'long',
            internal_reference: 'reference',
            business_criticality: 'Medium',
            location_type: 'Warehouse',
            action_plan: 'action plan',
            notes: 'some notes',
            location_data_type: 'polygon',
            alertTypes: []
          })
        }
      }
    ]
  },
  {
    id: '14',
    enabled: true,
    name: 'UPRN',
    address: 'Norwich',
    coordinates: { latitude: 52.629, longitude: 1.295 },
    geometry: null,
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Location_ID14' } },
      { id: 'parentID', value: { s: '' } },
      { id: 'targetAreas', value: { s: '' } },
      { id: 'keywords', value: { s: '["keywords"]' } },
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'long',
            internal_reference: 'reference',
            business_criticality: 'Low',
            location_type: 'Office',
            action_plan: 'action plan',
            notes: 'some notes',
            location_data_type: 'xycoords',
            alertTypes: ['ALERT_LVL_2', 'ALERT_LVL_3']
          })
          s: JSON.stringify({
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'long',
            internal_reference: 'reference',
            business_criticality: 'Low',
            location_type: 'Office',
            action_plan: 'action plan',
            notes: 'some notes',
            location_data_type: 'polygon',
            alertTypes: ['ALERT_LVL_2', 'ALERT_LVL_3']
          })
        }
      }
    ]
  },
  {
    id: '15',
    enabled: true,
    name: 'UPRN',
    address: 'Wembley',
    coordinates: { latitude: 51.556, longitude: -0.291 },
    geometry: null,
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Location_ID15' } },
      { id: 'parentID', value: { s: '' } },
      { id: 'targetAreas', value: { s: '' } },
      { id: 'keywords', value: { s: '["keywords"]' } },
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'long',
            internal_reference: 'reference',
            business_criticality: 'High',
            location_type: 'Warehouse',
            action_plan: 'action plan',
            notes: 'some notes',
            location_data_type: 'xycoords',
            alertTypes: []
          })
          s: JSON.stringify({
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'long',
            internal_reference: 'reference',
            business_criticality: 'High',
            location_type: 'Warehouse',
            action_plan: 'action plan',
            notes: 'some notes',
            location_data_type: 'polygon',
            alertTypes: []
          })
        }
      }
    ]
  },
  {
    id: '16',
    enabled: true,
    name: 'UPRN',
    address: 'Nottingham',
    coordinates: { latitude: 52.954, longitude: -1.152 },
    geometry: null,
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Location_ID16' } },
      { id: 'parentID', value: { s: '' } },
      { id: 'targetAreas', value: { s: '' } },
      { id: 'keywords', value: { s: '["keywords"]' } },
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'long',
            internal_reference: 'reference',
            business_criticality: 'Medium',
            location_type: 'Warehouse',
            action_plan: 'action plan',
            notes: 'some notes',
            location_data_type: 'xycoords',
            alertTypes: ['ALERT_LVL_2']
          })
          s: JSON.stringify({
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'long',
            internal_reference: 'reference',
            business_criticality: 'Medium',
            location_type: 'Warehouse',
            action_plan: 'action plan',
            notes: 'some notes',
            location_data_type: 'polygon',
            alertTypes: ['ALERT_LVL_2']
          })
        }
      }
    ]
  },
  {
    id: '17',
    enabled: true,
    name: 'UPRN',
    address: 'Newcastle upon Tyne',
    coordinates: { latitude: 54.973, longitude: -1.614 },
    geometry: null,
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Location_ID17' } },
      { id: 'parentID', value: { s: '' } },
      { id: 'targetAreas', value: { s: '' } },
      { id: 'keywords', value: { s: '["keywords"]' } },
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'long',
            internal_reference: 'reference',
            business_criticality: 'Low',
            location_type: 'Retail space',
            action_plan: 'action plan',
            notes: 'some notes',
            location_data_type: 'xycoords',
            alertTypes: ['ALERT_LVL_3']
          })
          s: JSON.stringify({
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'long',
            internal_reference: 'reference',
            business_criticality: 'Low',
            location_type: 'Retail space',
            action_plan: 'action plan',
            notes: 'some notes',
            location_data_type: 'polygon',
            alertTypes: ['ALERT_LVL_3']
          })
        }
      }
    ]
  },
  {
    id: '18',
    enabled: true,
    name: 'UPRN',
    address: 'Liverpool',
    coordinates: { latitude: 53.404, longitude: -2.985 },
    geometry: null,
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Location_ID18' } },
      { id: 'parentID', value: { s: '' } },
      { id: 'targetAreas', value: { s: '' } },
      { id: 'keywords', value: { s: '["keywords"]' } },
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'long',
            internal_reference: 'reference',
            business_criticality: 'Medium',
            location_type: 'Office',
            action_plan: 'action plan',
            notes: 'some notes',
            location_data_type: 'xycoords',
            alertTypes: ['ALERT_LVL_2', 'ALERT_LVL_3']
          })
          s: JSON.stringify({
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'long',
            internal_reference: 'reference',
            business_criticality: 'Medium',
            location_type: 'Office',
            action_plan: 'action plan',
            notes: 'some notes',
            location_data_type: 'polygon',
            alertTypes: ['ALERT_LVL_2', 'ALERT_LVL_3']
          })
        }
      }
    ]
  },
  {
    id: '19',
    enabled: true,
    name: 'UPRN',
    address: 'Hull',
    coordinates: { latitude: 53.743, longitude: -0.337 },
    geometry: null,
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Location_ID19' } },
      { id: 'parentID', value: { s: '' } },
      { id: 'targetAreas', value: { s: '' } },
      { id: 'keywords', value: { s: '["keywords"]' } },
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'long',
            internal_reference: 'reference',
            business_criticality: 'High',
            location_type: 'Warehouse',
            action_plan: 'action plan',
            notes: 'some notes',
            location_data_type: 'xycoords',
            alertTypes: ['ALERT_LVL_2']
          })
          s: JSON.stringify({
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'long',
            internal_reference: 'reference',
            business_criticality: 'High',
            location_type: 'Warehouse',
            action_plan: 'action plan',
            notes: 'some notes',
            location_data_type: 'polygon',
            alertTypes: ['ALERT_LVL_2']
          })
        }
      }
    ]
  },
  {
    id: '20',
    enabled: true,
    name: 'UPRN',
    address: 'York',
    coordinates: { latitude: 53.96, longitude: -1.083 },
    geometry: null,
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Location_ID20' } },
      { id: 'parentID', value: { s: '' } },
      { id: 'targetAreas', value: { s: '' } },
      { id: 'keywords', value: { s: '["keywords"]' } },
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'long',
            internal_reference: 'reference',
            business_criticality: 'Low',
            location_type: 'Retail space',
            action_plan: 'action plan',
            notes: 'some notes',
            location_data_type: 'xycoords',
            alertTypes: []
          })
          s: JSON.stringify({
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'long',
            internal_reference: 'reference',
            business_criticality: 'Low',
            location_type: 'Retail space',
            action_plan: 'action plan',
            notes: 'some notes',
            location_data_type: 'polygon',
            alertTypes: []
          })
        }
      }
    ]
  },
  {
    id: '21',
    enabled: true,
    name: 'UPRN',
    address: 'Croydon',
    coordinates: { latitude: 51.378, longitude: -0.103 },
    geometry: null,
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Location_ID21' } },
      { id: 'parentID', value: { s: '' } },
      { id: 'targetAreas', value: { s: '' } },
      { id: 'keywords', value: { s: '["keywords"]' } },
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'long',
            internal_reference: 'reference',
            business_criticality: 'High',
            location_type: 'Warehouse',
            action_plan: 'action plan',
            notes: 'some notes',
            location_data_type: 'xycoords',
            alertTypes: ['ALERT_LVL_2', 'ALERT_LVL_3']
          })
          s: JSON.stringify({
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'long',
            internal_reference: 'reference',
            business_criticality: 'High',
            location_type: 'Warehouse',
            action_plan: 'action plan',
            notes: 'some notes',
            location_data_type: 'polygon',
            alertTypes: ['ALERT_LVL_2', 'ALERT_LVL_3']
          })
        }
      }
    ]
  },
  {
    id: '22',
    enabled: true,
    name: 'UPRN',
    address: 'Bristol',
    coordinates: { latitude: 51.455, longitude: -2.594 },
    geometry: null,
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Location_ID22' } },
      { id: 'parentID', value: { s: '' } },
      { id: 'targetAreas', value: { s: '' } },
      { id: 'keywords', value: { s: '["keywords"]' } },
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'long',
            internal_reference: 'reference',
            business_criticality: 'Medium',
            location_type: 'Warehouse',
            action_plan: 'action plan',
            notes: 'some notes',
            location_data_type: 'xycoords',
            alertTypes: ['ALERT_LVL_2']
          })
          s: JSON.stringify({
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'long',
            internal_reference: 'reference',
            business_criticality: 'Medium',
            location_type: 'Warehouse',
            action_plan: 'action plan',
            notes: 'some notes',
            location_data_type: 'polygon',
            alertTypes: ['ALERT_LVL_2']
          })
        }
      }
    ]
  },
  {
    id: '23',
    enabled: true,
    name: 'UPRN',
    address: 'Oxford',
    coordinates: { latitude: 51.752, longitude: -1.259 },
    geometry: null,
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Location_ID23' } },
      { id: 'parentID', value: { s: '' } },
      { id: 'targetAreas', value: { s: '' } },
      { id: 'keywords', value: { s: '["keywords"]' } },
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'long',
            internal_reference: 'reference',
            business_criticality: 'Low',
            location_type: 'Office',
            action_plan: 'action plan',
            notes: 'some notes',
            location_data_type: 'xycoords',
            alertTypes: ['ALERT_LVL_3']
          })
          s: JSON.stringify({
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'long',
            internal_reference: 'reference',
            business_criticality: 'Low',
            location_type: 'Office',
            action_plan: 'action plan',
            notes: 'some notes',
            location_data_type: 'polygon',
            alertTypes: ['ALERT_LVL_3']
          })
        }
      }
    ]
  },
  {
    id: '24',
    enabled: true,
    name: 'UPRN',
    address: 'Middlesbrough',
    coordinates: { latitude: 54.575, longitude: -1.237 },
    geometry: null,
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Location_ID24' } },
      { id: 'parentID', value: { s: '' } },
      { id: 'targetAreas', value: { s: '' } },
      { id: 'keywords', value: { s: '["keywords"]' } },
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'long',
            internal_reference: 'reference',
            business_criticality: 'Medium',
            location_type: 'Retail space',
            action_plan: 'action plan',
            notes: 'some notes',
            location_data_type: 'xycoords',
            alertTypes: ['ALERT_LVL_2', 'ALERT_LVL_3']
          })
          s: JSON.stringify({
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'long',
            internal_reference: 'reference',
            business_criticality: 'Medium',
            location_type: 'Retail space',
            action_plan: 'action plan',
            notes: 'some notes',
            location_data_type: 'polygon',
            alertTypes: ['ALERT_LVL_2', 'ALERT_LVL_3']
          })
        }
      }
    ]
  },
  {
    id: '25',
    enabled: true,
    name: 'UPRN',
    address: 'Manchester',
    coordinates: { latitude: 53.478, longitude: -2.241 },
    geometry: null,
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Location_ID25' } },
      { id: 'parentID', value: { s: '' } },
      { id: 'targetAreas', value: { s: '' } },
      { id: 'keywords', value: { s: '["keywords"]' } },
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'long',
            internal_reference: 'reference',
            business_criticality: 'High',
            location_type: 'Warehouse',
            action_plan: 'action plan',
            notes: 'some notes',
            location_data_type: 'xycoords',
            alertTypes: ['ALERT_LVL_3']
          })
          s: JSON.stringify({
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'long',
            internal_reference: 'reference',
            business_criticality: 'High',
            location_type: 'Warehouse',
            action_plan: 'action plan',
            notes: 'some notes',
            location_data_type: 'polygon',
            alertTypes: ['ALERT_LVL_3']
          })
        }
      }
    ]
  },
  {
    id: '26',
    enabled: true,
    name: 'UPRN',
    address: 'Birmingham',
    coordinates: { latitude: 52.479, longitude: -1.898 },
    geometry: null,
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Location_ID26' } },
      { id: 'parentID', value: { s: '' } },
      { id: 'targetAreas', value: { s: '' } },
      { id: 'keywords', value: { s: '["keywords"]' } },
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'long',
            internal_reference: 'reference',
            business_criticality: 'Low',
            location_type: 'Warehouse',
            action_plan: 'action plan',
            notes: 'some notes',
            location_data_type: 'xycoords',
            alertTypes: ['ALERT_LVL_2']
          })
          s: JSON.stringify({
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'long',
            internal_reference: 'reference',
            business_criticality: 'Low',
            location_type: 'Warehouse',
            action_plan: 'action plan',
            notes: 'some notes',
            location_data_type: 'polygon',
            alertTypes: ['ALERT_LVL_2']
          })
        }
      }
    ]
  },
  {
    id: '27',
    enabled: true,
    name: 'UPRN',
    address: 'Northampton',
    coordinates: { latitude: 52.237, longitude: -0.9 },
    geometry: null,
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Location_ID27' } },
      { id: 'parentID', value: { s: '' } },
      { id: 'targetAreas', value: { s: '' } },
      { id: 'keywords', value: { s: '["keywords"]' } },
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'long',
            internal_reference: 'reference',
            business_criticality: 'Medium',
            location_type: 'Office',
            action_plan: 'action plan',
            notes: 'some notes',
            location_data_type: 'xycoords',
            alertTypes: ['ALERT_LVL_2', 'ALERT_LVL_3']
          })
          s: JSON.stringify({
            full_address: 'some address',
            postcode: 'some postcode',
            x_coordinate: 'lat',
            y_coordinate: 'long',
            internal_reference: 'reference',
            business_criticality: 'Medium',
            location_type: 'Office',
            action_plan: 'action plan',
            notes: 'some notes',
            location_data_type: 'polygon',
            alertTypes: ['ALERT_LVL_2', 'ALERT_LVL_3']
          })
        }
      }
    ]
  }
]

module.exports = {
  allLocations: locations
}
