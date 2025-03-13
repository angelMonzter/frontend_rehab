import axios from 'axios';

const axiosInstance = axios.create({
    //baseURL: process.env.REACT_APP_API_URL, // Usa la variable de entorno
    baseURL: 'https://angelvelazquez.online:4000', // Usa la variable de entorno
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 5000,
});

export default axiosInstance;