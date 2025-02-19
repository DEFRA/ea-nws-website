const locations = [
  {
    id: '1',
    enabled: true,
    name: 'UPRN',
    address: 'Big Ben, London, SW1A 0AA',
    coordinates: {
      latitude: 51.49907586 * 10 ** 6,
      longitude: -0.136347269 * 10 ** 6
    },
    geometry: null,
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Big Ben' } },
      { id: 'parentID', value: { s: '' } },
      { id: 'targetAreas', value: { s: '' } },
      { id: 'keywords', value: { s: '["South"]' } },
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            full_address: 'some address',
            postcode: 'SW1A 0AA',
            x_coordinate: 466413.18,
            y_coordinate: 105037.31,
            internal_reference: 'SW1A 0AA, house of commons',
            business_criticality: 'Medium',
            location_type: 'The parliment',
            action_plan: '1. Dont panic!',
            notes:
              'Kier starmer has the flood plan for this location. His contact number is 01234 567 890',
            location_data_type: 'xycoords',
            alertTypes: ['ALERT_LVL_1', 'ALERT_LVL_2', 'ALERT_LVL_3']
          })
        }
      }
    ]
  },
  {
    id: '2',
    enabled: true,
    name: 'UPRN',
    address: 'South Devon Estuaries',
    coordinates: {
      latitude: 50.67978054 * 10 ** 6,
      longitude: -3.4786089 * 10 ** 6
    },
    geometry: null,
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Devon' } },
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
            alertTypes: ['ALERT_LVL_1', 'ALERT_LVL_2', 'ALERT_LVL_3']
          })
        }
      }
    ]
  },
  {
    id: '3',
    enabled: true,
    name: 'UPRN',
    address: '31 Sun street, Ulverston, LA12 7BX',
    coordinates: {
      latitude: 54.189244 * 10 ** 6,
      longitude: -3.06762096 * 10 ** 6
    },
    geometry: null,
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Ulverston' } },
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
            location_data_type: 'xycoords',
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
    address: 'York',
    coordinates: null,
    geometry: {
      geoJson: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-1.131, 53.93],
              [-1.108, 53.97],
              [-1.075, 53.99],
              [-1.05, 53.99],
              [-1.04, 53.96],
              [-1.05, 53.93],
              [-1.09, 53.92],
              [-1.131, 53.93]
            ]
          ]
        }
      }
    },
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'York' } },
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
            location_data_type: 'polygon',
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
    address: 'River Thames and London Eye, London',
    coordinates: null,
    geometry: {
      geoJson: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'MultiPolygon',
          coordinates: [
            [
              [
                [-0.1195, 51.5033],
                [-0.12, 51.5035],
                [-0.1198, 51.504],
                [-0.1193, 51.5038],
                [-0.1195, 51.5033]
              ]
            ],
            [
              [
                [-0.1225, 51.5055],
                [-0.123, 51.5057],
                [-0.1228, 51.5062],
                [-0.1223, 51.506],
                [-0.1225, 51.5055]
              ]
            ]
          ]
        }
      }
    },
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'London eye' } },
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
            location_data_type: 'polygon',
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
    address: 'High Street, Halstead, Essex, England',
    coordinates: null,
    geometry: {
      geoJson: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: [
            [0.6202301300274087, 51.935679526480016],
            [0.6275571169255159, 51.93949484369708],
            [0.6297299975138344, 51.94299082299395],
            [0.633819789452474, 51.944093095563915],
            [0.6351873810606037, 51.94337945677066],
            [0.6390920718937423, 51.94493599855349],
            [0.6434212328299225, 51.94765484859133],
            [0.6460486148796463, 51.95089194761769],
            [0.6499412925332138, 51.95664407192237],
            [0.6523566388888185, 51.96006876219539]
          ]
        }
      }
    },
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Halstead High st.' } },
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
            location_data_type: 'line',
            alertTypes: ['ALERT_LVL_3', 'ALERT_LVL_2']
          })
        }
      }
    ]
  },
  {
    id: '7',
    enabled: true,
    name: 'UPRN',
    address: 'Peterborough',
    coordinates: null,
    geometry: {
      geoJson: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-0.3263319269514682, 52.5867051688501],
              [-0.37146468559086543, 52.58757244748904],
              [-0.36061335653832316, 52.56880387649878],
              [-0.3188859914262423, 52.559402795796984],
              [-0.29466015712080207, 52.53924231078727],
              [-0.22324424069373094, 52.53192572820697],
              [-0.18573371203629563, 52.56175098400374],
              [-0.26353842110961523, 52.590435595422065],
              [-0.3263319269514682, 52.5867051688501]
            ]
          ]
        }
      }
    },
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Peterborough' } },
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
            location_data_type: 'polygon',
            alertTypes: ['ALERT_LVL_3', 'ALERT_LVL_2']
          })
        }
      }
    ]
  },
  {
    id: '8',
    enabled: true,
    name: 'UPRN',
    address: 'Gloucester',
    coordinates: null,
    geometry: {
      geoJson: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-2.255899329089374, 51.86945522104526],
              [-2.2633773460729003, 51.84965399572266],
              [-2.258184630163896, 51.84005415625538],
              [-2.2218985561245574, 51.85887013255345],
              [-2.205634030563118, 51.88339817015202],
              [-2.2185940469029504, 51.88480105848333],
              [-2.2319434150170707, 51.88117128003276],
              [-2.238203887060166, 51.882246597965604],
              [-2.2488157667633857, 51.87988593444828],
              [-2.256091459193641, 51.87568769368369],
              [-2.26402865217176, 51.874863938026664],
              [-2.2600362264844307, 51.87079805451154],
              [-2.255899329089374, 51.86945522104526]
            ]
          ]
        }
      }
    },
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Gloucester' } },
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
            location_data_type: 'polygon',
            alertTypes: ['ALERT_LVL_3', 'ALERT_LVL_2']
          })
        }
      }
    ]
  }
]

module.exports = {
  allLocations: locations
}
