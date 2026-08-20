import React, { lazy, Suspense } from 'react'
const Layout = lazy(() => import('./Layout'))
import Loader from './components/Loader' 

const App = () => {
  return (
      <Suspense fallback={<Loader />}>
        <Layout />
      </Suspense>
  )
}

export default App