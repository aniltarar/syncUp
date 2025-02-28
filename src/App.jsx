import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HomeRoutes } from './routes/HomeRoutes'
import { AuthRoutes } from './routes/AuthRoutes'
import { AdminRoutes } from './routes/AdminRoutes'
import { LeaderRoutes } from './routes/LeaderRoutes'

const App = () => {


const router = createBrowserRouter([HomeRoutes,AuthRoutes,AdminRoutes,LeaderRoutes]) // Dışarıda tanıttıgımız router'ları çağırıyoruz.



  return <RouterProvider router={router}/>
}


export default App

