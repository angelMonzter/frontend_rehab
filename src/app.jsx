import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import { AdminProvider } from "context/AdminProvider";
import { PacienteProvider } from "context/PacienteProvider";

function App() {
    const isAuthenticated = localStorage.getItem("token_rehab") !== null; // Verifica si hay sesión iniciada

    return (
        <PacienteProvider>
            <AdminProvider>
                <Routes>
                    {/* Rutas de autenticación */}
                    <Route path="/auth/*" element={<AuthLayout />} />

                    {/* Rutas de administración (protegidas) */}
                    <Route path="/admin/*" element={isAuthenticated ? <AdminLayout /> : <Navigate to="/auth/login" replace />} />

                    {/* Redirección por defecto */}
                    <Route path="*" element={<Navigate to={isAuthenticated ? "/admin/dashboard" : "/auth/login"} replace />} />
                </Routes>
            </AdminProvider>
        </PacienteProvider>
        
        
    );
}

export default App;

