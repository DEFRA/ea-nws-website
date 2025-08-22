export function loadGA(gtmId) {
  if (window.__gaScript) return
  // Create the script element
  const script = document.createElement('script')
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gtmId}&v=${Date.now()}`
  script.async = true
  // Append the script to the document
  document.head.appendChild(script)

  window.__gaScript = script

  window.dataLayer = []
  function gtag() {
      window.dataLayer.push(arguments)
  }

  window.gtag = gtag
  gtag('js', new Date())
  gtag('config', gtmId, {
    cookie_domain: 'auto',
    cookie_flags: 'SameSite=None;Secure',
    storage: 'cookie',
    client_id: undefined
  })
}

export function removeGA() {
  const deleteCookies = () => {
    const cookieArr = document.cookie.split(';')
    const cookieNames = cookieArr.map((cookie) => cookie.split('=')[0])
    cookieNames.forEach((cookie) => {
      if (cookie.includes('_ga')) {
          document.cookie = cookie+'=; Max-Age=-99999999; domain=.'+window.location.hostname
      }
    })
  }

  if (window.__gaScript) {
    window.__gaScript.remove()
    window.__gaScript = null
  }
  delete window.gtag
  delete window.dataLayer
  deleteCookies()
}

