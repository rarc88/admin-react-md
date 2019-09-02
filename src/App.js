// Modules
import React, { useContext, Suspense } from 'react'
import { Router, Redirect } from '@reach/router'

//Components
import { Layout } from './components/Layout'

import SignIn from './pages/SignIn'
import { Dashboard } from './pages/Dashboard'

import { Administrators } from './pages/Administrators'
import { AdministratorShow } from './pages/Administrators/AdministratorShow'
import { AdministratorRegister } from './pages/Administrators/AdministratorRegister'

import { Brands } from './pages/Brands'
import { BrandShow } from './pages/Brands/BrandShow'
import { BrandRegister } from './pages/Brands/BrandRegister'

import { Measures } from './pages/Measures'
import { MeasureShow } from './pages/Measures/MeasureShow'
import { MeasureRegister } from './pages/Measures/MeasureRegister'

import { Categories } from './pages/Categories'
import { CategoryShow } from './pages/Categories/CategoryShow'
import { CategoryRegister } from './pages/Categories/CategoryRegister'

import { Providers } from './pages/Providers'
import { ProviderShow } from './pages/Providers/ProviderShow'
import { ProviderRegister } from './pages/Providers/ProviderRegister'

import { Items } from './pages/Items'
import { ItemShow } from './pages/Items/ItemShow'
import { ItemRegister } from './pages/Items/ItemRegister'

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

            <Administrators path="administrators">
              <AdministratorShow path="/" />
              <AdministratorRegister path="register" title="Registrar" />
              <AdministratorRegister path=":id/edit" title="Editar" />
            </Administrators>

            <Brands path="brands">
              <BrandShow path="/" />
              <BrandRegister path="register" title="Registrar" />
              <BrandRegister path=":id/edit" title="Editar" />
            </Brands>

            <Measures path="measures">
              <MeasureShow path="/" />
              <MeasureRegister path="register" title="Registrar" />
              <MeasureRegister path=":id/edit" title="Editar" />
            </Measures>

            <Categories path="categories">
              <CategoryShow path="/" />
              <CategoryRegister path="register" title="Registrar" />
              <CategoryRegister path=":id/edit" title="Editar" />
            </Categories>

            <Providers path="providers">
              <ProviderShow path="/" />
              <ProviderRegister path="register" title="Registrar" />
              <ProviderRegister path=":id/edit" title="Editar" />
            </Providers>

            <Items path="items">
              <ItemShow path="/" />
              <ItemRegister path="register" title="Registrar" />
              <ItemRegister path=":id/edit" title="Editar" />
            </Items>

            <Redirect from="*" to="/" noThrow />
          </Router>
        </Layout>
      :
        <Router>
          <SignIn path="signin" />
          <Redirect from="*" to="signin" noThrow />
        </Router>
    }
  </Suspense>
  )
}