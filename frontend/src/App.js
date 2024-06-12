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

  useEffect(() => {
    const resetInactivityTimer = () => {
      if (auth) {
        console.log('beginning timer')
        clearTimeout(inactivityTimer.current)
        clearTimeout(redirectTimer.current)
        setIsInactive(false)
        inactivityTimer.current = setTimeout(() => {
          setIsInactive(true)
          redirectTimer.current = setTimeout(() => {
            //NEED TO KILL SESSION HERE
            window.location.pathname = '/signout-auto'
            //navigate to start page
          }, 10 * 13 * 1000) //2 minutes
        }, 1 * 5 * 1000) //10 minutes
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
  }, [auth])

  const handleStayLoggedIn = () => {
    setIsInactive(false)
    clearTimeout(redirectTimer.current)
  }
  console.log('the auth is ' + auth)
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
