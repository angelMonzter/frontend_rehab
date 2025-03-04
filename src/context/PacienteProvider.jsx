import { useState, useEffect, createContext } from "react";
import axiosInstance from '../config/axios';
import io from 'socket.io-client';

const socket = io('http://localhost:4000'); // Asegúrate de que la URL coincide con tu backend

const PacienteContext = createContext();

export const PacienteProvider = ({ children }) => {

    const [ pacientes, setPacientes ] = useState([]);

    useEffect(() => {
        obtenerPaciente();

        // 🔴 Escuchar cuando se agrega un paciente
        socket.on("patientAdded", (nuevoPaciente) => {
            setPacientes((prevPacientes) => [...prevPacientes, nuevoPaciente]);
        });

        return () => {
            socket.off("patientAdded");
        };
    }, []);
      
    
    /*const obtenerPaciente = async () => {

        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const url = `/api/patient`;
            const { data } = await axiosInstance(url, config)
            setPacientes(data);
        } catch (error) {
            console.log(error)
        }
    }

    const registrarPaciente = async ( datos ) => {
        try {
            const { data } = await axiosInstance.post('/api/register-patient', datos);

            obtenerPaciente();
        } catch (error) {
            // El servidor respondió con un código de estado diferente a 2xx
            //const errorMessage = error.response.data.message;  // Capturar el mensaje enviado por tu API
            console.log(error);
            //showAlert('error', errorMessage);
        }
    }*/

    const obtenerPaciente = async () => {
        try {
            const token = localStorage.getItem('token_rehab');
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            const url = `/api/patient`;
            const { data } = await axiosInstance(url, config);
            setPacientes(data);
        } catch (error) {
            console.log(error);
        }
    };

    const registrarPaciente = async (datos) => {
        try {
            const { data } = await axiosInstance.post('/api/register-patient', datos);
            
            // Emitir evento al servidor para notificar a otros clientes
            console.log(data)
            socket.emit('agregarPaciente', data.newPatient);
        } catch (error) {
            console.log(error);
        }
    };

    const eliminarPaciente = async ( id ) => {
        try {
            const token = localStorage.getItem('token_rehab')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const url = `/api/patient-delete/${id}`;
            const { data } = await axiosInstance.delete(url, config);
            obtenerPaciente();
            console.log(data);
        } catch (error) {
            // El servidor respondió con un código de estado diferente a 2xx
            console.log(error);
            //const errorMessage = error.response.data.message;  // Capturar el mensaje enviado por tu API
            //showAlert('error', errorMessage);
        }
    }
    return (
        <PacienteContext.Provider
            value={{
                pacientes,
                obtenerPaciente,
                registrarPaciente,
                eliminarPaciente,
            }}
        >
            {children}
        </PacienteContext.Provider>
    );
}

export default PacienteContext;