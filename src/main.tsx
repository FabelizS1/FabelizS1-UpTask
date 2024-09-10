import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import './index.css'


/*

  <React.StrictMode>
    <RouterProvider router={router} />  Se importa RouterProvider y Aqui se configura para usar el archivo router   
  </React.StrictMode>,  

*/

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />   
  </React.StrictMode>,
)
