import React, { useEffect, useState } from 'react'
import Login from "./components/login"
import Home from "./components/home"
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useIsLoggedIn } from './oAuth/hook/useAuthenticate'
import { useIdle } from './oAuth/hook/useIdle'

function App() {
  const {isIdleTimeout} = useIdle()
  
  const [isUserSignedIn, setIsUserSignedIn] = useState(false)

  const loggedIn = useIsLoggedIn()

  useEffect(() => {

    if(isIdleTimeout && loggedIn) {
      onLogout()
      return
    }

    setIsUserSignedIn(loggedIn)

  }, [isIdleTimeout])

  const onLogout = () => {
    localStorage.clear()
    setIsUserSignedIn(false)
  }

  const onLoginSuccessful = () => {
    setIsUserSignedIn(true)
  }

  return (
    <div className="App">
      {isUserSignedIn && <Home onLogout={onLogout} /> || 
      <Login onLoginSuccessful={onLoginSuccessful} />}

      {isIdleTimeout && 'sorry you were out for too long.'}
    </div>
  )
}

export default App
