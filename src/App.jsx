import React from 'react'
import Header from './components/Headers'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import { Route, Routes } from 'react-router'

const App = () => {
  return (
    <div>
     {/* //* headers */}
     <Header />
     <main>
      {/* //* unathenticated  */}
      <Routes>
        <Route path='signup' element = { <SignUpPage />} />
        <Route path='signin' element = {<SignInPage />} />
      </Routes>
     

     </main>

     {/* //* footers */}

    </div>
  )
}

export default App
