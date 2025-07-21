function getRandomPastUnixOlderThan2Weeks() {
  const now = Date.now() // current time in ms
  const twoWeeksInMs = 14 * 24 * 60 * 60 * 1000

  const max = now - twoWeeksInMs // latest allowed date = 2 weeks ago
  const min = new Date(2000, 0, 1).getTime() // earliest reasonable date (customize if needed)

  const randomPastMs = Math.floor(Math.random() * (max - min) + min)

  return Math.floor(randomPastMs / 1000) // convert to Unix seconds
}

function getRandomRecentDateUnix() {
  const now = Date.now() // current time in ms
  const oneDayInMs = 24 * 60 * 60 * 1000

  const randomMsAgo = Math.floor(Math.random() * oneDayInMs)
  const randomRecentDate = new Date(now - randomMsAgo)

  return Math.floor(randomRecentDate.getTime() / 1000) // Unix timestamp (seconds)
}

const pastAlerts = {
  total: 6,
  alerts: [
    {
      // location coordinates affected by this flood area to use
      // coordinates: {latitude: 51.499841, longitude: -0.124637}
      // post code affected SW1A 0AA
      id: '1',
      version: 123456,
      name: 'Flood warning',
      description: { en: 'Flood', additionalLabels: [] },
      effectiveDate: getRandomRecentDateUnix(), // unix time
      expirationDate: 1734004381,
      duration: {},
      urgency: 'IMMEDIATE',
      severity: 'SEVERE',
      certainty: 'OBSERVED',
      mode: {
        zoneDesc: {
          name: '063FWT23WestminC',
          placemarks: [
            {
              id: '0',
              name: 'River Thames at Westminster including St James Park, Victoria and Westminster Cathedral',
              geometry: {
                rings: [],
                circles: [],
                polygons: []
              },
              geocodes: [],
              extraInfo: [
                {
                  key: 'TA_CODE',
                  value: { s: '063FWT23WestminC' }
                },
                {
                  key: 'TA_Name',
                  value: {
                    s: 'Tidal Thames at Westminster'
                  }
                },
                {
                  key: 'createddate',
                  value: {
                    s: '12/03/2025 13:21:00'
                  }
                },
                {
                  key: 'lastmodifieddate',
                  value: {
                    s: '16/03/2025 10:21:00'
                  }
                }
              ]
            }
          ]
        }
      },
      channels: [{ channelId: '1', placemarks: [0], countryCodes: [] }],
      type: 'ALERT_LVL_2',
      sender: '',
      scope: 'PUBLIC',
      capStatus: 'ACTUAL',
      categories: ['MET'],
      eventType: {
        en: 'Flood',
        additionalLabels: []
      },
      eventCode: { domain: 'NWS', code: 'FLOOD' },
      execution: {},
      workspaceId: '1',
      workspaceName: 'National Workspace'
    },
    {
      // location coordinates affected by this flood area to use
      // coordinates: { latitude: 50.702613, longitude: longitude: -3.504911 },
      // coords of flood area in qgis 50.742498, -3.551729
      // postcode affected EX2 6LL
      id: '2',
      version: 123456,
      name: 'Severe flood warning',
      description: { en: 'Flood', additionalLabels: [] },
      effectiveDate: getRandomRecentDateUnix(), // unix time
      expirationDate: 1734004381,
      duration: {},
      urgency: 'SEVERE',
      severity: 'MINOR',
      certainty: 'OBSERVED',
      mode: {
        zoneDesc: {
          name: '113WACT1D',
          placemarks: [
            {
              id: '0',
              name: 'South Devon Estuaries',
              geometry: {
                rings: [],
                circles: [],
                polygons: []
              },
              geocodes: [],
              extraInfo: [
                {
                  key: 'TA_CODE',
                  value: { s: '113WACT1D' }
                },
                {
                  key: 'TA_Name',
                  value: {
                    s: 'South Devon Estuaries'
                  }
                },
                {
                  key: 'createddate',
                  value: {
                    s: '12/03/2025 13:21:00'
                  }
                },
                {
                  key: 'lastmodifieddate',
                  value: {
                    s: '16/03/2025 10:21:00'
                  }
                }
              ]
            }
          ]
        }
      },
      channels: [{ channelId: '1', placemarks: [0], countryCodes: [] }],
      type: 'ALERT_LVL_1',
      sender: '',
      scope: 'PUBLIC',
      capStatus: 'ACTUAL',
      categories: ['MET'],
      eventType: {
        en: 'Flood',
        additionalLabels: []
      },
      eventCode: { domain: 'NWS', code: 'FLOOD' },
      execution: {},
      workspaceId: '1',
      workspaceName: 'National Workspace'
    },
    {
      // location coordinates affected by this flood area to use
      // coordinates: { latitude: 54.18924462, longitude: longitude: -3.06762096 },
      // postcode affected LA12 7BX
      id: '3',
      version: 123456,
      name: 'Flood alert warning',
      description: { en: 'Flood', additionalLabels: [] },
      effectiveDate: getRandomPastUnixOlderThan2Weeks, // unix time
      expirationDate: 1734004381,
      duration: {},
      urgency: 'SEVERE',
      severity: 'MINOR',
      certainty: 'OBSERVED',
      mode: {
        zoneDesc: {
          name: '011WAFDU',
          placemarks: [
            {
              id: '0',
              name: 'South Devon Estuaries',
              geometry: {
                rings: [],
                circles: [],
                polygons: []
              },
              geocodes: [],
              extraInfo: [
                {
                  key: 'TA_CODE',
                  value: { s: '011WAFDU' }
                },
                {
                  key: 'TA_Name',
                  value: {
                    s: 'Rivers Duddon, Crake and Mill Beck'
                  }
                },
                {
                  key: 'createddate',
                  value: {
                    s: '04/03/2025 11:10:00'
                  }
                },
                {
                  key: 'lastmodifieddate',
                  value: {
                    s: '05/03/2025 08:45:00'
                  }
                }
              ]
            }
          ]
        }
      },
      channels: [{ channelId: '1', placemarks: [0], countryCodes: [] }],
      type: 'ALERT_LVL_3',
      sender: '',
      scope: 'PUBLIC',
      capStatus: 'ACTUAL',
      categories: ['MET'],
      eventType: {
        en: 'Flood',
        additionalLabels: []
      },
      eventCode: { domain: 'NWS', code: 'FLOOD' },
      execution: {},
      workspaceId: '1',
      workspaceName: 'National Workspace'
    },
    {
      // this is affecting a boundary - York
      id: '4',
      version: 123456,
      name: 'Severe flood warning',
      description: { en: 'Flood', additionalLabels: [] },
      effectiveDate: getRandomPastUnixOlderThan2Weeks, // unix time
      expirationDate: 1734004381,
      duration: {},
      urgency: 'SEVERE',
      severity: 'MINOR',
      certainty: 'OBSERVED',
      mode: {
        zoneDesc: {
          name: '122WAF946',
          placemarks: [
            {
              id: '0',
              name: 'River Ouse, Burdyke, Holgate Beck, Blue Beck, River Foss, The Fleet',
              geometry: {
                rings: [],
                circles: [],
                polygons: [],
                geocodes: []
              },
              geocodes: [],
              extraInfo: [
                {
                  key: 'TA_CODE',
                  value: { s: '122WAF946' }
                },
                {
                  key: 'TA_Name',
                  value: {
                    s: 'River Ouse, Burdyke, Holgate Beck, Blue Beck, River Foss, The Fleet'
                  }
                },
                {
                  key: 'createddate',
                  value: {
                    s: '04/03/2025 11:10:00'
                  }
                },
                {
                  key: 'lastmodifieddate',
                  value: {
                    s: '05/03/2025 08:45:00'
                  }
                }
              ]
            }
          ]
        }
      },
      channels: [{ channelId: '1', placemarks: [0], countryCodes: [] }],
      type: 'ALERT_LVL_1',
      sender: '',
      scope: 'PUBLIC',
      capStatus: 'ACTUAL',
      categories: ['MET'],
      eventType: {
        en: 'Flood',
        additionalLabels: []
      },
      eventCode: { domain: 'NWS', code: 'FLOOD' },
      execution: {},
      workspaceId: '1',
      workspaceName: 'National Workspace'
    },
    {
      // this is affecting a boundary - York
      id: '5',
      version: 123456,
      name: 'Flood alert',
      description: { en: 'Flood', additionalLabels: [] },
      effectiveDate: getRandomPastUnixOlderThan2Weeks, // unix time
      expirationDate: 1734004381,
      duration: {},
      urgency: 'SEVERE',
      severity: 'MINOR',
      certainty: 'OBSERVED',
      mode: {
        zoneDesc: {
          name: '122WAF946',
          placemarks: [
            {
              id: '0',
              name: 'Upper River Ouse',
              geometry: {
                rings: [],
                circles: [],
                polygons: []
              },
              geocodes: [],
              extraInfo: [
                {
                  key: 'TA_CODE',
                  value: { s: '122WAF946' }
                },
                {
                  key: 'TA_Name',
                  value: {
                    s: 'Upper River Ouse'
                  }
                },
                {
                  key: 'createddate',
                  value: {
                    s: '04/03/2025 11:10:00'
                  }
                },
                {
                  key: 'lastmodifieddate',
                  value: {
                    s: '05/03/2025 08:45:00'
                  }
                }
              ]
            }
          ]
        }
      },
      channels: [{ channelId: '1', placemarks: [0], countryCodes: [] }],
      type: 'ALERT_LVL_3',
      sender: '',
      scope: 'PUBLIC',
      capStatus: 'ACTUAL',
      categories: ['MET'],
      eventType: {
        en: 'Flood',
        additionalLabels: []
      },
      eventCode: { domain: 'NWS', code: 'FLOOD' },
      execution: {},
      workspaceId: '1',
      workspaceName: 'National Workspace'
    },
    {
      // this is affecting a boundary - York
      id: '6',
      version: 123456,
      name: 'Flood warning',
      description: { en: 'Flood', additionalLabels: [] },
      effectiveDate: getRandomPastUnixOlderThan2Weeks, // unix time
      expirationDate: 1734004381,
      duration: {},
      urgency: 'SEVERE',
      severity: 'MINOR',
      certainty: 'OBSERVED',
      mode: {
        zoneDesc: {
          name: '122FWF776',
          placemarks: [
            {
              id: '0',
              name: 'River Foss at Layerthorpe to Foss Islands Road, Stonebow and Piccadilly',
              geometry: {
                rings: [],
                circles: [],
                polygons: []
              },
              geocodes: [],
              extraInfo: [
                {
                  key: 'TA_CODE',
                  value: { s: '122FWF776' }
                },
                {
                  key: 'TA_Name',
                  value: {
                    s: 'River Foss at Layerthorpe to Foss Islands Road, Stonebow and Piccadilly'
                  }
                },
                {
                  key: 'createddate',
                  value: {
                    s: '10/03/2025 09:30:00'
                  }
                },
                {
                  key: 'lastmodifieddate',
                  value: {
                    s: '11/03/2025 15:40:00'
                  }
                }
              ]
            }
          ]
        }
      },
      channels: [{ channelId: '1', placemarks: [0], countryCodes: [] }],
      type: 'ALERT_LVL_2',
      sender: '',
      scope: 'PUBLIC',
      capStatus: 'ACTUAL',
      categories: ['MET'],
      eventType: {
        en: 'Flood',
        additionalLabels: []
      },
      eventCode: { domain: 'NWS', code: 'FLOOD' },
      execution: {},
      workspaceId: '1',
      workspaceName: 'National Workspace'
    },
    {
      // this is affecting a Halstead
      id: '6',
      version: 123456,
      name: 'Flood warning',
      description: { en: 'Flood', additionalLabels: [] },
      effectiveDate: getRandomPastUnixOlderThan2Weeks, // unix time
      expirationDate: 1734004381,
      duration: {},
      urgency: 'SEVERE',
      severity: 'MINOR',
      certainty: 'OBSERVED',
      mode: {
        zoneDesc: {
          name: '051FWFEF4B',
          placemarks: [
            {
              id: '0',
              name: 'The River Colne from Halstead to Lexden',
              geometry: {
                rings: [],
                circles: [],
                polygons: []
              },
              geocodes: [],
              extraInfo: [
                {
                  key: 'TA_CODE',
                  value: { s: '051FWFEF4B' }
                },
                {
                  key: 'TA_Name',
                  value: {
                    s: 'The River Colne from Halstead to Lexden'
                  }
                },
                {
                  key: 'createddate',
                  value: {
                    s: '10/03/2025 09:30:00'
                  }
                },
                {
                  key: 'lastmodifieddate',
                  value: {
                    s: '11/03/2025 15:40:00'
                  }
                }
              ]
            }
          ]
        }
      },
      channels: [{ channelId: '1', placemarks: [0], countryCodes: [] }],
      type: 'ALERT_LVL_2',
      sender: '',
      scope: 'PUBLIC',
      capStatus: 'ACTUAL',
      categories: ['MET'],
      eventType: {
        en: 'Flood',
        additionalLabels: []
      },
      eventCode: { domain: 'NWS', code: 'FLOOD' },
      execution: {},
      workspaceId: '1',
      workspaceName: 'National Workspace'
    },
    {
      // this is affecting Peterborough
      id: '7',
      version: 123456,
      name: 'Flood warning',
      description: { en: 'Flood', additionalLabels: [] },
      effectiveDate: getRandomPastUnixOlderThan2Weeks, // unix time
      expirationDate: 1734004381,
      duration: {},
      urgency: 'SEVERE',
      severity: 'MINOR',
      certainty: 'OBSERVED',
      mode: {
        zoneDesc: {
          name: '055FWFPLNE01',
          placemarks: [
            {
              id: '0',
              name: 'The River Nene',
              geometry: {
                rings: [],
                circles: [],
                polygons: []
              },
              geocodes: [],
              extraInfo: [
                {
                  key: 'TA_CODE',
                  value: { s: '055FWFPLNE01' }
                },
                {
                  key: 'TA_Name',
                  value: {
                    s: 'The River Nene'
                  }
                },
                {
                  key: 'createddate',
                  value: {
                    s: '10/03/2025 09:30:00'
                  }
                },
                {
                  key: 'lastmodifieddate',
                  value: {
                    s: '11/03/2025 15:40:00'
                  }
                }
              ]
            }
          ]
        }
      },
      channels: [{ channelId: '1', placemarks: [0], countryCodes: [] }],
      type: 'ALERT_LVL_1',
      sender: '',
      scope: 'PUBLIC',
      capStatus: 'ACTUAL',
      categories: ['MET'],
      eventType: {
        en: 'Flood',
        additionalLabels: []
      },
      eventCode: { domain: 'NWS', code: 'FLOOD' },
      execution: {},
      workspaceId: '1',
      workspaceName: 'National Workspace'
    },
    {
      // this is affecting Liverpool
      id: '9',
      version: 123456,
      name: 'Flood warning',
      description: { en: 'Flood', additionalLabels: [] },
      effectiveDate: getRandomPastUnixOlderThan2Weeks, // unix time
      expirationDate: 1734004381,
      duration: {},
      urgency: 'SEVERE',
      severity: 'MINOR',
      certainty: 'OBSERVED',
      mode: {
        zoneDesc: {
          name: '031FWBSE590',
          placemarks: [
            {
              id: '0',
              name: 'Irish Sea and Mersey estuary from the Head of the Wirral to Runcorn',
              geometry: {
                rings: [],
                circles: [],
                polygons: []
              },
              geocodes: [],
              extraInfo: [
                {
                  key: 'TA_CODE',
                  value: { s: '013FWTTME8' }
                },
                {
                  key: 'TA_Name',
                  value: {
                    s: 'Irish Sea and Mersey estuary from the Head of the Wirral to Runcorn'
                  }
                },
                {
                  key: 'createddate',
                  value: {
                    s: '10/03/2025 09:30:00'
                  }
                },
                {
                  key: 'lastmodifieddate',
                  value: {
                    s: '11/03/2025 15:40:00'
                  }
                }
              ]
            }
          ]
        }
      },
      channels: [{ channelId: '1', placemarks: [0], countryCodes: [] }],
      type: 'ALERT_LVL_2',
      sender: '',
      scope: 'PUBLIC',
      capStatus: 'ACTUAL',
      categories: ['MET'],
      eventType: {
        en: 'Flood',
        additionalLabels: []
      },
      eventCode: { domain: 'NWS', code: 'FLOOD' },
      execution: {},
      workspaceId: '1',
      workspaceName: 'National Workspace'
    },
    {
      // this is affecting Liverpool
      id: '10',
      version: 123456,
      name: 'Flood warning',
      description: { en: 'Flood', additionalLabels: [] },
      effectiveDate: getRandomPastUnixOlderThan2Weeks, // unix time
      expirationDate: 1734004381,
      duration: {},
      urgency: 'SEVERE',
      severity: 'MINOR',
      certainty: 'OBSERVED',
      mode: {
        zoneDesc: {
          name: '013WAFWI',
          placemarks: [
            {
              id: '0',
              name: 'Wirral catchment with Heswall, Ellesmere Port, Bebington, Hoylake and Wallasey',
              geometry: {
                rings: [],
                circles: [],
                polygons: []
              },
              geocodes: [],
              extraInfo: [
                {
                  key: 'TA_CODE',
                  value: { s: '013WAFWI' }
                },
                {
                  key: 'TA_Name',
                  value: {
                    s: 'Wirral catchment with Heswall, Ellesmere Port, Bebington, Hoylake and Wallasey'
                  }
                },
                {
                  key: 'createddate',
                  value: {
                    s: '10/03/2025 09:30:00'
                  }
                },
                {
                  key: 'lastmodifieddate',
                  value: {
                    s: '11/03/2025 15:40:00'
                  }
                }
              ]
            }
          ]
        }
      },
      channels: [{ channelId: '1', placemarks: [0], countryCodes: [] }],
      type: 'ALERT_LVL_3',
      sender: '',
      scope: 'PUBLIC',
      capStatus: 'ACTUAL',
      categories: ['MET'],
      eventType: {
        en: 'Flood',
        additionalLabels: []
      },
      eventCode: { domain: 'NWS', code: 'FLOOD' },
      execution: {},
      workspaceId: '1',
      workspaceName: 'National Workspace'
    },
    {
      // this is affecting Liverpool
      id: '10',
      version: 123456,
      name: 'Severe flood warning',
      description: { en: 'Flood', additionalLabels: [] },
      effectiveDate: getRandomPastUnixOlderThan2Weeks, // unix time
      expirationDate: 1734004381,
      duration: {},
      urgency: 'SEVERE',
      severity: 'MINOR',
      certainty: 'OBSERVED',
      mode: {
        zoneDesc: {
          name: '034FWFTRNOTTCITY',
          placemarks: [
            {
              id: '0',
              name: 'River Trent at Nottingham including The Meadows',
              geometry: {
                rings: [],
                circles: [],
                polygons: []
              },
              geocodes: [],
              extraInfo: [
                {
                  key: 'TA_CODE',
                  value: { s: '034FWFTRNOTTCITY' }
                },
                {
                  key: 'TA_Name',
                  value: {
                    s: 'River Trent at Nottingham including The Meadows'
                  }
                },
                {
                  key: 'createddate',
                  value: {
                    s: '20/03/2025 14:10:00'
                  }
                },
                {
                  key: 'lastmodifieddate',
                  value: {
                    s: '21/03/2025 11:55:00'
                  }
                }
              ]
            }
          ]
        }
      },
      channels: [{ channelId: '1', placemarks: [0], countryCodes: [] }],
      type: 'ALERT_LVL_1',
      sender: '',
      scope: 'PUBLIC',
      capStatus: 'ACTUAL',
      categories: ['MET'],
      eventType: {
        en: 'Flood',
        additionalLabels: []
      },
      eventCode: { domain: 'NWS', code: 'FLOOD' },
      execution: {},
      workspaceId: '1',
      workspaceName: 'National Workspace'
    },
    {
      // this is affecting chester
      id: '11',
      version: 123456,
      name: 'Flood warning',
      description: { en: 'Flood', additionalLabels: [] },
      effectiveDate: getRandomPastUnixOlderThan2Weeks, // unix time
      expirationDate: 1734004381,
      duration: {},
      urgency: 'SEVERE',
      severity: 'MINOR',
      certainty: 'OBSERVED',
      mode: {
        zoneDesc: {
          name: '034FWFDELITTLECH',
          placemarks: [
            {
              id: '0',
              name: 'River Derwent at Little Chester, Eastgate and Cattle Market',
              geometry: {
                rings: [],
                circles: [],
                polygons: []
              },
              geocodes: [],
              extraInfo: [
                {
                  key: 'TA_CODE',
                  value: { s: '034FWFDELITTLECH' }
                },
                {
                  key: 'TA_Name',
                  value: {
                    s: 'River Derwent at Little Chester, Eastgate and Cattle Market'
                  }
                },
                {
                  key: 'createddate',
                  value: {
                    s: '20/03/2025 14:10:00'
                  }
                },
                {
                  key: 'lastmodifieddate',
                  value: {
                    s: '21/03/2025 11:55:00'
                  }
                }
              ]
            }
          ]
        }
      },
      channels: [{ channelId: '1', placemarks: [0], countryCodes: [] }],
      type: 'ALERT_LVL_2',
      sender: '',
      scope: 'PUBLIC',
      capStatus: 'ACTUAL',
      categories: ['MET'],
      eventType: {
        en: 'Flood',
        additionalLabels: []
      },
      eventCode: { domain: 'NWS', code: 'FLOOD' },
      execution: {},
      workspaceId: '1',
      workspaceName: 'National Workspace'
    },
    {
      // this is affecting Nottingham
      id: '12',
      version: 123456,
      name: 'Flood warning',
      description: { en: 'Flood', additionalLabels: [] },
      effectiveDate: getRandomPastUnixOlderThan2Weeks, // unix time
      expirationDate: 1734004381,
      duration: {},
      urgency: 'SEVERE',
      severity: 'MINOR',
      certainty: 'OBSERVED',
      mode: {
        zoneDesc: {
          name: '034WAF409',
          placemarks: [
            {
              id: '0',
              name: 'River Derwent from Rowsley to the River Trent at Shardlow',
              geometry: {
                rings: [],
                circles: [],
                polygons: []
              },
              geocodes: [],
              extraInfo: [
                {
                  key: 'TA_CODE',
                  value: { s: '034WAF409' }
                },
                {
                  key: 'TA_Name',
                  value: {
                    s: 'River Derwent from Rowsley to the River Trent at Shardlow'
                  }
                },
                {
                  key: 'createddate',
                  value: {
                    s: '25/03/2025 08:15:00'
                  }
                },
                {
                  key: 'lastmodifieddate',
                  value: {
                    s: '26/03/2025 16:00:00'
                  }
                }
              ]
            }
          ]
        }
      },
      channels: [{ channelId: '1', placemarks: [0], countryCodes: [] }],
      type: 'ALERT_LVL_3',
      sender: '',
      scope: 'PUBLIC',
      capStatus: 'ACTUAL',
      categories: ['MET'],
      eventType: {
        en: 'Flood',
        additionalLabels: []
      },
      eventCode: { domain: 'NWS', code: 'FLOOD' },
      execution: {},
      workspaceId: '1',
      workspaceName: 'National Workspace'
    },
    {
      // this is affecting Hereford
      id: '13',
      version: 123456,
      name: 'Flood warning',
      description: { en: 'Flood', additionalLabels: [] },
      effectiveDate: getRandomPastUnixOlderThan2Weeks, // unix time
      expirationDate: 1734004381,
      duration: {},
      urgency: 'SEVERE',
      severity: 'MINOR',
      certainty: 'OBSERVED',
      mode: {
        zoneDesc: {
          name: '031FWFWY110',
          placemarks: [
            {
              id: '0',
              name: 'River Wye in North Hereford',
              geometry: {
                rings: [],
                circles: [],
                polygons: []
              },
              geocodes: [],
              extraInfo: [
                {
                  key: 'TA_CODE',
                  value: { s: '031FWFWY110' }
                },
                {
                  key: 'TA_Name',
                  value: {
                    s: 'River Wye in North Hereford'
                  }
                },
                {
                  key: 'createddate',
                  value: {
                    s: '25/03/2025 08:15:00'
                  }
                },
                {
                  key: 'lastmodifieddate',
                  value: {
                    s: '26/03/2025 16:00:00'
                  }
                }
              ]
            }
          ]
        }
      },
      channels: [{ channelId: '1', placemarks: [0], countryCodes: [] }],
      type: 'ALERT_LVL_2',
      sender: '',
      scope: 'PUBLIC',
      capStatus: 'ACTUAL',
      categories: ['MET'],
      eventType: {
        en: 'Flood',
        additionalLabels: []
      },
      eventCode: { domain: 'NWS', code: 'FLOOD' },
      execution: {},
      workspaceId: '1',
      workspaceName: 'National Workspace'
    },
    {
      // this is affecting Hereford
      id: '14',
      version: 123456,
      name: 'Flood warning',
      description: { en: 'Flood', additionalLabels: [] },
      effectiveDate: getRandomPastUnixOlderThan2Weeks, // unix time
      expirationDate: 1734004381,
      duration: {},
      urgency: 'SEVERE',
      severity: 'MINOR',
      certainty: 'OBSERVED',
      mode: {
        zoneDesc: {
          name: '031WAF119',
          placemarks: [
            {
              id: '0',
              name: 'River Wye in North Hereford',
              geometry: {
                rings: [],
                circles: [],
                polygons: []
              },
              geocodes: [],
              extraInfo: [
                {
                  key: 'TA_CODE',
                  value: { s: '031WAF119' }
                },
                {
                  key: 'TA_Name',
                  value: {
                    s: 'River Wye in North Hereford'
                  }
                },
                {
                  key: 'createddate',
                  value: {
                    s: '25/03/2025 08:15:00'
                  }
                },
                {
                  key: 'lastmodifieddate',
                  value: {
                    s: '26/03/2025 16:00:00'
                  }
                }
              ]
            }
          ]
        }
      },
      channels: [{ channelId: '1', placemarks: [0], countryCodes: [] }],
      type: 'ALERT_LVL_3',
      sender: '',
      scope: 'PUBLIC',
      capStatus: 'ACTUAL',
      categories: ['MET'],
      eventType: {
        en: 'Flood',
        additionalLabels: []
      },
      eventCode: { domain: 'NWS', code: 'FLOOD' },
      execution: {},
      workspaceId: '1',
      workspaceName: 'National Workspace'
    },
    {
      // this is affecting Southampton
      id: '15',
      version: 123456,
      name: 'Flood warning',
      description: { en: 'Flood', additionalLabels: [] },
      effectiveDate: getRandomPastUnixOlderThan2Weeks, // unix time
      expirationDate: 1734004381,
      duration: {},
      urgency: 'SEVERE',
      severity: 'MINOR',
      certainty: 'OBSERVED',
      mode: {
        zoneDesc: {
          name: '065FWC0501',
          placemarks: [
            {
              id: '0',
              name: 'Itchen estuary',
              geometry: {
                rings: [],
                circles: [],
                polygons: []
              },
              geocodes: [],
              extraInfo: [
                {
                  key: 'TA_CODE',
                  value: { s: '065FWC0501' }
                },
                {
                  key: 'TA_Name',
                  value: {
                    s: 'Itchen estuary'
                  }
                },
                {
                  key: 'createddate',
                  value: {
                    s: '25/03/2025 08:15:00'
                  }
                },
                {
                  key: 'lastmodifieddate',
                  value: {
                    s: '26/03/2025 16:00:00'
                  }
                }
              ]
            }
          ]
        }
      },
      channels: [{ channelId: '1', placemarks: [0], countryCodes: [] }],
      type: 'ALERT_LVL_2',
      sender: '',
      scope: 'PUBLIC',
      capStatus: 'ACTUAL',
      categories: ['MET'],
      eventType: {
        en: 'Flood',
        additionalLabels: []
      },
      eventCode: { domain: 'NWS', code: 'FLOOD' },
      execution: {},
      workspaceId: '1',
      workspaceName: 'National Workspace'
    },
    {
      // this is affecting Southampton
      id: '16',
      version: 123456,
      name: 'Flood alert',
      description: { en: 'Flood', additionalLabels: [] },
      effectiveDate: getRandomPastUnixOlderThan2Weeks, // unix time
      expirationDate: 1734004381,
      duration: {},
      urgency: 'SEVERE',
      severity: 'MINOR',
      certainty: 'OBSERVED',
      mode: {
        zoneDesc: {
          name: '065WAC151',
          placemarks: [
            {
              id: '0',
              name: 'Southampton Water and Hamble',
              geometry: {
                rings: [],
                circles: [],
                polygons: []
              },
              geocodes: [],
              extraInfo: [
                {
                  key: 'TA_CODE',
                  value: { s: '065WAC151' }
                },
                {
                  key: 'TA_Name',
                  value: {
                    s: 'Southampton Water and Hamble'
                  }
                },
                {
                  key: 'createddate',
                  value: {
                    s: '25/03/2025 08:15:00'
                  }
                },
                {
                  key: 'lastmodifieddate',
                  value: {
                    s: '26/03/2025 16:00:00'
                  }
                }
              ]
            }
          ]
        }
      },
      channels: [{ channelId: '1', placemarks: [0], countryCodes: [] }],
      type: 'ALERT_LVL_3',
      sender: '',
      scope: 'PUBLIC',
      capStatus: 'ACTUAL',
      categories: ['MET'],
      eventType: {
        en: 'Flood',
        additionalLabels: []
      },
      eventCode: { domain: 'NWS', code: 'FLOOD' },
      execution: {},
      workspaceId: '1',
      workspaceName: 'National Workspace'
    }
  ]
}

module.exports = {
  pastAlerts: pastAlerts
}
