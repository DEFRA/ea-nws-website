import { useEffect, useState } from 'react'
import AlertState from '../../enums/AlertState'
import { backendCall } from '../BackendService'

export function useFetchAlerts () {
  const [historicalAlerts, setHistoricalAlerts] = useState([])

  useEffect(() => {
    const loadHistoricalAlerts = async () => {
      let filteredAlerts = []
      const options = {
        states: [AlertState.PAST],
        boundingBox: null,
        channels: []
      }
    
      const { data: alerts } = await backendCall(
        { options, historic: true },
        'api/alert/list'
      )

      if (alerts?.alerts) {
        filteredAlerts = alerts.alerts.filter((alert) => {
          alert.CODE = alert.TA_CODE
          alert.TYPE = alert.category
          return alert.name.toLowerCase().includes('remove')
        })
      }
      setHistoricalAlerts(filteredAlerts)
    }

    loadHistoricalAlerts()
  }, [setHistoricalAlerts])

  return historicalAlerts
}
