import React from 'react'
import Container from '../containers/Container'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
// Auth Ekranında Görünecek Sayfaların Ana Layout'u
const AuthLayout = () => {
  return (
    <Container>
      <div className='flex flex-col min-h-screen'>
        <Toaster position='top-center' />
        <Outlet />
      </div>
    </Container>
  )
}

export default AuthLayout