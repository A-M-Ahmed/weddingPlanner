import React from 'react'
import Header from './components/Headers'
import SignUpPage from './pages/SignUpPage'

const App = () => {
  return (
    <div>
     {/* //* headers */}
     <Header />
     <main>
      {/* //* unathenticated  */}
      <SignUpPage />

     </main>

     {/* //* footers */}

    </div>
  )
}

export default App
