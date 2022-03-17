import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { LoginScreen } from '../components/login/LoginScreen';
import { DashboardRoutes } from './DashboardRoutes';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
            {/* Al hacer esto el navbar no aparecera en el componente login */}
            {/* <Route path="/login" element={<LoginScreen />} /> */}
            
            <Route path='/login' element={
                <PublicRoute>
                  <LoginScreen />
                </PublicRoute>
              }
            />


            <Route path='/*' element={
                <PrivateRoute>
                  {/* Cuando se pasa un componente de esta manera (High order component) 
                      en el componente padre se podra recibir este componente en la propiedad "children"
                  */}
                  <DashboardRoutes />
                </PrivateRoute>
              }
            />

            {/* <Route path='/*' element={ <DashboardRoutes /> } /> */}
        </Routes>
    </BrowserRouter>
  )
}
