import { useEffect, useState } from "react"
import { backendCall } from "../BackendService"

export default function GoogleAnalytics({useAnalytics}) {
    const [initialised, setInitialised] = useState(false)
    const [gtmId, setGtmId] = useState(null)
    const getGtmId = async () => {
      const { data } = await backendCall(
        'data',
        'api/values/gtm'
      )
      if (data) {
        setGtmId(data)
      } else {
        setGtmId(null)
      }
    }

    // Create the dataLayer with defaults
    window.dataLayer = window.dataLayer || []
    function gtag() {
        window.dataLayer.push(arguments)
    }

    gtag('consent', 'default', {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'analytics_storage': 'denied'
    });

    const loadScript = () => {
      // Create the script element
      const script = document.createElement('script')
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gtmId}`
      script.async = true
      // Append the script to the document
      document.head.appendChild(script)
      script.onload = () => {
        gtag('js', new Date())
        gtag('config', gtmId)
      }
      setInitialised(true)
    }

    const changeConsent = () => {
        if (useAnalytics) {
            gtag('consent', 'update', {
                'analytics_storage': 'granted'
              })
        } else {
            gtag('consent', 'update', {
                'analytics_storage': 'denied'
              })
        }
    }

    useEffect(() => {
      !gtmId && getGtmId()
      gtmId && !initialised && loadScript()
      initialised && changeConsent()
    }, [gtmId, initialised, useAnalytics])

    return null
  }