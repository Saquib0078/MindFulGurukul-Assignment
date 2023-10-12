import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import Home from './components/Pages/Home.jsx'
import AddUser from './components/Pages/AddUser.jsx'
import LoginPage from './components/Pages/LoginPage.jsx'
import SignupPage from './components/Pages/SignupPage.jsx'
import UpdateUser from './components/Pages/UpdateUser'
import UserDetails from './components/Pages/UserDetails'
import DeleteUser from './components/Pages/DeleteUser'
import { UserProvider } from './Custom-Hook/UserContext'
function App() {

  return (
    <>
      <BrowserRouter>
      <UserProvider>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/update-user/:userId" element={<UpdateUser />} />
          <Route path="/delete-user/:userId" element={<DeleteUser />} />
          <Route path="/user/:userId" element={<UserDetails/>} />

        </Routes>
        </UserProvider>

      </BrowserRouter>
    </>
  )
}

export default App
