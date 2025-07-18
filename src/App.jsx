import React from 'react'
import Header from './components/Headers'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import { Route, Routes } from 'react-router'
import CreateWedding from './pages/CreateEvent'
import { AuthProvider } from './context/AuthProvider'
import UnAuthenticatedRoutes from './components/UnauthenticatedRoutes'
import ProtectedRoutes from './components/ProtectedRoutes'
import Profile from './pages/Profile'
import HomePage from './pages/HomePage'


const App = () => {
  return (
    <AuthProvider>
     {/* //* headers */}
     <Header />
     <main>
      {/* //* unauthenticated  */}
      <Routes>
        <Route path='/' element = { < HomePage/>} />
        {/* //*unauthenticated users redirect to these page */}
        <Route path='/signup' element = {
          <UnAuthenticatedRoutes>

            <SignUpPage />
          </UnAuthenticatedRoutes>
          } />
        <Route path='/signin' element = {
          <UnAuthenticatedRoutes>

          <SignInPage />
          </UnAuthenticatedRoutes>
          
          } />
        <Route path='/profile' element = {
          <ProtectedRoutes>

          <Profile />
          </ProtectedRoutes>
          } />
          <Route path='/create-event' element = {
            <ProtectedRoutes>
              <CreateWedding />
            </ProtectedRoutes>
          }/>
      </Routes>
     

     </main>

     {/* //* footers */}

    </AuthProvider>
  )
}

export default App
