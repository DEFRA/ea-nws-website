const liveAlerts = {
  total: 6,
  alerts: [
    {
      id: '1',
      version: 123456,
      name: 'Flood Warning',
      description: { en: 'Flood', additionalLabels: [] },
      effectiveDate: 1734003781,
      expirationDate: 1734004381,
      duration: {},
      urgency: 'IMMEDIATE',
      severity: 'MODERATE',
      certainty: 'OBSERVED',
      mode: {
        zoneDesc: {
          name: '012FWCTL32B',
          placemarks: [
            {
              id: '0',
              name: 'Wyre estuary at Thornton, between A585, Stanah Road and School Road',
              geometry: {}
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
      id: '2',
      version: 123456,
      name: 'Flood Warning',
      description: { en: 'Flood', additionalLabels: [] },
      effectiveDate: 1734003781,
      expirationDate: 1734004381,
      duration: {},
      urgency: 'IMMEDIATE',
      severity: 'MINOR',
      certainty: 'OBSERVED',
      mode: {
        zoneDesc: {
          name: '062WAF53LowerLee',
          placemarks: [
            {
              id: '0',
              name: 'Lower River Lee from Hoddesdon to Canning Town',
              geometry: {}
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
