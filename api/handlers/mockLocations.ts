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
            alertTypes: ['ALERT_LVL_1', 'ALERT_LVL_2'],
            targetAreas: [
              {
                TA_CODE: '063FWT23WestminC',
                TA_Name: 'Tidal Thames at Westminster',
                category: 'Flood Warning'
              }
            ]
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
            alertTypes: ['ALERT_LVL_1', 'ALERT_LVL_2', 'ALERT_LVL_3'],
            targetAreas: [
              {
                TA_CODE: '113WACT1D',
                TA_NAME: 'South Devon Estuaries',
                category: 'Severe flood warning'
              },

              {
                TA_CODE: '011WAFDU',
                TA_NAME: 'South Devon Estuaries',
                category: 'Alert flood warning'
              }
            ]
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
            alertTypes: ['ALERT_LVL_3'],
            targetAreas: []
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
      geoJson: JSON.stringify({
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
      })
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
            alertTypes: ['ALERT_LVL_3'],
            targetAreas: [
              {
                TA_CODE: '122WAF946',
                TA_Name:
                  'River Ouse, Burdyke, Holgate Beck, Blue Beck, River Foss, The Fleet',
                category: 'Severe flood Warning'
              },
              {
                TA_CODE: '122FWF776',
                TA_Name:
                  'River Foss at Layerthorpe to Foss Islands Road, Stonebow and Piccadilly',
                category: 'Flood Warning'
              }
            ]
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
      geoJson: JSON.stringify({
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
      })
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
            alertTypes: ['ALERT_LVL_1', 'ALERT_LVL_2'],
            targetAreas: []
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
      geoJson: JSON.stringify({
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
      })
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
            alertTypes: ['ALERT_LVL_1', 'ALERT_LVL_2', 'ALERT_LVL_2'],
            targetAreas: [
              {
                TA_CODE: '051FWFEF4B',
                TA_Name: 'The River Colne from Halstead to Lexden',
                category: 'Flood Warning'
              }
            ]
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
      geoJson: JSON.stringify({
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
      })
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
            alertTypes: ['ALERT_LVL_1', 'ALERT_LVL_2'],
            targetAreas: [
              {
                TA_CODE: '055FWFPLNE01',
                TA_Name: 'The River Nene',
                category: 'Severe flood Warning'
              }
            ]
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
      geoJson: JSON.stringify({
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
      })
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
            alertTypes: ['ALERT_LVL_3'],
            targetAreas: []
          })
        }
      }
    ]
  },
  {
    id: '9',
    enabled: true,
    name: 'UPRN',
    address: 'Mersey and Surrounding',
    coordinates: null,
    geometry: {
      geoJson: JSON.stringify({
        type: 'Polygon',
        coordinates: [
          [
            [-3.061354122057935, 53.47523565129262],
            [-2.891982383564624, 53.321890425649],
            [-2.4654345478330697, 53.3930209206699],
            [-2.2427935885820602, 53.48268362694367],
            [-2.4623017865785926, 53.546057497151736],
            [-2.5344064165724376, 53.6223374816538],
            [-2.5626345621992925, 53.72452977980481],
            [-2.6285031525856937, 53.77465054832436],
            [-2.7163417686112723, 53.785821980971605],
            [-2.8449586825331323, 53.95598969114968],
            [-2.9578813569513613, 53.946767720824056],
            [-3.048843491190979, 53.93199738796696],
            [-3.058242762082159, 53.80807974403061],
            [-3.051966436219402, 53.75433207999032],
            [-3.001777517422738, 53.73763567631289],
            [-2.9170950205208044, 53.737638323631074],
            [-3.0257843003839042, 53.65490100455378],
            [-3.1145368945389507, 53.562514781151634],
            [-3.061354122057935, 53.47523565129262]
          ]
        ]
      })
    },
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Mersey and Surrounding' } },
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
            alertTypes: ['ALERT_LVL_1', 'ALERT_LVL_2'],
            targetAreas: [
              {
                TA_CODE: '013FWTTME8',
                TA_Name:
                  'Irish Sea and Mersey estuary from the Head of the Wirral to Runcorn',
                category: 'Flood Warning'
              },
              {
                TA_CODE: '013WAFWI',
                TA_Name:
                  'Wirral catchment with Heswall, Ellesmere Port, Bebington, Hoylake and Wallasey',
                category: 'Alert flood Warning'
              }
            ]
          })
        }
      }
    ]
  },
  {
    id: '10',
    enabled: true,
    name: 'UPRN',
    address: 'Nottingham',
    coordinates: null,
    geometry: {
      geoJson: JSON.stringify({
        type: 'Polygon',
        coordinates: [
          [
            [-1.250307243067624, 53.205946879055205],
            [-1.504201684828928, 53.06395825754504],
            [-1.6015490549746119, 52.850622111626166],
            [-1.5210152003101314, 52.73761160381429],
            [-1.3406098143558438, 52.68186892424242],
            [-1.0926498531518973, 52.68521220206887],
            [-0.888372941757666, 52.724752771764],
            [-0.7405248230899701, 52.81562316826012],
            [-0.6774224842033334, 52.90086727059523],
            [-0.6578691793809242, 53.00254714161565],
            [-0.6791236787922514, 53.10019747018117],
            [-0.7448147423122862, 53.22330228361642],
            [-0.9238539936985148, 53.275952337385434],
            [-1.0511403389942302, 53.27585346046749],
            [-1.142818161284282, 53.213554680914626],
            [-1.1852485991306594, 53.18558391892617],
            [-1.250307243067624, 53.205946879055205]
          ]
        ]
      })
    },
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Nottingham' } },
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
            alertTypes: ['ALERT_LVL_1', 'ALERT_LVL_2', 'ALERT_LVL_3'],
            targetAreas: [
              {
                TA_CODE: '034FWFTRNOTTCITY',
                TA_Name: 'River Trent at Nottingham including The Meadows',
                category: 'Severe flood Warning'
              },
              {
                TA_CODE: '034WAF409',
                TA_Name:
                  'River Derwent from Rowsley to the River Trent at Shardlow',
                category: 'Alert flood Warning'
              }
            ]
          })
        }
      }
    ]
  },
  {
    id: '11',
    enabled: true,
    name: 'UPRN',
    address: 'Hereford',
    coordinates: {
      latitude: 52.045556502054296 * 10 ** 6,
      longitude: -2.703896829613342 * 10 ** 6
    },
    geometry: null,
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Hereford' } },
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
            alertTypes: ['ALERT_LVL_1', 'ALERT_LVL_2', 'ALERT_LVL_3'],
            targetAreas: [
              {
                TA_CODE: '031FWFWY110',
                TA_Name: 'River Wye in North Hereford',
                category: 'Flood Warning'
              },
              {
                TA_CODE: '031WAF119',
                TA_Name: 'River Wye in North Hereford',
                category: 'Flood Warning'
              }
            ]
          })
        }
      }
    ]
  },
  {
    id: '12',
    enabled: true,
    name: 'UPRN',
    address: 'Southampton',
    coordinates: null,
    geometry: {
      geoJson: JSON.stringify({
        type: 'Polygon',
        coordinates: [
          [
            [-2.1341905304781505, 50.837897465696614],
            [-2.254975323142787, 50.79869959348824],
            [-2.2060998289651934, 50.74702455739592],
            [-2.085240518913224, 50.68288837090617],
            [-1.934970900493994, 50.637307812012324],
            [-1.8826801203153707, 50.709790441601314],
            [-1.5657596231154685, 50.664220887167204],
            [-1.5134799553414382, 50.67457857097227],
            [-1.392583513093939, 50.633148379220785],
            [-1.2521182631624015, 50.57511677191059],
            [-1.173741620136127, 50.61661972630833],
            [-0.7945967205407669, 50.730447666284505],
            [-0.7684648311203262, 50.765597433929514],
            [-0.8044359024997902, 50.83788004880685],
            [-1.0757420137692861, 50.89562572926238],
            [-1.3338211062933851, 50.99237032261078],
            [-1.5821014030443905, 50.992377300820266],
            [-1.9054976342091834, 50.92652245400137],
            [-2.1341905304781505, 50.837897465696614]
          ]
        ]
      })
    },
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Southampton' } },
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
            location_data_type: 'boundary',
            alertTypes: ['ALERT_LVL_1', 'ALERT_LVL_2'],
            targetAreas: [
              {
                TA_CODE: '065FWC0501',
                TA_Name: 'Itchen estuary',
                category: 'Flood Warning'
              },
              {
                TA_CODE: '065WAC151',
                TA_Name: 'Southampton Water and Hamble',
                category: 'Alert flood Warning'
              }
            ]
          })
        }
      }
    ]
  },
  {
    id: '13',
    enabled: true,
    name: 'UPRN',
    address: 'Little Chester',
    coordinates: {
      latitude: 52.92944454871733 * 10 ** 6,
      longitude: -1.4721362793347623 * 10 ** 6
    },
    geometry: null,
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Little Chester' } },
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
            alertTypes: ['ALERT_LVL_1', 'ALERT_LVL_2', 'ALERT_LVL_3'],
            targetAreas: [
              {
                TA_CODE: '034FWFDELITTLECH',
                TA_Name:
                  'River Derwent at Little Chester, Eastgate and Cattle Market',
                category: 'Flood Warning'
              }
            ]
          })
        }
      }
    ]
  }
]

module.exports = {
  allLocations: locations
}
