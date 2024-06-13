import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import InactivityPopup from './custom-components/InactivityPopup'
import { authenticatedRoutes, routes } from './routes/routes'

export default function App() {
  const auth = useSelector((state) => state.session.authToken)
  const [isInactive, setIsInactive] = useState(false)
  const inactivityTimer = useRef(null)
  const redirectTimer = useRef(null)
  const [isPopUpOnScreen, setIsPopUpOnScreen] = useState(false)

  useEffect(() => {
    if (isPopUpOnScreen === false) {
      const resetInactivityTimer = () => {
        if (auth) {
          console.log('beginning timer')
          clearTimeout(inactivityTimer.current)
          clearTimeout(redirectTimer.current)
          setIsInactive(false)
          inactivityTimer.current = setTimeout(() => {
            setIsInactive(true)
            setIsPopUpOnScreen(true)

            redirectTimer.current = setTimeout(() => {
              window.location.pathname = '/signout-auto'
            }, 2 * 60 * 1000) //2 minutes
          }, 13 * 60 * 1000) //13 minutes
        }
      }

      const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart']

      if (auth) {
        events.forEach((event) =>
          window.addEventListener(event, resetInactivityTimer)
        )
        resetInactivityTimer()
      }

      return () => {
        events.forEach((event) =>
          window.removeEventListener(event, resetInactivityTimer)
        )
        clearTimeout(inactivityTimer.current)
        clearTimeout(redirectTimer.current)
      }
    }
  }, [auth, isPopUpOnScreen])

  const handleStayLoggedIn = () => {
    setIsInactive(false)
    setIsPopUpOnScreen(false)
    clearTimeout(redirectTimer.current)
  }

  return (
    <BrowserRouter>
      <Routes>
        {authenticatedRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={auth ? route.component : <Navigate to="/sign-back-in" />}
          />
        ))}
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.component} />
        ))}
      </Routes>
      {isInactive && <InactivityPopup onStayLoggedIn={handleStayLoggedIn} />}
    </BrowserRouter>
  )
}
