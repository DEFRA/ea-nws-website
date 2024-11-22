const locations = [
    {
        id: '1',
        enabled: true,
        name: 'UPRN',
        address: '34 Hughenden Road, High Wycombe, LE2 7BB',
        coordinates: { latitude: 50.84106, longitude: -1.05814 },
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
              s: JSON.stringify(
                {
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
                }
              )
            }
          }
        ]
      },
      {
        id: '2',
        enabled: true,
        name: 'UPRN',
        address: '',
        coordinates: { latitude: 54.197594, longitude: -3.089788 },
        geometry: null,
        geocode: null,
        additionals: [
          { id: 'locationName', value: { s: 'Location_02 - xy coord variant' } },
          { id: 'parentID', value: { s: '' } },
          { id: 'targetAreas', value: { s: '' } },
          { id: 'keywords', value: { s: '' } },
          {
            id: 'other',
            value: {
              s: JSON.stringify(
                {
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
                }
              )
            }
          }
        ]
      },
      {
        id: '3',
        enabled: true,
        name: 'UPRN',
        address: '',
        coordinates: { latitude: 50.84106, longitude: -1.05814 },
        geometry: null,
        geocode: null,
        additionals: [
          { id: 'locationName', value: { s: 'Location_03 - shapefile polygon variant' } },
          { id: 'parentID', value: { s: '' } },
          { id: 'targetAreas', value: { s: '' } },
          { id: 'keywords', value: { s: '' } },
          {
            id: 'other',
            value: {
              s: JSON.stringify(
                {
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
                }
              )
            }
          }
        ]
      },
      {
        id: '4',
        enabled: true,
        name: 'UPRN',
        address: '',
        coordinates: { latitude: 50.84106, longitude: -1.05814 },
        geometry: null,
        geocode: null,
        additionals: [
          { id: 'locationName', value: { s: 'Location_04 - shapefile line variant' } },
          { id: 'parentID', value: { s: '' } },
          { id: 'targetAreas', value: { s: '' } },
          { id: 'keywords', value: { s: '' } },
          {
            id: 'other',
            value: {
              s: JSON.stringify(
                {
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
                }
              )
            }
          }
        ]
      },
      {
        id: '5',
        enabled: true,
        name: 'UPRN',
        address: '',
        coordinates: { latitude: 50.84106, longitude: -1.05814 },
        geometry: null,
        geocode: null,
        additionals: [
          { id: 'locationName', value: { s: 'Location_05 - boundary variant' } },
          { id: 'parentID', value: { s: '' } },
          { id: 'targetAreas', value: { s: '' } },
          { id: 'keywords', value: { s: '' } },
          {
            id: 'other',
            value: {
              s: JSON.stringify(
                {
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
                }
              )
            }
          }
        ]
      },
      {
        id: '6',
        enabled: true,
        name: 'Location_ID7',
        address: 'some address',
        coordinates: { latitude: 50.84106, longitude: -1.05814 },
        geometry: null,
        geocode: null,
        additionals: [
          { id: 'locationName', value: { s: 'Location_05 - boundary variant' } },
          { id: 'parentID', value: { s: '' } },
          { id: 'targetAreas', value: { s: '' } },
          { id: 'keywords', value: { s: '' } },
          {
            id: 'other',
            value: {
              s: JSON.stringify(
                {
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
                }
              )
            }
          }
        ]
      },

    {
      name: 'Location_ID7',
      address: 'some address',
      coordinates: ['lat', 'lng'],
      alert_categories: [],
      meta_data: {
        location_additional: {
          full_address: 'some address',
          postcode: 'some postcode',
          x_coordinate: 'lat',
          y_coordinate: 'lng',
          internal_reference: 'reference',
          business_criticality: 'Low',
          location_type: 'Office',
          action_plan: 'action plan',
          notes: 'some notes',
          keywords: 'keywords'
        }
      }
    },
    {
      name: 'Location_ID8',
      address: 'some address',
      coordinates: ['lat', 'lng'],
      alert_categories: ['Warning'],
      meta_data: {
        location_additional: {
          full_address: 'some address',
          postcode: 'some postcode',
          x_coordinate: 'lat',
          y_coordinate: 'lng',
          internal_reference: 'reference',
          business_criticality: 'High',
          location_type: 'Warehouse',
          action_plan: 'action plan',
          notes: 'some notes',
          keywords: 'keywords'
        }
      }
    },
    {
      name: 'Location_ID9',
      address: 'some address',
      coordinates: ['lat', 'lng'],
      alert_categories: ['Warning', 'Alert'],
      meta_data: {
        location_additional: {
          full_address: 'some address',
          postcode: 'some postcode',
          x_coordinate: 'lat',
          y_coordinate: 'lng',
          internal_reference: 'reference',
          business_criticality: 'Medium',
          location_type: 'Retail space',
          action_plan: 'action plan',
          notes: 'some notes',
          keywords: 'keywords'
        }
      }
    },
    {
      name: 'Location_ID10',
      address: 'some address',
      coordinates: ['lat', 'lng'],
      alert_categories: ['Warning'],
      meta_data: {
        location_additional: {
          full_address: 'some address',
          postcode: 'some postcode',
          x_coordinate: 'lat',
          y_coordinate: 'lng',
          internal_reference: 'reference',
          business_criticality: 'Low',
          location_type: 'Warehouse',
          action_plan: 'action plan',
          notes: 'some notes',
          keywords: 'keywords'
        }
      }
    },
    {
      name: 'Location_ID11',
      address: 'some address',
      coordinates: ['lat', 'lng'],
      alert_categories: ['Warning', 'Alert'],
      meta_data: {
        location_additional: {
          full_address: 'some address',
          postcode: 'some postcode',
          x_coordinate: 'lat',
          y_coordinate: 'lng',
          internal_reference: 'reference',
          business_criticality: 'Medium',
          location_type: 'Office',
          action_plan: 'action plan',
          notes: 'some notes',
          keywords: 'keywords'
        }
      }
    },
    {
      name: 'Location_ID12',
      address: 'some address',
      coordinates: ['lat', 'lng'],
      alert_categories: ['Alert'],
      meta_data: {
        location_additional: {
          full_address: 'some address',
          postcode: 'some postcode',
          x_coordinate: 'lat',
          y_coordinate: 'lng',
          internal_reference: 'reference',
          business_criticality: 'High',
          location_type: 'Warehouse',
          action_plan: 'action plan',
          notes: 'some notes',
          keywords: 'keywords'
        }
      }
    },
    {
      name: 'Location_ID13',
      address: 'some address',
      coordinates: ['lat', 'lng'],
      alert_categories: ['Warning'],
      meta_data: {
        location_additional: {
          full_address: 'some address',
          postcode: 'some postcode',
          x_coordinate: 'lat',
          y_coordinate: 'lng',
          internal_reference: 'reference',
          business_criticality: 'Low',
          location_type: 'Retail space',
          action_plan: 'action plan',
          notes: 'some notes',
          keywords: 'keywords'
        }
      }
    },
    {
      name: 'Location_ID14',
      address: 'some address',
      coordinates: ['lat', 'lng'],
      alert_categories: [],
      meta_data: {
        location_additional: {
          full_address: 'some address',
          postcode: 'some postcode',
          x_coordinate: 'lat',
          y_coordinate: 'lng',
          internal_reference: 'reference',
          business_criticality: 'Medium',
          location_type: 'Warehouse',
          action_plan: 'action plan',
          notes: 'some notes',
          keywords: 'keywords'
        }
      }
    },
    {
      name: 'Location_ID15',
      address: 'some address',
      coordinates: ['lat', 'lng'],
      alert_categories: ['Warning', 'Alert'],
      meta_data: {
        location_additional: {
          full_address: 'some address',
          postcode: 'some postcode',
          x_coordinate: 'lat',
          y_coordinate: 'lng',
          internal_reference: 'reference',
          business_criticality: 'Low',
          location_type: 'Office',
          action_plan: 'action plan',
          notes: 'some notes',
          keywords: 'keywords'
        }
      }
    },
    {
      name: 'Location_ID16',
      address: 'some address',
      coordinates: ['lat', 'lng'],
      alert_categories: [],
      meta_data: {
        location_additional: {
          full_address: 'some address',
          postcode: 'some postcode',
          x_coordinate: 'lat',
          y_coordinate: 'lng',
          internal_reference: 'reference',
          business_criticality: 'High',
          location_type: 'Warehouse',
          action_plan: 'action plan',
          notes: 'some notes',
          keywords: 'keywords'
        }
      }
    },
    {
      name: 'Location_ID17',
      address: 'some address',
      coordinates: ['lat', 'lng'],
      alert_categories: ['Warning'],
      meta_data: {
        location_additional: {
          full_address: 'some address',
          postcode: 'some postcode',
          x_coordinate: 'lat',
          y_coordinate: 'lng',
          internal_reference: 'reference',
          business_criticality: 'Medium',
          location_type: 'Warehouse',
          action_plan: 'action plan',
          notes: 'some notes',
          keywords: 'keywords'
        }
      }
    },
    {
      name: 'Location_ID18',
      address: 'some address',
      coordinates: ['lat', 'lng'],
      alert_categories: ['Alert'],
      meta_data: {
        location_additional: {
          full_address: 'some address',
          postcode: 'some postcode',
          x_coordinate: 'lat',
          y_coordinate: 'lng',
          internal_reference: 'reference',
          business_criticality: 'Low',
          location_type: 'Retail space',
          action_plan: 'action plan',
          notes: 'some notes',
          keywords: 'keywords'
        }
      }
    },
    {
      name: 'Location_ID19',
      address: 'some address',
      coordinates: ['lat', 'lng'],
      alert_categories: ['Warning', 'Alert'],
      meta_data: {
        location_additional: {
          full_address: 'some address',
          postcode: 'some postcode',
          x_coordinate: 'lat',
          y_coordinate: 'lng',
          internal_reference: 'reference',
          business_criticality: 'Medium',
          location_type: 'Office',
          action_plan: 'action plan',
          notes: 'some notes',
          keywords: 'keywords'
        }
      }
    },
    {
      name: 'Location_ID20',
      address: 'some address',
      coordinates: ['lat', 'lng'],
      alert_categories: ['Warning'],
      meta_data: {
        location_additional: {
          full_address: 'some address',
          postcode: 'some postcode',
          x_coordinate: 'lat',
          y_coordinate: 'lng',
          internal_reference: 'reference',
          business_criticality: 'High',
          location_type: 'Warehouse',
          action_plan: 'action plan',
          notes: 'some notes',
          keywords: 'keywords'
        }
      }
    },
    {
      name: 'Location_ID21',
      address: 'some address',
      coordinates: ['lat', 'lng'],
      alert_categories: [],
      meta_data: {
        location_additional: {
          full_address: 'some address',
          postcode: 'some postcode',
          x_coordinate: 'lat',
          y_coordinate: 'lng',
          internal_reference: 'reference',
          business_criticality: 'Low',
          location_type: 'Retail space',
          action_plan: 'action plan',
          notes: 'some notes',
          keywords: 'keywords'
        }
      }
    },
    {
      name: 'Location_ID22',
      address: 'some address',
      coordinates: ['lat', 'lng'],
      alert_categories: ['Warning', 'Alert'],
      meta_data: {
        location_additional: {
          full_address: 'some address',
          postcode: 'some postcode',
          x_coordinate: 'lat',
          y_coordinate: 'lng',
          internal_reference: 'reference',
          business_criticality: 'High',
          location_type: 'Warehouse',
          action_plan: 'action plan',
          notes: 'some notes',
          keywords: 'keywords'
        }
      }
    },
    {
      name: 'Location_ID23',
      address: 'some address',
      coordinates: ['lat', 'lng'],
      alert_categories: ['Warning'],
      meta_data: {
        location_additional: {
          full_address: 'some address',
          postcode: 'some postcode',
          x_coordinate: 'lat',
          y_coordinate: 'lng',
          internal_reference: 'reference',
          business_criticality: 'Medium',
          location_type: 'Warehouse',
          action_plan: 'action plan',
          notes: 'some notes',
          keywords: 'keywords'
        }
      }
    },
    {
      name: 'Location_ID24',
      address: 'some address',
      coordinates: ['lat', 'lng'],
      alert_categories: ['Alert'],
      meta_data: {
        location_additional: {
          full_address: 'some address',
          postcode: 'some postcode',
          x_coordinate: 'lat',
          y_coordinate: 'lng',
          internal_reference: 'reference',
          business_criticality: 'Low',
          location_type: 'Office',
          action_plan: 'action plan',
          notes: 'some notes',
          keywords: 'keywords'
        }
      }
    },
    {
      name: 'Location_ID25',
      address: 'some address',
      coordinates: ['lat', 'lng'],
      alert_categories: ['Warning', 'Alert'],
      meta_data: {
        location_additional: {
          full_address: 'some address',
          postcode: 'some postcode',
          x_coordinate: 'lat',
          y_coordinate: 'lng',
          internal_reference: 'reference',
          business_criticality: 'Medium',
          location_type: 'Retail space',
          action_plan: 'action plan',
          notes: 'some notes',
          keywords: 'keywords'
        }
      }
    },
    {
      name: 'Location_ID26',
      address: 'some address',
      coordinates: ['lat', 'lng'],
      alert_categories: ['Alert'],
      meta_data: {
        location_additional: {
          full_address: 'some address',
          postcode: 'some postcode',
          x_coordinate: 'lat',
          y_coordinate: 'lng',
          internal_reference: 'reference',
          business_criticality: 'High',
          location_type: 'Warehouse',
          action_plan: 'action plan',
          notes: 'some notes',
          keywords: 'keywords'
        }
      }
    },
    {
      name: 'Location_ID27',
      address: 'some address',
      coordinates: ['lat', 'lng'],
      alert_categories: ['Warning'],
      meta_data: {
        location_additional: {
          full_address: 'some address',
          postcode: 'some postcode',
          x_coordinate: 'lat',
          y_coordinate: 'lng',
          internal_reference: 'reference',
          business_criticality: 'Low',
          location_type: 'Warehouse',
          action_plan: 'action plan',
          notes: 'some notes',
          keywords: 'keywords'
        }
      }
    },
    {
      name: 'Location_ID28',
      address: 'some address',
      coordinates: ['lat', 'lng'],
      alert_categories: ['Warning', 'Alert'],
      meta_data: {
        location_additional: {
          full_address: 'some address',
          postcode: 'some postcode',
          x_coordinate: 'lat',
          y_coordinate: 'lng',
          internal_reference: 'reference',
          business_criticality: 'Medium',
          location_type: 'Office',
          action_plan: 'action plan',
          notes: 'some notes',
          keywords: 'keywords'
        }
      }
    }
  ]

  module.exports = {
    allLocations: locations
  }