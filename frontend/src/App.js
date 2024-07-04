import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import routes from './routes/routes'

export default function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.component} />
        ))}
      </Routes>
    </BrowserRouter>
  )
}
