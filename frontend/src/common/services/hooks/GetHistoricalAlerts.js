import { useEffect, useState } from 'react'
import { backendCall } from '../BackendService'

export function useFetchAlerts() {
  const [historicalAlerts, setHistoricalAlerts] = useState([])

  useEffect(() => {
    const loadHistoricalAlerts = async () => {
      const options = {
        states: [],
        boundingBox: null,
        channels: []
      }

      const { data: alerts } = await backendCall(
        { options, historic: true },
        'api/alert/list'
      )
      if (alerts?.historicAlerts) {
        setHistoricalAlerts(alerts?.historicAlerts)
      }
    }

    loadHistoricalAlerts()
  }, [setHistoricalAlerts])

  return historicalAlerts
}
