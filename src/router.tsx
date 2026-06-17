import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import { Home } from './pages/Home'
import { Seguros } from './pages/Seguros'
import { Taxes } from './pages/Taxes'
import { Inmigracion } from './pages/Inmigracion'
import { Otros } from './pages/Otros'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'seguros',
        element: <Seguros />,
      },
      {
        path: 'taxes',
        element: <Taxes />,
      },
      {
        path: 'inmigracion',
        element: <Inmigracion />,
      },
      {
        path: 'otros',
        element: <Otros />,
      },
    ],
  },
])
