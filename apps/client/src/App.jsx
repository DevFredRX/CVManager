import { Navigate } from "react-router";

import '@styles/theme.css'

import MainLayout from "@layouts/MainLayout";
import NotFound from "@pages/NotFound";
import InProgress from "@pages/InProgress";

export const routes = [
  {
    element: <MainLayout variant="default" />,
    children: [
      { path: '/', element: <Navigate to='/in-progress' replace /> }
    ]
  },
  {
    element: <MainLayout variant="none" />,
    children: [
      { path: '*', element: <NotFound /> },
      { path: '/in-progress', element: <InProgress /> },
    ]
  }
]