import { useEffect, useState } from 'react'
import AlertState from '../../enums/AlertState'
import { getAdditional } from '../../redux/userSlice'
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
          alert.CODE = getAdditional(
            alert.mode.zoneDesc.placemarks[0].extraInfo,
            'TA_CODE'
          )
          alert.TYPE = getAdditional(
            alert.mode.zoneDesc.placemarks[0].extraInfo,
            'category'
          )
          return alert.name.toLowerCase().includes('remove')
        })
      }
      setHistoricalAlerts(filteredAlerts)
    }

    loadHistoricalAlerts()
  }, [setHistoricalAlerts])

  return historicalAlerts
}
