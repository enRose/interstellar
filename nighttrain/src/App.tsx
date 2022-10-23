import React, { useEffect, useState } from 'react'
import Login from "./components/login"
import Home from "./components/home"
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useIsLoggedIn } from './oAuth/useAuthenticate'
import { StorageKey } from './oAuth/type'

function App() {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false)

  const loggedIn = useIsLoggedIn()

  useEffect(() => {
    setIsUserSignedIn(loggedIn)  
  }, [])

  const onLogout = () => {
    localStorage.removeItem(StorageKey.Session)
    setIsUserSignedIn(false)
  }

  const onLoginSuccessful = () => {
    setIsUserSignedIn(true)
  }

  return (
    <div className="App">
      {isUserSignedIn && <Home onLogout={onLogout} /> || 
      <Login onLoginSuccessful={onLoginSuccessful} />}
    </div>
  )
}

export default App
