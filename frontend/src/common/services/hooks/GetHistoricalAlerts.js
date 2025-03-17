import { useEffect, useState } from "react"
import { backendCall } from "../BackendService"
import { csvToJson } from "../CsvToJson"

export function useFetchAlerts() {
  const [data, setData] = useState(null)
  const [historyUrl, setHistoryUrl] = useState(null)

 useEffect(() => {
  async function getHistoryUrl () {
    const { data } = await backendCall(
      'data',
      'api/locations/download_flood_history'
    )
    setHistoryUrl(data)
  }
  getHistoryUrl()

  historyUrl && fetch(historyUrl)
    .then((response) => response.text())
    .then((data) => setData(csvToJson(data)))
  
  }, [historyUrl])
  

  return data
}