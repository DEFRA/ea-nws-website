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
      { id: 'locationName', value: { s: 'Location_01 - address variant' } },
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
    address: 'South Devon EstuariesS',
    coordinates: {
      latitude: 50.67978054 * 10 ** 6,
      longitude: -3.4786089 * 10 ** 6
    },
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
    address: 'My house at ulverston',
    coordinates: {
      latitude: 54.189244 * 10 ** 6,
      longitude: -3.06762096 * 10 ** 6
    },
    geometry: null,
    geocode: null,
    additionals: [
      {
        id: 'locationName',
        value: { s: 'Location_03' }
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
    address: 'York Minster, York, YO1 7JN',
    coordinates: { latitude: 53.961 * 10 ** 6, longitude: -1.081 * 10 ** 6 },
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
            location_data_type: 'xycoords',
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
      { id: 'locationName', value: { s: 'Location_05 - polygon variant' } },
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
    id: '6',
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
              [-0.1195, 51.5033],
              [-0.12, 51.5035],
              [-0.1198, 51.504],
              [-0.1193, 51.5038],
              [-0.1195, 51.5033]
            ],
            [
              [-0.1225, 51.5055],
              [-0.123, 51.5057],
              [-0.1228, 51.5062],
              [-0.1223, 51.506],
              [-0.1225, 51.5055]
            ]
          ]
        }
      }
    },
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
    address: 'New Forest National Park, Hampshire, England',
    coordinates: null,
    geometry: {
      geoJson: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-1.5703, 50.8086],
              [-1.5227, 50.8093],
              [-1.5315, 50.8766],
              [-1.4817, 50.883],
              [-1.4873, 50.9393],
              [-1.5245, 50.9442],
              [-1.5112, 50.9735],
              [-1.4564, 50.9882],
              [-1.4729, 51.0193],
              [-1.5393, 51.021],
              [-1.5642, 51.0109],
              [-1.5981, 50.9779],
              [-1.6201, 50.9544],
              [-1.6231, 50.927],
              [-1.6255, 50.8882],
              [-1.5985, 50.8705],
              [-1.5562, 50.8507],
              [-1.5703, 50.8086]
            ]
          ]
        }
      }
    },
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
    address: 'The Yorkshire Dales, North Yorkshire',
    coordinates: null,
    geometry: {
      geoJson: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-2.3, 54.15],
              [-2.1, 54.2],
              [-1.95, 54.25],
              [-1.9, 54.3],
              [-2.05, 54.35],
              [-2.3, 54.4],
              [-2.45, 54.35],
              [-2.5, 54.25],
              [-2.3, 54.15]
            ]
          ]
        }
      }
    },
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Location_39 - Yorkshire Dales' } },
      { id: 'keywords', value: { s: '["keywords"]' } },
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            full_address: 'The Yorkshire Dales, North Yorkshire',
            postcode: '',
            x_coordinate: '',
            y_coordinate: '',
            internal_reference: 'Hills & Valleys',
            business_criticality: 'Low',
            location_type: 'National Park',
            action_plan: '1. Preserve natural landscape.',
            notes: 'Major attraction for hikers.',
            location_data_type: 'polygon',
            alertTypes: ['ALERT_LVL_2']
          })
        }
      }
    ]
  },
  {
    id: '9',
    enabled: true,
    name: 'UPRN',
    address: 'The Peak District, Derbyshire',
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
                [-1.8, 53.35],
                [-1.7, 53.4],
                [-1.6, 53.45],
                [-1.5, 53.5],
                [-1.6, 53.55],
                [-1.7, 53.6],
                [-1.8, 53.35]
              ]
            ],
            [
              [
                [-1.9, 53.25],
                [-1.85, 53.275],
                [-1.8, 53.3],
                [-1.85, 53.325],
                [-1.9, 53.25]
              ]
            ]
          ]
        }
      }
    },
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Location_40 - Peak District' } },
      { id: 'keywords', value: { s: '["Hiking", "Tourism"]' } },
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            full_address: 'The Peak District, Derbyshire',
            postcode: '',
            x_coordinate: '',
            y_coordinate: '',
            internal_reference: 'Mountainous Terrain',
            business_criticality: 'Medium',
            location_type: 'National Park',
            action_plan: '1. Ensure safety for hikers.',
            notes: 'Strong winds, occasional flooding.',
            location_data_type: 'polygon',
            alertTypes: ['ALERT_LVL_3']
          })
        }
      }
    ]
  },
  {
    id: '10',
    enabled: true,
    name: 'UPRN',
    address: 'The Chiltern Hills, Buckinghamshire',
    coordinates: null,
    geometry: {
      geoJson: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-0.9, 51.55],
              [-0.85, 51.6],
              [-0.8, 51.65],
              [-0.75, 51.7],
              [-0.85, 51.75],
              [-0.9, 51.55]
            ]
          ]
        }
      }
    },
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Location_41 - Chiltern Hills' } },
      { id: 'keywords', value: { s: '["Hiking", "Tourism"]' } },
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            full_address: 'The Chiltern Hills, Buckinghamshire',
            postcode: '',
            x_coordinate: '',
            y_coordinate: '',
            internal_reference: 'Protected AONB',
            business_criticality: 'Low',
            location_type: 'Area of Natural Beauty',
            action_plan: '1. Preserve woodland.',
            notes: 'Frequent walkers and cyclists.',
            location_data_type: 'polygon',
            alertTypes: ['ALERT_LVL_1']
          })
        }
      }
    ]
  },
  {
    id: '11',
    enabled: true,
    name: 'UPRN',
    address: 'The Cotswolds, Gloucestershire',
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
                [-2.1, 51.8],
                [-2.0, 51.85],
                [-1.9, 51.9],
                [-2.0, 51.95],
                [-2.1, 51.8]
              ]
            ],
            [
              [
                [-1.8, 51.7],
                [-1.75, 51.725],
                [-1.7, 51.75],
                [-1.75, 51.775],
                [-1.8, 51.7]
              ]
            ]
          ]
        }
      }
    },
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Location_43 - The Cotswolds' } },
      { id: 'keywords', value: { s: '["Cottages", "Town"]' } },
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            full_address: 'The Cotswolds, England',
            postcode: '',
            x_coordinate: '',
            y_coordinate: '',
            internal_reference: 'Nice town',
            business_criticality: 'High',
            location_type: 'Transport',
            action_plan: '1. Monitor congestion levels.',
            notes: 'possible toflooding',
            location_data_type: 'polygon',
            alertTypes: ['ALERT_LVL_1', 'ALERT_LVL_2']
          })
        }
      }
    ]
  },
  // {
  //   id: '12',
  //   enabled: true,
  //   name: 'UPRN',
  //   address: 'M1 Motorway, England',
  //   coordinates: null,
  //   geometry: {
  //     geoJson: {
  //       type: 'Feature',
  //       properties: {},
  //       geometry: {
  //         type: 'LineString',
  //         coordinates: [
  //           [-0.256, 51.605],
  //           [-0.431, 52.1],
  //           [-1.132, 52.75],
  //           [-1.5, 53.1],
  //           [-1.55, 53.4],
  //           [-1.532, 53.8]
  //         ]
  //       }
  //     }
  //   },
  //   geocode: null,
  //   additionals: [
  //     { id: 'locationName', value: { s: 'Location_43 - M1 Motorway' } },
  //     { id: 'keywords', value: { s: '["Motorway", "Transport"]' } },
  //     {
  //       id: 'other',
  //       value: {
  //         s: JSON.stringify({
  //           full_address: 'M1 Motorway, England',
  //           postcode: '',
  //           x_coordinate: '',
  //           y_coordinate: '',
  //           internal_reference: 'Major motorway',
  //           business_criticality: 'High',
  //           location_type: 'Transport',
  //           action_plan: '1. Monitor congestion levels.',
  //           notes: 'Key transport route, heavy traffic expected.',
  //           location_data_type: 'line',
  //           alertTypes: ['ALERT_LVL_1', 'ALERT_LVL_2']
  //         })
  //       }
  //     }
  //   ]
  // },
  // {
  //   id: '12',
  //   enabled: true,
  //   name: 'UPRN',
  //   address: 'South West Coast Path, England',
  //   coordinates: null,
  //   geometry: {
  //     geoJson: {
  //       type: 'Feature',
  //       properties: {},
  //       geometry: {
  //         type: 'LineString',
  //         coordinates: [
  //           [-3.51, 50.7],
  //           [-4.25, 50.9],
  //           [-4.75, 51.1],
  //           [-5.0, 51.3],
  //           [-5.15, 51.5]
  //         ]
  //       }
  //     }
  //   },
  //   geocode: null,
  //   additionals: [
  //     {
  //       id: 'locationName',
  //       value: { s: 'Location_44 - South West Coast Path' }
  //     },
  //     { id: 'keywords', value: { s: '["Motorway", "Transport"]' } },
  //     {
  //       id: 'other',
  //       value: {
  //         s: JSON.stringify({
  //           full_address: 'South West Coast Path, England',
  //           postcode: '',
  //           x_coordinate: '',
  //           y_coordinate: '',
  //           internal_reference: 'National Trail',
  //           business_criticality: 'Medium',
  //           location_type: 'Walking Trail',
  //           action_plan: '1. Ensure safety measures for hikers.',
  //           notes: 'Stunning coastal views, challenging terrain.',
  //           location_data_type: 'line',
  //           alertTypes: ['ALERT_LVL_2']
  //         })
  //       }
  //     }
  //   ]
  // },
  // {
  //   id: '13',
  //   enabled: true,
  //   name: 'UPRN',
  //   address: 'M6 Motorway, England',
  //   coordinates: null,
  //   geometry: {
  //     geoJson: {
  //       type: 'Feature',
  //       properties: {},
  //       geometry: {
  //         type: 'LineString',
  //         coordinates: [
  //           [-1.9, 52.4],
  //           [-2.15, 52.8],
  //           [-2.35, 53.2],
  //           [-2.55, 53.8],
  //           [-2.8, 54.4]
  //         ]
  //       }
  //     }
  //   },
  //   geocode: null,
  //   additionals: [
  //     { id: 'locationName', value: { s: 'Location_45 - M6 Motorway' } },
  //     { id: 'keywords', value: { s: '["Motorway", "Transport"]' } },
  //     {
  //       id: 'other',
  //       value: {
  //         s: JSON.stringify({
  //           full_address: 'M6 Motorway, England',
  //           postcode: '',
  //           x_coordinate: '',
  //           y_coordinate: '',
  //           internal_reference: 'Major motorway',
  //           business_criticality: 'High',
  //           location_type: 'Transport',
  //           action_plan: '1. Monitor traffic conditions.',
  //           notes: 'Connects the Midlands to the North West.',
  //           location_data_type: 'line',
  //           alertTypes: ['ALERT_LVL_1', 'ALERT_LVL_3']
  //         })
  //       }
  //     }
  //   ]
  // },
  // {
  //   id: '14',
  //   enabled: true,
  //   name: 'UPRN',
  //   address: "Hadrian's Wall Path, England",
  //   coordinates: null,
  //   geometry: {
  //     geoJson: {
  //       type: 'Feature',
  //       properties: {},
  //       geometry: {
  //         type: 'LineString',
  //         coordinates: [
  //           [-2.15, 54.97],
  //           [-2.45, 54.95],
  //           [-2.75, 54.92],
  //           [-3.05, 54.9],
  //           [-3.35, 54.88]
  //         ]
  //       }
  //     }
  //   },
  //   geocode: null,
  //   additionals: [
  //     { id: 'locationName', value: { s: "Location_46 - Hadrian's Wall Path" } },
  //     { id: 'keywords', value: { s: '["Motorway", "Transport"]' } },
  //     {
  //       id: 'other',
  //       value: {
  //         s: JSON.stringify({
  //           full_address: "Hadrian's Wall Path, England",
  //           postcode: '',
  //           x_coordinate: '',
  //           y_coordinate: '',
  //           internal_reference: 'Historic Trail',
  //           business_criticality: 'Medium',
  //           location_type: 'Walking Trail',
  //           action_plan: '1. Preserve historical significance.',
  //           notes: 'Popular for walking, follows ancient Roman Wall.',
  //           location_data_type: 'line',
  //           alertTypes: ['ALERT_LVL_2']
  //         })
  //       }
  //     }
  //   ]
  // },
  // {
  //   id: '15',
  //   enabled: true,
  //   name: 'UPRN',
  //   address: 'M25 Motorway, England',
  //   coordinates: null,
  //   geometry: {
  //     geoJson: {
  //       type: 'Feature',
  //       properties: {},
  //       geometry: {
  //         type: 'LineString',
  //         coordinates: [
  //           [-0.22, 51.65],
  //           [0.0, 51.7],
  //           [0.25, 51.65],
  //           [0.15, 51.5],
  //           [-0.2, 51.45]
  //         ]
  //       }
  //     }
  //   },
  //   geocode: null,
  //   additionals: [
  //     { id: 'locationName', value: { s: 'Location_47 - M25 Motorway' } },
  //     { id: 'keywords', value: { s: '["Motorway", "Transport"]' } },
  //     {
  //       id: 'other',
  //       value: {
  //         s: JSON.stringify({
  //           full_address: 'M25 Motorway, England',
  //           postcode: '',
  //           x_coordinate: '',
  //           y_coordinate: '',
  //           internal_reference: 'London Ring Road',
  //           business_criticality: 'High',
  //           location_type: 'Transport',
  //           action_plan: '1. Monitor congestion.',
  //           notes: 'Most congested motorway in the UK.',
  //           location_data_type: 'line',
  //           alertTypes: ['ALERT_LVL_3']
  //         })
  //       }
  //     }
  //   ]
  // },
  {
    id: '16',
    enabled: true,
    name: 'UPRN',
    address: 'Buckingham Palace, London, SW1A 1AA',
    coordinates: { latitude: 51.5014 * 10 ** 6, longitude: -0.1419 * 10 ** 6 },
    geometry: null,
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Location_17 - Buckingham Palace' } },
      { id: 'keywords', value: { s: '["Royal", "Tourist"]' } },
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            full_address: 'Buckingham Palace, London',
            postcode: 'SW1A 1AA',
            x_coordinate: 529900,
            y_coordinate: 179800,
            internal_reference: 'Royal Residence',
            business_criticality: 'High',
            location_type: 'Royal Estate',
            action_plan: 'Ensure security at all times.',
            notes: 'Frequent events, heavy tourism.',
            location_data_type: 'xycoords',
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
    address: 'Tower Bridge, London, SE1 2UP',
    coordinates: { latitude: 51.5055 * 10 ** 6, longitude: -0.0754 * 10 ** 6 },
    geometry: null,
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Location_18 - Tower Bridge' } },
      { id: 'keywords', value: { s: '["Bridge", "Landmark"]' } },
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            full_address: 'Tower Bridge, London',
            postcode: 'SE1 2UP',
            x_coordinate: 533000,
            y_coordinate: 180000,
            internal_reference: 'London Bridge',
            business_criticality: 'Medium',
            location_type: 'Landmark',
            action_plan: 'Monitor structural integrity and traffic flow.',
            notes: 'Lifting bridge for river traffic.',
            location_data_type: 'xycoords',
            alertTypes: ['ALERT_LVL_1', 'ALERT_LVL_3']
          })
        }
      }
    ]
  },
  {
    id: '18',
    enabled: true,
    name: 'UPRN',
    address: 'Manchester Piccadilly Station, Manchester, M1 2QF',
    coordinates: { latitude: 53.4774 * 10 ** 6, longitude: -2.2313 * 10 ** 6 },
    geometry: null,
    geocode: null,
    additionals: [
      {
        id: 'locationName',
        value: { s: 'Location_19 - Manchester Piccadilly' }
      },
      { id: 'keywords', value: { s: '["Transport", "Railway"]' } },
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            full_address: 'Manchester Piccadilly Station',
            postcode: 'M1 2QF',
            x_coordinate: 384000,
            y_coordinate: 397000,
            internal_reference: 'Train Station',
            business_criticality: 'High',
            location_type: 'Transport Hub',
            action_plan: 'Monitor for delays and crowd control.',
            notes: 'Busy railway hub for Northern England.',
            location_data_type: 'xycoords',
            alertTypes: ['ALERT_LVL_2']
          })
        }
      }
    ]
  },
  {
    id: '19',
    enabled: true,
    name: 'UPRN',
    address: 'Liverpool Lime Street Station, Liverpool, L1 1JD',
    coordinates: { latitude: 53.4075 * 10 ** 6, longitude: -2.9778 * 10 ** 6 },
    geometry: null,
    geocode: null,
    additionals: [
      {
        id: 'locationName',
        value: { s: 'Location_19 - Liverpool Lime Street' }
      },
      { id: 'keywords', value: { s: '["Transport", "Railway"]' } },
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            full_address: 'Liverpool Lime Street Station',
            postcode: 'L1 1JD',
            x_coordinate: 334000,
            y_coordinate: 390000,
            internal_reference: 'Train Station',
            business_criticality: 'High',
            location_type: 'Transport Hub',
            action_plan: 'Monitor for delays and crowd control.',
            notes: 'Major railway station in Liverpool.',
            location_data_type: 'xycoords',
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
    address: 'Birmingham New Street Station, Birmingham, B2 4QA',
    coordinates: { latitude: 52.4776 * 10 ** 6, longitude: -1.8982 * 10 ** 6 },
    geometry: null,
    geocode: null,
    additionals: [
      {
        id: 'locationName',
        value: { s: 'Location_20 - Birmingham New Street' }
      },
      { id: 'keywords', value: { s: '["Transport", "Railway"]' } },
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            full_address: 'Birmingham New Street Station',
            postcode: 'B2 4QA',
            x_coordinate: 406000,
            y_coordinate: 287000,
            internal_reference: 'Train Station',
            business_criticality: 'High',
            location_type: 'Transport Hub',
            action_plan: 'Monitor for delays and crowd control.',
            notes: 'Central railway station in Birmingham.',
            location_data_type: 'xycoords',
            alertTypes: ['ALERT_LVL_2']
          })
        }
      }
    ]
  },
  {
    id: '21',
    enabled: true,
    name: 'UPRN',
    address: 'The Shard, London, SE1 9SG',
    coordinates: { latitude: 51.5045 * 10 ** 6, longitude: -0.0865 * 10 ** 6 },
    geometry: null,
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Location_21 - The Shard' } },
      { id: 'keywords', value: { s: '["Landmark", "Skyscraper"]' } },
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            full_address: 'The Shard, London',
            postcode: 'SE1 9SG',
            x_coordinate: 532000,
            y_coordinate: 179000,
            internal_reference: 'Tallest Building',
            business_criticality: 'High',
            location_type: 'Landmark',
            action_plan: 'Ensure building maintenance and safety checks.',
            notes: 'One of the tallest buildings in the UK.',
            location_data_type: 'xycoords',
            alertTypes: ['ALERT_LVL_1']
          })
        }
      }
    ]
  },
  {
    id: '22',
    enabled: true,
    name: 'UPRN',
    address: 'Windsor Castle, Windsor, SL4 1NJ',
    coordinates: { latitude: 51.4839 * 10 ** 6, longitude: -0.6044 * 10 ** 6 },
    geometry: null,
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Location_22 - Windsor Castle' } },
      { id: 'keywords', value: { s: '["Royal", "Historic"]' } },
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            full_address: 'Windsor Castle, Windsor',
            postcode: 'SL4 1NJ',
            x_coordinate: 498500,
            y_coordinate: 177500,
            internal_reference: 'Royal Residence',
            business_criticality: 'High',
            location_type: 'Royal Estate',
            action_plan: 'Ensure security at all times.',
            notes: 'Residence of the British monarchy.',
            location_data_type: 'xycoords',
            alertTypes: ['ALERT_LVL_1']
          })
        }
      }
    ]
  },
  {
    id: '23',
    enabled: true,
    name: 'UPRN',
    address: 'Oxford University, Oxford, OX1 2JD',
    coordinates: { latitude: 51.7548 * 10 ** 6, longitude: -1.2544 * 10 ** 6 },
    geometry: null,
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Location_23 - Oxford University' } },
      { id: 'keywords', value: { s: '["Education", "Historic"]' } },
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            full_address: 'Oxford University, Oxford',
            postcode: 'OX1 2JD',
            x_coordinate: 450000,
            y_coordinate: 206000,
            internal_reference: 'University',
            business_criticality: 'Medium',
            location_type: 'Education',
            action_plan: 'Monitor student safety and campus activity.',
            notes: 'One of the oldest universities in the world.',
            location_data_type: 'xycoords',
            alertTypes: ['ALERT_LVL_2']
          })
        }
      }
    ]
  },
  {
    id: '24',
    enabled: true,
    name: 'UPRN',
    address: 'Cambridge University, Cambridge, CB2 1TN',
    coordinates: { latitude: 52.2053 * 10 ** 6, longitude: 0.1218 * 10 ** 6 },
    geometry: null,
    geocode: null,
    additionals: [
      {
        id: 'locationName',
        value: { s: 'Location_24 - Cambridge University' }
      },
      { id: 'keywords', value: { s: '["Education", "Historic"]' } },
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            full_address: 'Cambridge University, Cambridge',
            postcode: 'CB2 1TN',
            x_coordinate: 548000,
            y_coordinate: 259000,
            internal_reference: 'University',
            business_criticality: 'Medium',
            location_type: 'Education',
            action_plan: 'Monitor student safety and campus activity.',
            notes: 'Prestigious university with global recognition.',
            location_data_type: 'xycoords',
            alertTypes: ['ALERT_LVL_2']
          })
        }
      }
    ]
  },
  {
    id: '25',
    enabled: true,
    name: 'UPRN',
    address: 'York Minster, York, YO1 7HH',
    coordinates: { latitude: 53.961 * 10 ** 6, longitude: -1.0815 * 10 ** 6 },
    geometry: null,
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Location_25 - York Minster' } },
      { id: 'keywords', value: { s: '["Historic", "Cathedral"]' } },
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            full_address: 'York Minster, York',
            postcode: 'YO1 7HH',
            x_coordinate: 463000,
            y_coordinate: 452000,
            internal_reference: 'Cathedral',
            business_criticality: 'High',
            location_type: 'Religious Site',
            action_plan: 'Ensure preservation and visitor safety.',
            notes: 'Gothic cathedral and historical landmark.',
            location_data_type: 'xycoords',
            alertTypes: ['ALERT_LVL_2']
          })
        }
      }
    ]
  },
  {
    id: '25',
    enabled: true,
    name: 'UPRN',
    address: 'York Minster, York, YO1 7HH',
    coordinates: { latitude: 53.961 * 10 ** 6, longitude: -1.0815 * 10 ** 6 },
    geometry: null,
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Location_25 - York Minster' } },
      { id: 'keywords', value: { s: '["Historic", "Cathedral"]' } },
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            full_address: 'York Minster, York',
            postcode: 'YO1 7HH',
            x_coordinate: 463000,
            y_coordinate: 452000,
            internal_reference: 'Cathedral',
            business_criticality: 'High',
            location_type: 'Religious Site',
            action_plan: 'Ensure preservation and visitor safety.',
            notes: 'Gothic cathedral and historical landmark.',
            location_data_type: 'xycoords',
            alertTypes: ['ALERT_LVL_2']
          })
        }
      }
    ]
  },
  {
    id: '26',
    enabled: true,
    name: 'UPRN',
    address: 'Newcastle Central Station, Newcastle, NE1 5DL',
    coordinates: { latitude: 54.9689 * 10 ** 6, longitude: -1.6174 * 10 ** 6 },
    geometry: null,
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Location_26 - Newcastle Central' } },
      { id: 'keywords', value: { s: '["Transport", "Railway"]' } },
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            full_address: 'Newcastle Central Station',
            postcode: 'NE1 5DL',
            x_coordinate: 413000,
            y_coordinate: 564000,
            internal_reference: 'Train Station',
            business_criticality: 'High',
            location_type: 'Transport Hub',
            action_plan: 'Monitor for delays and crowd control.',
            notes: 'Central station in Newcastle.',
            location_data_type: 'xycoords',
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
    address: 'Lake District National Park, Cumbria',
    coordinates: null,
    geometry: {
      geoJson: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-3.075, 54.319],
              [-3.085, 54.303],
              [-3.09, 54.296],
              [-3.115, 54.288],
              [-3.125, 54.283],
              [-3.135, 54.278],
              [-3.14, 54.269],
              [-3.145, 54.26],
              [-3.16, 54.251],
              [-3.155, 54.241],
              [-3.14, 54.233],
              [-3.12, 54.227],
              [-3.11, 54.222],
              [-3.09, 54.22],
              [-3.075, 54.219],
              [-3.06, 54.225],
              [-3.05, 54.234],
              [-3.045, 54.242],
              [-3.045, 54.252],
              [-3.06, 54.261],
              [-3.07, 54.269],
              [-3.075, 54.319]
            ]
          ]
        }
      }
    },
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Location_27 - Lake District' } },
      { id: 'keywords', value: { s: '["National Park", "Natural Beauty"]' } },
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            full_address: 'Lake District National Park, Cumbria',
            postcode: '',
            x_coordinate: '',
            y_coordinate: '',
            internal_reference: 'National Park',
            business_criticality: 'High',
            location_type: 'Parkland',
            action_plan: 'Preserve natural beauty and manage tourism.',
            notes: 'One of the most stunning national parks in England.',
            location_data_type: 'polygon',
            alertTypes: ['ALERT_LVL_1']
          })
        }
      }
    ]
  },
  {
    id: '28',
    enabled: true,
    name: 'UPRN',
    address: 'New Forest National Park, Hampshire',
    coordinates: null,
    geometry: {
      geoJson: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-1.584, 50.848],
              [-1.582, 50.84],
              [-1.579, 50.836],
              [-1.574, 50.829],
              [-1.57, 50.82],
              [-1.563, 50.815],
              [-1.558, 50.808],
              [-1.55, 50.8],
              [-1.544, 50.79],
              [-1.537, 50.783],
              [-1.53, 50.775],
              [-1.525, 50.77],
              [-1.52, 50.762],
              [-1.515, 50.758],
              [-1.51, 50.75],
              [-1.503, 50.746],
              [-1.497, 50.742],
              [-1.493, 50.74],
              [-1.49, 50.737],
              [-1.484, 50.735],
              [-1.48, 50.73],
              [-1.48, 50.73],
              [-1.584, 50.848]
            ]
          ]
        }
      }
    },
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Location_28 - New Forest' } },
      { id: 'keywords', value: { s: '["National Park", "Woodland"]' } },
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            full_address: 'New Forest National Park, Hampshire',
            postcode: '',
            x_coordinate: '',
            y_coordinate: '',
            internal_reference: 'National Park',
            business_criticality: 'Medium',
            location_type: 'Parkland',
            action_plan: 'Conserve forest ecosystem and manage visitors.',
            notes: 'Famous for its wild ponies and ancient woodlands.',
            location_data_type: 'polygon',
            alertTypes: ['ALERT_LVL_1']
          })
        }
      }
    ]
  },
  {
    id: '29',
    enabled: true,
    name: 'UPRN',
    address: 'South Downs National Park, Sussex',
    coordinates: null,
    geometry: {
      geoJson: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-0.973, 50.946],
              [-0.964, 50.937],
              [-0.957, 50.93],
              [-0.95, 50.924],
              [-0.94, 50.917],
              [-0.93, 50.911],
              [-0.92, 50.905],
              [-0.913, 50.9],
              [-0.9, 50.891],
              [-0.885, 50.884],
              [-0.872, 50.877],
              [-0.86, 50.87],
              [-0.85, 50.864],
              [-0.835, 50.858],
              [-0.823, 50.852],
              [-0.81, 50.845],
              [-0.8, 50.839],
              [-0.792, 50.832],
              [-0.783, 50.826],
              [-0.77, 50.82],
              [-0.763, 50.813],
              [-0.76, 50.805],
              [-0.757, 50.8],
              [-0.973, 50.946]
            ]
          ]
        }
      }
    },
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Location_29 - South Downs' } },
      { id: 'keywords', value: { s: '["National Park", "Hills"]' } },
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            full_address: 'South Downs National Park, Sussex',
            postcode: '',
            x_coordinate: '',
            y_coordinate: '',
            internal_reference: 'National Park',
            business_criticality: 'Medium',
            location_type: 'Parkland',
            action_plan: 'Ensure preservation of natural landscapes.',
            notes: 'Famous for its chalk hills and scenic views.',
            location_data_type: 'polygon',
            alertTypes: ['ALERT_LVL_1']
          })
        }
      }
    ]
  },
  {
    id: '30',
    enabled: true,
    name: 'UPRN',
    address: 'Exmoor National Park, Somerset',
    coordinates: null,
    geometry: {
      geoJson: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-3.556, 51.218],
              [-3.548, 51.211],
              [-3.538, 51.205],
              [-3.53, 51.197],
              [-3.52, 51.188],
              [-3.51, 51.181],
              [-3.5, 51.173],
              [-3.495, 51.165],
              [-3.48, 51.157],
              [-3.465, 51.151],
              [-3.453, 51.143],
              [-3.442, 51.136],
              [-3.437, 51.129],
              [-3.425, 51.121],
              [-3.418, 51.113],
              [-3.411, 51.106],
              [-3.4, 51.099],
              [-3.389, 51.093],
              [-3.38, 51.086],
              [-3.372, 51.079],
              [-3.365, 51.071],
              [-3.56, 51.218]
            ]
          ]
        }
      }
    },
    geocode: null,
    additionals: [
      { id: 'locationName', value: { s: 'Location_30 - Exmoor' } },
      { id: 'keywords', value: { s: '["National Park", "Mountain"]' } },
      {
        id: 'other',
        value: {
          s: JSON.stringify({
            full_address: 'Exmoor National Park, Somerset',
            postcode: '',
            x_coordinate: '',
            y_coordinate: '',
            internal_reference: 'National Park',
            business_criticality: 'Medium',
            location_type: 'Parkland',
            action_plan: 'Ensure conservation of habitats and fauna.',
            notes: 'Known for moorland, valleys, and wildlife.',
            location_data_type: 'polygon',
            alertTypes: ['ALERT_LVL_1']
          })
        }
      }
    ]
  }
]

module.exports = {
  allLocations: locations
}
