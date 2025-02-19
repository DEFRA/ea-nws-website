const liveAlerts = {
  total: 6,
  alerts: [
    {
      // location coordinates affected by this flood area to use
      // coordinates: {latitude: 51.499841, longitude: -0.124637}
      // post code affected SW1A 0AA
      id: '1',
      version: 123456,
      name: 'Flood Warning',
      description: { en: 'Flood', additionalLabels: [] },
      effectiveDate: 1734003781, // unix time
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
                polygons: [],
                geocodes: [],
                extraInfo: [
                  {
                    id: 'TA_CODE',
                    value: { s: '063FWT23WestminC' }
                  },
                  {
                    id: 'TA_NAME',
                    value: {
                      s: 'Tidal Thames at Westminster'
                    }
                  }
                ]
              }
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
      name: 'Severe Flood Warning',
      description: { en: 'Flood', additionalLabels: [] },
      effectiveDate: 1734003781, // unix time
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
                polygons: [],
                geocodes: [],
                extraInfo: [
                  {
                    id: 'TA_CODE',
                    value: { s: '113WACT1D' }
                  },
                  {
                    id: 'TA_NAME',
                    value: {
                      s: 'South Devon Estuaries'
                    }
                  }
                ]
              }
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
      name: 'Flood Alert Warning',
      description: { en: 'Flood', additionalLabels: [] },
      effectiveDate: 1734003781, // unix time
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
                polygons: [],
                geocodes: [],
                extraInfo: [
                  {
                    id: 'TA_CODE',
                    value: { s: '011WAFDU' }
                  },
                  {
                    id: 'TA_NAME',
                    value: {
                      s: 'Rivers Duddon, Crake and Mill Beck'
                    }
                  }
                ]
              }
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
      name: 'Severe Flood Warning',
      description: { en: 'Flood', additionalLabels: [] },
      effectiveDate: 1734003781, // unix time
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
                geocodes: [],
                extraInfo: [
                  {
                    id: 'TA_CODE',
                    value: { s: '122WAF946' }
                  },
                  {
                    id: 'TA_NAME',
                    value: {
                      s: 'River Ouse, Burdyke, Holgate Beck, Blue Beck, River Foss, The Fleet'
                    }
                  }
                ]
              }
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
      effectiveDate: 1734003781, // unix time
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
                polygons: [],
                geocodes: [],
                extraInfo: [
                  {
                    id: 'TA_CODE',
                    value: { s: '122WAF946' }
                  },
                  {
                    id: 'TA_NAME',
                    value: {
                      s: 'Upper River Ouse'
                    }
                  }
                ]
              }
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
      effectiveDate: 1734003781, // unix time
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
                polygons: [],
                geocodes: [],
                extraInfo: [
                  {
                    id: 'TA_CODE',
                    value: { s: '122FWF776' }
                  },
                  {
                    id: 'TA_NAME',
                    value: {
                      s: 'River Foss at Layerthorpe to Foss Islands Road, Stonebow and Piccadilly'
                    }
                  }
                ]
              }
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
      effectiveDate: 1734003781, // unix time
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
                polygons: [],
                geocodes: [],
                extraInfo: [
                  {
                    id: 'TA_CODE',
                    value: { s: '051FWFEF4B' }
                  },
                  {
                    id: 'TA_NAME',
                    value: {
                      s: 'The River Colne from Halstead to Lexden'
                    }
                  }
                ]
              }
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
      effectiveDate: 1734003781, // unix time
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
                polygons: [],
                geocodes: [],
                extraInfo: [
                  {
                    id: 'TA_CODE',
                    value: { s: '055FWFPLNE01' }
                  },
                  {
                    id: 'TA_NAME',
                    value: {
                      s: 'The River Nene'
                    }
                  }
                ]
              }
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
      // this is affecting Gloucester
      id: '7',
      version: 123456,
      name: 'Flood warning',
      description: { en: 'Flood', additionalLabels: [] },
      effectiveDate: 1734003781, // unix time
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
              name: 'The River Severn',
              geometry: {
                rings: [],
                circles: [],
                polygons: [],
                geocodes: [],
                extraInfo: [
                  {
                    id: 'TA_CODE',
                    value: { s: '031FWBSE590' }
                  },
                  {
                    id: 'TA_NAME',
                    value: {
                      s: 'The River Severn'
                    }
                  }
                ]
              }
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
      // this is affecting Gloucester
      id: '8',
      version: 123456,
      name: 'Flood warning',
      description: { en: 'Flood', additionalLabels: [] },
      effectiveDate: 1734003781, // unix time
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
              name: 'Severn estuary from Gloucester to Sharpness',
              geometry: {
                rings: [],
                circles: [],
                polygons: [],
                geocodes: [],
                extraInfo: [
                  {
                    id: 'TA_CODE',
                    value: { s: '031WAT217' }
                  },
                  {
                    id: 'TA_NAME',
                    value: {
                      s: 'Severn estuary from Gloucester to Sharpness'
                    }
                  }
                ]
              }
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
  liveAlerts: liveAlerts
}
