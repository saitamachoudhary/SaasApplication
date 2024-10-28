import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import App from './App'

// Import the components
import IndexPage from './Routes/home';
import SignInPage from './Routes/sign-in'
import SignUpPage from './Routes/sign-up'
import Socialshare from './Routes/socialshare'

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: '/', element: <IndexPage /> },
      { path: '/sign-in/*', element: <SignInPage /> },
      { path: '/sign-up/*', element: <SignUpPage /> },
      {path: '/social-share', element: <Socialshare/>},
      // {
      //   element: <DashboardLayout />,
      //   path: 'dashboard',
      //   children: [
      //     { path: '/dashboard', element: <DashboardPage /> },
      //     { path: '/dashboard/invoices', element: <InvoicesPage /> },
      //   ],
      // },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)