const liveAlerts = {
  total: 6,
  alerts: [
    {
      // location coordinates affected by this flood area to use
      // coordinates: {"latitude": 51.499841, "longitude": -0.124637}
      id: '1',
      version: 123456,
      name: 'Severe Flood Warning',
      description: { en: 'Flood', additionalLabels: [] },
      effectiveDate: 1734003781, // unix time
      expirationDate: 1734004381,
      duration: {},
      urgency: 'IMMEDIATE',
      severity: 'SEVERE',
      certainty: 'OBSERVED',
      mode: {
        zoneDesc: {
          name: '063FWT23BermH',
          placemarks: [
            {
              id: '0',
              name: 'Tidal Thames from Hungerford Bridge to Battersea Power Station',
              geometry: {
                rings: [],
                circles: [],
                polygons: [],
                geocodes: [],
                extraInfo: [
                  {
                    id: 'TA_CODE',
                    value: { s: '063FWT23BermH' }
                  },
                  {
                    id: 'TA_NAME',
                    value: {
                      s: 'Tidal Thames from Hungerford Bridge to Battersea Power Station'
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
      // coordinates: { latitude: 51.629, longitude: -0.745 },
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
          name: '034FWFSOLEICFROG',
          placemarks: [
            {
              id: '0',
              name: 'River Soar at Frog Island and riverside areas of Leicester',
              geometry: {
                rings: [],
                circles: [],
                polygons: [],
                geocodes: [],
                extraInfo: [
                  {
                    id: 'TA_CODE',
                    value: { s: '034FWFSOLEICFROG' }
                  },
                  {
                    id: 'TA_NAME',
                    value: {
                      s: 'River Soar at Frog Island and riverside areas of Leicester'
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
    }
  ]
}

module.exports = {
  liveAlerts: liveAlerts
}
