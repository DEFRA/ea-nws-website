export function loadGA(gtmId) {
  if (window.__gaScript) return
  window.dataLayer = []
  window.dataLayer.push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js'
  })
  var f=document.getElementsByTagName('script')[0], script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`
  // insert the gtm script before the first script
  f.parentNode.insertBefore(script,f)

  window.__gaScript = script
}

export function removeGA(cookies = true) {
  const deleteCookies = () => {
    const cookieArr = document.cookie.split(';')
    const cookieNames = cookieArr.map((cookie) => cookie.split('=')[0])
    cookieNames.forEach((cookie) => {
      if (cookie.includes('_ga')) {
          document.cookie = cookie+'=; Max-Age=-99999999; path=/; domain=.'+window.location.hostname
      }
    })
  }

  if (window.__gaScript) {
    window.__gaScript.remove()
    window.__gaScript = null
  }
  delete window.dataLayer
  cookies && deleteCookies()
}

