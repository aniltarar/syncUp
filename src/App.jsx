import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HomeRoutes } from './routes/HomeRoutes'
import { AuthRoutes } from './routes/AuthRoutes'
import { AdminRoutes } from './routes/AdminRoutes'

const App = () => {

const router = createBrowserRouter([HomeRoutes,AuthRoutes,AdminRoutes]) // Dışarıda tanıttıgımız router'ları çağırıyoruz.



  return <RouterProvider router={router}/>
}


export default App

