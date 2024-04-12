import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import PrivateRoute from './context/PrivateRoute'

import Main from './components/Main'
import Login from './components/Login'
import Register from './components/Register'
import VerifyEmail from './components/VerifyEmail'
import Header from './layout/Header'
import Profile from './components/Profile'
import Upload from './components/Upload'
import Bbs from './components/Bbs'


const App = () => {
  const [currentUser, setCurrentUser ] = useState(null);
  const [timeActive, setTimeActive] = useState(false);

  useEffect(()=>{
    onAuthStateChanged( auth, (user) => {
      setCurrentUser(user);
    })
  }, []);

  return (
    <Router>
      <AuthProvider value={{currentUser, timeActive, setTimeActive}}>
        <Routes>
          <Route exact path='/' element={
            <PrivateRoute>
              <Header>
                <Main/>
              </Header>
            </PrivateRoute>
          }/>
          <Route path='/profile' element={
           < PrivateRoute>
            <Header>
              <Profile/>
            </Header>
           </PrivateRoute>
            }/>
          <Route path='/login' element={
            !currentUser?.emailVerified? <Login/>:<Navigate to='/' replace/> }/>
          <Route path='/register' element={
            !currentUser?.emailVerified? <Register/>:<Navigate to='/' replace/> }/>
            <Route path='/bbs' element={<Header><Bbs/></Header>}/>
          <Route path='/verify-email' element={<VerifyEmail/>}/>
          <Route path='/upload' element={<Header><Upload/></Header>}/>
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App