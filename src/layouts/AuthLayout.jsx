import React from 'react'
import Container from '../containers/Container'
import { Outlet } from 'react-router-dom'
// Auth Ekranında Görünecek Sayfaların Ana Layout'u
const AuthLayout = () => {
  return (
    <Container>
      <div className='flex flex-col min-h-screen'>
        <Outlet />
      </div>
    </Container>
  )
}

export default AuthLayout