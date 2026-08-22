import { StrictMode } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { createRoot } from 'react-dom/client'

import { routes } from './App.jsx'

const router = createBrowserRouter(routes)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
