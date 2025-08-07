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
      console.log('historical alerrts', alerts?.historicAlerts)
      if (alerts?.historicAlerts) {
        setHistoricalAlerts(alerts?.historicAlerts)
      }
    }

    console.log('loading historical alerts')
    loadHistoricalAlerts()
  }, [setHistoricalAlerts])

  return historicalAlerts
}
