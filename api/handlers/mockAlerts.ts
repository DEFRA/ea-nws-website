function getRandomPastUnixBeforeXdays(
  minDaysAgo: number,
  maxDaysAgo: number
): number {
  const now = Date.now()

  const minDaysAgoMs = minDaysAgo * 24 * 60 * 60 * 1000
  const maxDaysAgoMs = maxDaysAgo * 24 * 60 * 60 * 1000

  const max = now - minDaysAgoMs
  const min = now - maxDaysAgoMs

  const randomPastMs = Math.floor(Math.random() * (max - min) + min)

  return Math.floor(randomPastMs / 1000)
}

const alerts = [
  {
    //  issue warning alert - issue warning alert for TA Code 051FWFEF4B
    id: '1',
    version: 123456,
    name: 'issueFloodWarning',
    description: { en: 'Flood', additionalLabels: [] },
    effectiveDate: getRandomPastUnixBeforeXdays(2, 4), // unix time
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
    // remove alert - remove alert for TA Code 122WAF946
    id: '3',
    version: 123456,
    name: 'removeFloodAlert',
    description: { en: 'Flood', additionalLabels: [] },
    effectiveDate: getRandomPastUnixBeforeXdays(0, 1), // unix time
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
    // issue alert - issue alert for TA Code 122WAF946
    id: '7',
    version: 123456,
    name: 'issueFloodAlert',
    description: { en: 'Flood', additionalLabels: [] },
    effectiveDate: getRandomPastUnixBeforeXdays(6, 8), // unix time
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
    // remove warning alert - remove warning for TA Code 113WACT1D
    id: '6',
    version: 123456,
    name: 'removeFloodWarning', // name must have remove
    description: { en: 'Flood', additionalLabels: [] },
    effectiveDate: getRandomPastUnixBeforeXdays(0, 1), // unix time
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
    // update warning alert - update to warning for TA Code 113WACT1D
    id: '6',
    version: 123456,
    name: 'updateFloodWarning',
    description: { en: 'Flood', additionalLabels: [] },
    effectiveDate: getRandomPastUnixBeforeXdays(10, 11), // unix time
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
    // issue severe warning alert - issue severe warning for TA Code 113WACT1D
    id: '5',
    version: 123456,
    name: 'issueSevereFloodWarning', //name must contain issue
    description: { en: 'Flood', additionalLabels: [] },
    effectiveDate: getRandomPastUnixBeforeXdays(14, 17), // unix time
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
    // remove warning alert - remove warning for TA Code 063FWT23WestminC
    id: '4',
    version: 123456,
    name: 'removeSevereFloodwarning', // remove must be included in the name
    description: { en: 'Flood', additionalLabels: [] },
    effectiveDate: getRandomPastUnixBeforeXdays(8, 10), // unix time
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
    // update severe warning alert - downgraded to warning for TA Code 063FWT23WestminC
    id: '3',
    version: 123456,
    name: 'updateSevereFloodwarning', // update must be included in the name
    description: { en: 'Flood', additionalLabels: [] },
    effectiveDate: getRandomPastUnixBeforeXdays(12, 14), // unix time
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
    // update warning alert - upgraded to severe warning for TA Code 063FWT23WestminC
    id: '2',
    version: 123456,
    name: 'updateSevereFloodwarning', // update must be included in the name
    description: { en: 'Flood', additionalLabels: [] },
    effectiveDate: getRandomPastUnixBeforeXdays(15, 17), // unix time
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
    // issue warning alert - warning for TA Code 063FWT23WestminC
    id: '1',
    version: 123456,
    name: 'issueFloodWarning', // issue must be included in the name
    description: { en: 'Flood', additionalLabels: [] },
    effectiveDate: getRandomPastUnixBeforeXdays(18, 20), // unix time
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
  }
]

module.exports = {
  alerts: alerts,
  alertsTotal: alerts.length
}
