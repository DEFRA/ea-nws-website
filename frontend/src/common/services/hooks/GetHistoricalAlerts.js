import { useEffect, useState } from 'react'
import AlertState from '../../enums/AlertState'
import { backendCall } from '../BackendService'
export function useFetchAlerts () {
  const [data, setData] = useState(null)
  const [historicalAlerts, setHistoricalAlerts] = useState(null)

  useEffect(() => {
    const loadHistoricalAlerts = async () => {
      const options = {
        states: [AlertState.PAST],
        boundingBox: null,
        channels: []
      }
      

      const { data: alerts } = await backendCall(
        { options, historic: true },
        'api/alert/list',
        navigate
      )
      return alerts
    }

    const alerts = loadHistoricalAlerts()
    setHistoricalAlerts(alerts)
  }, [setHistoricalAlerts])

  return historicalAlerts
}
