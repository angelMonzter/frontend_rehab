import { useState, useEffect, createContext } from "react";
import axiosInstance from '../config/axios';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {

    const [ admins, setAdmin ] = useState([]);
    const [ login_admin, setLoginAdmin ] = useState([]);

    const obtenerAdmin = async () => {

        try {
            const token = localStorage.getItem('token_rehab')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const url = `/api/admin`;
            const { data } = await axiosInstance(url, config)
            setAdmin(data);
        } catch (error) {
            console.log(error)
        }
    }

    const checkauthAdmin = async (id) => {

        try {
            const token = localStorage.getItem('token_rehab')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const url = `/api/admin/${id}`;
            const { data } = await axiosInstance(url, config);
            setLoginAdmin(data);
        } catch (error) {
            console.log(error)
        }
    }

    const registrarAdmin = async ( nombre_administrador, correo_administrador, password_administrador, rol_administrador, administrador_id ) => {
        console.log(administrador_id)
        if(administrador_id){
            const token = localStorage.getItem('token_rehab')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await axiosInstance.put(`/api/admin-update/${administrador_id}`, { nombre_administrador, correo_administrador, password_administrador, rol_administrador, administrador_id }, config)
                const cuentActualizada = admins.map( cuentaState => cuentaState.datos_administrador_id === data.dataActualizada.id ? data.dataActualizada : cuentaState )
                //setCuentas(cuentActualizada)
                console.log('cuentActualizada')
            } catch (error) {
                console.log(error)
            }
        }else{
            try {
                const token = localStorage.getItem('token_rehab')
                if(!token) return
    
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
        
                const { data } = await axiosInstance.post('/api/register', { nombre_administrador, correo_administrador, password_administrador, rol_administrador }, config);
                //setAdmin(data);
                console.log('data');
            } catch (error) {
                // El servidor respondió con un código de estado diferente a 2xx
                //const errorMessage = error.response.data.message;  // Capturar el mensaje enviado por tu API
                console.log(error);
                //showAlert('error', errorMessage);
            }
        }
    }

    const eliminarAdmin = async ( id ) => {
        try {
            const token = localStorage.getItem('token_rehab')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const url = `/api/admin-delete/${id}`;
            const { data } = await axiosInstance.delete(url, config);
            obtenerAdmin();
            //obtenerCuentasTotal(usuario_sid);
            console.log(data);
        } catch (error) {
            // El servidor respondió con un código de estado diferente a 2xx
            console.log(error);
            //const errorMessage = error.response.data.message;  // Capturar el mensaje enviado por tu API
            //showAlert('error', errorMessage);
        }
    }

    const cerrarSesion = async () =>{
        localStorage.removeItem('token_rehab')
        localStorage.removeItem('nombre_administrador')
        setLoginAdmin ({})
    }

    return (
        <AdminContext.Provider
            value={{
                admins,
                login_admin,
                obtenerAdmin,
                registrarAdmin,
                eliminarAdmin,
                checkauthAdmin,
                cerrarSesion,
            }}
        >
            {children}
        </AdminContext.Provider>
    );
}

export default AdminContext;