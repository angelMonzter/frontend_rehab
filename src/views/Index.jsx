import { useState } from "react";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { showAlert } from '../components/Alert';  
import axiosInstance from '../config/axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [correo_administrador, setCorreo] = useState('')
    const [password_administrador, setPassword] = useState('')
    const [alerta, setAlerta] = useState({})
    const [campoObligatorio, setCampoObligatorio] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if([correo_administrador, password_administrador].includes('')) {
            showAlert('error', 'Todos los campos son obligatorios');
            setCampoObligatorio(false);
            return 
        }

        try {
            const { data } = await axiosInstance.post('/api/login', {correo_administrador, password_administrador});
            localStorage.setItem('token_rehab', data.token);
            localStorage.setItem('nombre_administrador', data.perfil.nombre_administrador);
            console.log(data);
            navigate('/admin/dashboard');
            //setAuth(data)
        } catch (error) {
            // El servidor respondió con un código de estado diferente a 2xx
            const errorMessage = error.response.data.message;  // Capturar el mensaje enviado por tu API
            showAlert('error', errorMessage);
        }
    }
  return (
    <>
      <ToastContainer />
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
            {/* 
            <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>Sign in with</small>
            </div>
            <div className="btn-wrapper text-center">
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../assets/img/icons/common/github.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Github</span>
              </Button>
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../assets/img/icons/common/google.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div>
          </CardHeader>
            */}
          
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Inicia sesion con tus credenciales</small>
            </div>
            <Form role="form" onSubmit={handleSubmit}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    className={!campoObligatorio ? "is-invalid" : "form-control-alternative"}
                    placeholder="Correo"
                    type="email"
                    autoComplete="new-email"
                    value={correo_administrador}
                    onChange={(e) => {
                        setCorreo(e.target.value);
                        setCampoObligatorio(true); // Quita el is-invalid cuando el usuario escribe
                    }}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup className="mb-1">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    className={!campoObligatorio ? "is-invalid" : "form-control-alternative"}
                    placeholder="Contraseña"
                    type="password"
                    autoComplete="new-password"
                    value={password_administrador}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setCampoObligatorio(true); // Quita el is-invalid cuando el usuario escribe
                    }}
                  />
                </InputGroup>
              </FormGroup>
              {/*<div className="custom-control custom-control-alternative custom-checkbox">
                 <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
               
                 <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Recuerdarme</span>
                </label>
                 
              </div>*/}
              <div className="text-center">
                <input 
                    type="submit"
                    value="Iniciar Sesion"
                    class="btn btn-primary mt-4"
                />
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>¿Olvidaste tu constraseña?</small>
            </a>
          </Col>
          {/*
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Create new account</small>
            </a>
          </Col>
          */}
          
        </Row>
      </Col>
    </>
  );
};

export default Login;
