// Modules
import React, { useContext, Suspense } from 'react'
import { Router, Redirect } from '@reach/router'

//Components
import Layout from './components/Layout'
import { Dashboard } from './pages/Dashboard'
import { Administrators } from './pages/Administrators'
import SignIn from './pages/SignIn'

// Lazy Loading
// const Favs = React.lazy(() => import('./pages/Favs'))

import { Context } from './Context'

export const App = () => {

  const { auth } = useContext(Context)
  
  return (
    <Suspense fallback={<div />}>
    {
      auth.value ?
        <Layout>
          <Router>
            <Dashboard path="/" />
            <Administrators path="/Administrators" />
            <Redirect from="/*" to="/" noThrow />
          </Router>
        </Layout>
      :
        <Router>
          <SignIn path="/signin" />
          <Redirect from="/*" to="/signin" noThrow />
        </Router>
    }
  </Suspense>
  )
}