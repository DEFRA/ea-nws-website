import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TimeoutWarning from './../src/pages/signOut/TimeoutWarning'
import SignBackIn from './pages/signOut/SignBackIn'
import { routes, unAuthRoutes } from './routes/routes'
export default function App() {
  const session = useSelector((state) => state.session)
  const isUserAuth = session.authToken !== null

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      TimeoutWarning(true)
    }, 2000)
    console.log('hello')
    return () => clearTimeout(timeoutId)
  })

  const url = window.location.pathname
  const validRoute = () => {
    for (let index = 0; index < unAuthRoutes.length; index++) {
      if (unAuthRoutes[index].path === url) {
        return true
      }
    }
    return false
  }

  return isUserAuth ? (
    <BrowserRouter basename="/">
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.component} />
        ))}
      </Routes>
    </BrowserRouter>
  ) : validRoute() ? (
    <BrowserRouter basename="/">
      <Routes>
        {unAuthRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.component} />
        ))}
      </Routes>
    </BrowserRouter>
  ) : (
    <BrowserRouter basename="/">
      <SignBackIn />
    </BrowserRouter>
  )
}
