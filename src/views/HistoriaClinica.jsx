import { useState, useEffect } from "react";
// reactstrap components
import {
    Badge,
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    Progress,
    Table,
    Container,
    Row,
    UncontrolledTooltip,
    Col,
    Button,
    CardBody,
    FormGroup,
    Input,
    Form,
} from "reactstrap";
import { Link, useParams } from "react-router-dom"; // Importa useParams para capturar el token de la URL
import axiosInstance from '../config/axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showAlert } from "../components/Alert"
// core components
import Header from "components/Headers/Header.js";

  
  const HistoriaClinica = () => {
    const { paciente_id } = useParams(); // Captura el token desde la URL

    const [ nombre_paciente, setNombrePaciente ] = useState('');
    const [ sexo_paciente, setSexo ] = useState('');
    const [ edad_paciente, setEdad ] = useState('');
    const [ domicilio_paciente, setDomicilio ] = useState('');
    const [ telefono_paciente, setTelefono ] = useState('');
    const [ estado_civil_paciente, setEstadoCivil ] = useState('');
    const [ ocupacion_paciente, setOcupacion ] = useState('');
    const [ escolaridad_paciente, setEscolaridad ] = useState('');
    
    /*funcion checkbox */
    const [diabetes_antecedentes, setFormDataDiabetes] = useState({});
    const [alergia_antecedentes, setFormDataAlergias] = useState({});

    // Función para manejar cambios dinámicamente
    const handleChangeCheckbox = (e, setFunction) => {
    const { name, type, value, checked } = e.target;
    
    // Si es un checkbox, actualizamos el estado basado en el valor de "checked"
    if (type === "checkbox") {
        setFunction((prevState) => ({
            ...prevState,
            [name]: checked ? "si" : "no",
        }));
    }

    // Si es un campo de texto, actualizamos el estado con el valor
    if (type === "text") {
            setFunction((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    // Función para enviar datos
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Datos finales enviados:");
        console.log("Diabetes:", JSON.stringify(diabetes_antecedentes));
        console.log("Alergias:", JSON.stringify(alergia_antecedentes));

        try {
            const token = localStorage.getItem('token_rehab')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const status_paciente = "activo";
            const id = paciente_id;
    
            const { data } = await axiosInstance.post('/api/register-clinic-history', { paciente_id, diabetes_antecedentes, alergia_antecedentes });
            const { data2 } = await axiosInstance.put(`/api/patient-update-status/${id}`, { status_paciente });
            //setAdmin(data);
            console.log(data);
            console.log(data2);
        } catch (error) {
            // El servidor respondió con un código de estado diferente a 2xx
            //const errorMessage = error.response.data.message;  // Capturar el mensaje enviado por tu API
            console.log(error);
            //showAlert('error', errorMessage);
        }
    };
    /*funcion checkbox */

    useEffect(() => {
        const cargarPaciente = async () => {
          try {
            const url = `/api/patient-id/${paciente_id}`;
            const { data } = await axiosInstance(url);
      
            if (data.paciente.length > 0) {
              setNombrePaciente(data.paciente[0].nombre_paciente);
              setSexo(data.paciente[0].sexo_paciente);
              setEdad(data.paciente[0].edad_paciente);
              setTelefono(data.paciente[0].telefono_paciente);
              setDomicilio(data.paciente[0].domicilio_paciente);
              setEstadoCivil(data.paciente[0].estado_civil_paciente);
              setOcupacion(data.paciente[0].ocupacion_paciente);
              setEscolaridad(data.paciente[0].escolaridad_paciente);
            }
          } catch (error) {
            console.error("Error al cargar paciente:", error);
          }
        };
      
        cargarPaciente();
    }, [paciente_id]);

    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
            {/* Form historia clinica */}
            <Row>
                
                <Col className="order-xl-1" xl="12">
                    <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                        <Row className="align-items-center">
                        <Col xs="8">
                            <h3 className="mb-0">Historia Clínica</h3>
                        </Col>
                        <Col className="text-right" xs="4">
                            <Button
                                color="primary"
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                                size="sm"
                            >
                                Settings
                            </Button>
                        </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <Form onSubmit={handleSubmit}>
                        <h6 className="heading-small text-muted mb-4">
                            Información de historia clínica
                        </h6>
                        <div className="pl-lg-4">
                            <Row>
                                <Col lg="4">
                                    <FormGroup className="mb-lg-1">
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-username"
                                    >
                                        Terapeuta
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-username"
                                        placeholder="Terapeuta"
                                        type="text"
                                        size="sm"
                                    />
                                    </FormGroup>
                                </Col>
                                <Col lg="4">
                                    <FormGroup className="mb-lg-1">
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-email"
                                    >
                                        Expediente
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-email"
                                        placeholder="Expediente"
                                        type="text"
                                        size="sm"
                                    />
                                    </FormGroup>
                                </Col>
                                <Col lg="4">
                                    <FormGroup className="mb-1">
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-email"
                                    >
                                        Fecha
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-email"
                                        type="date"
                                        size="sm"
                                    />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>
                        <hr className="my-4" />
                        {/* Address */}
                        <h6 className="heading-small text-muted mb-4">
                            Datos del paciente
                        </h6>
                        <div className="pl-lg-4">
                            <Row>
                                <Col lg="3">
                                    <FormGroup >
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-city"
                                    >
                                        Nombre
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-city"
                                        placeholder="Nombre"
                                        type="text"
                                        size="sm"
                                        value={nombre_paciente}
                                        onChange={e => setNombrePaciente(e.target.value)}
                                    />
                                    </FormGroup>
                                </Col>
                                <Col lg="3">
                                    <div class="form-group">
                                        <label className="form-control-label" htmlFor="input-first-name">Sexo</label>
                                        <select 
                                            className="form-control form-control-sm" 
                                            id="exampleFormControlSelect1"
                                            onChange={e => setSexo(e.target.value)}
                                            value={sexo_paciente}
                                        >
                                            <option value="0">Alige una opción</option>
                                            <option value="Masculino">Masculino</option>
                                            <option value="Femenino">Femenino</option>
                                        </select>
                                    </div>
                                </Col>
                                <Col lg="3">
                                    <FormGroup >
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-country"
                                    >
                                        Domicilio
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-postal-code"
                                        placeholder="Domicilio"
                                        type="text"
                                        size="sm"
                                        value={domicilio_paciente}
                                        onChange={e => setDomicilio(e.target.value)}
                                    />
                                    </FormGroup>
                                </Col>
                                <Col lg="3">
                                    <FormGroup >
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-country"
                                    >
                                        Edad
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-postal-code"
                                        placeholder="Edad"
                                        type="number"
                                        size="sm"
                                        value={edad_paciente}
                                        onChange={e => setEdad(e.target.value)}
                                    />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="3">
                                    <FormGroup className="mb-lg-1">
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-city"
                                    >
                                        Teléfono
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-city"
                                        placeholder="Teléfono"
                                        type="text"
                                        size="sm"
                                        value={telefono_paciente}
                                        onChange={e => setTelefono(e.target.value)}
                                    />
                                    </FormGroup>
                                </Col>
                                <Col lg="3">
                                    <div class="form-group mb-lg-1">
                                        <label className="form-control-label" htmlFor="input-first-name">Estado civil</label>
                                        <select 
                                            className="form-control form-control-sm" 
                                            id="exampleFormControlSelect1"
                                            onChange={e => setEstadoCivil(e.target.value)}
                                            value={estado_civil_paciente}
                                        >
                                            <option value="0">Alige una opción</option>
                                            <option value="Casado">Casado</option>
                                            <option value="Soltero">Soltero</option>
                                        </select>
                                    </div>
                                </Col>
                                <Col lg="3">
                                    <FormGroup className="mb-lg-1">
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-country"
                                    >
                                        Ocupación
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-postal-code"
                                        placeholder="Ocupación"
                                        type="text"
                                        size="sm"
                                        value={ocupacion_paciente}
                                        onChange={e => setOcupacion(e.target.value)}
                                    />
                                    </FormGroup>
                                </Col>
                                <Col lg="3">
                                    <div class="form-group">
                                        <label className="form-control-label" htmlFor="input-first-name">Escolaridad</label>
                                        <select 
                                            className="form-control form-control-sm" 
                                            id="exampleFormControlSelect1"
                                            onChange={e => setEscolaridad(e.target.value)}
                                            value={escolaridad_paciente}
                                        >
                                            <option value="0">Alige una opción</option>
                                            <option value="Primaria">Primaria</option>
                                            <option value="Secundaria">Secundaria</option>
                                            <option value="Preparatoria">Preparatoria</option>
                                            <option value="Licenciatura">Licenciatura</option>
                                        </select>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <hr className="my-4" />
                        {/* Address */}
                        <h6 className="heading-small text-muted mb-4">
                            Exploración física
                        </h6>
                        <div className="pl-lg-4">
                            <Row>
                                <Col lg="3">
                                    <FormGroup className="mb-lg-1">
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-city"
                                    >
                                        Peso
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-city"
                                        placeholder="Peso"
                                        type="text"
                                        size="sm"
                                    />
                                    </FormGroup>
                                </Col>
                                <Col lg="3">
                                    <FormGroup className="mb-lg-1">
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-country"
                                    >
                                        Talla
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-country"
                                        placeholder="Talla"
                                        type="text"
                                        size="sm"
                                    />
                                    </FormGroup>
                                </Col>
                                <Col lg="3">
                                    <FormGroup className="mb-lg-1">
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-country"
                                    >
                                        Estructura
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-postal-code"
                                        placeholder="Estructura"
                                        type="text"
                                        size="sm"
                                    />
                                    </FormGroup>
                                </Col>
                                <Col lg="3">
                                    <FormGroup className="mb-1">
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-country"
                                    >
                                        IMC
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-postal-code"
                                        placeholder="IMC"
                                        type="text"
                                        size="sm"
                                    />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>
                        <hr className="my-4" />
                        {/* Description */}
                        <h6 className="heading-small text-muted mb-4">Datos de consulta</h6>
                        <div className="pl-lg-4">
                            <Row>
                                <Col lg="6">
                                    <FormGroup className="mb-lg-1">
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-country"
                                    >
                                        Motivo de consulta
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        placeholder="Motivo de consulta"
                                        rows="3"
                                        type="textarea"
                                        size="sm"
                                    />
                                    </FormGroup>
                                </Col>
                                <Col lg="6">
                                    <FormGroup className="mb-1">
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-country"
                                    >
                                        Tratamientos previos
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        placeholder="Tratamientos previos"
                                        rows="3"
                                        type="textarea"
                                        size="sm"
                                    />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>
                        <hr className="my-4" />
                        {/* Address */}
                        <h6 className="heading-small text-muted mb-4">
                            Antecedentes patológicos y heredofamiliares
                        </h6>
                        <div className="pl-lg-4">
                            <Row>
                                <Col lg="3">
                                    <FormGroup>
                                        <div className="d-flex align-items-center">
                                            <div className="custom-control custom-checkbox">
                                                <input
                                                    className="custom-control-input"
                                                    id="checkDiabetes"
                                                    type="checkbox"
                                                    name="diabetes"
                                                    onChange={(e) => handleChangeCheckbox(e, setFormDataDiabetes)}
                                                />
                                                <label className="custom-control-label ml-2" htmlFor="checkDiabetes">
                                                    Diabetes
                                                </label>
                                            </div>
                                            <Input
                                                className="form-control-alternative ml-3"
                                                id="inputDiabetesDetails"
                                                placeholder="Especifique"
                                                type="text"
                                                size="sm"
                                                name="diabetes_especificar"
                                                value={diabetes_antecedentes.diabetes_especificar || ""}
                                                onChange={(e) => handleChangeCheckbox(e, setFormDataDiabetes)}
                                            />
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="3">
                                    <FormGroup>
                                        <div className="d-flex align-items-center">
                                            <div className="custom-control custom-checkbox">
                                                <input
                                                    className="custom-control-input"
                                                    id="checkAlergias"
                                                    type="checkbox"
                                                    onChange={(e) => handleChangeCheckbox(e, setFormDataAlergias)}
                                                    name="alergia"  // Se usará como clave en el JSON
                                                />
                                                <label className="custom-control-label ml-2" htmlFor="checkAlergias">
                                                    Alergia
                                                </label>
                                            </div>
                                            <Input
                                                className="form-control-alternative ml-3"
                                                id="input-Especifique"
                                                placeholder="Especifique"
                                                type="text"
                                                size="sm"
                                                name="alergia_especificar"  // Se guardará como alergia_especificar en el JSON
                                                onChange={(e) => handleChangeCheckbox(e, setFormDataAlergias)}
                                                value={alergia_antecedentes.alergia_especificar || ""}
                                            />
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="3">
                                    <FormGroup>
                                        <div className="d-flex align-items-center">
                                            <div className="custom-control custom-checkbox">
                                            <input
                                                className="custom-control-input"
                                                id="customCheck1"
                                                type="checkbox"
                                            />
                                            <label className="custom-control-label ml-2" htmlFor="customCheck1">
                                                HTA
                                            </label>
                                            </div>
                                            <Input
                                                className="form-control-alternative ml-3"
                                                id="input-Especifique"
                                                placeholder="Especifique"
                                                type="text"
                                                size="sm"
                                            />
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="3">
                                    <FormGroup>
                                        <div className="d-flex align-items-center">
                                            <div className="custom-control custom-checkbox">
                                            <input
                                                className="custom-control-input"
                                                id="customCheck1"
                                                type="checkbox"
                                            />
                                            <label className="custom-control-label ml-2" htmlFor="customCheck1">
                                                Cáncer
                                            </label>
                                            </div>
                                            <Input
                                                className="form-control-alternative ml-3"
                                                id="input-Especifique"
                                                placeholder="Especifique"
                                                type="text"
                                                size="sm"
                                            />
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="3">
                                    <FormGroup>
                                        <div className="d-flex align-items-center">
                                            <div className="custom-control custom-checkbox">
                                            <input
                                                className="custom-control-input"
                                                id="customCheck1"
                                                type="checkbox"
                                            />
                                            <label className="custom-control-label ml-2" htmlFor="customCheck1">
                                                Tranfusiones
                                            </label>
                                            </div>
                                            <Input
                                                className="form-control-alternative ml-3"
                                                id="input-Especifique"
                                                placeholder="Especifique"
                                                type="text"
                                                size="sm"
                                            />
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="3">
                                    <FormGroup>
                                        <div className="d-flex align-items-center">
                                            <div className="custom-control custom-checkbox">
                                            <input
                                                className="custom-control-input"
                                                id="customCheck1"
                                                type="checkbox"
                                            />
                                            <label className="custom-control-label ml-2" htmlFor="customCheck1">
                                                Enf. Reumáticas
                                            </label>
                                            </div>
                                            <Input
                                                className="form-control-alternative ml-3"
                                                id="input-Especifique"
                                                placeholder="Especifique"
                                                type="text"
                                                size="sm"
                                            />
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="3">
                                    <FormGroup>
                                        <div className="d-flex align-items-center">
                                            <div className="custom-control custom-checkbox">
                                            <input
                                                className="custom-control-input"
                                                id="customCheck1"
                                                type="checkbox"
                                            />
                                            <label className="custom-control-label ml-2" htmlFor="customCheck1">
                                                Encames
                                            </label>
                                            </div>
                                            <Input
                                                className="form-control-alternative ml-3"
                                                id="input-Especifique"
                                                placeholder="Especifique"
                                                type="text"
                                                size="sm"
                                            />
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="3">
                                    <FormGroup>
                                        <div className="d-flex align-items-center">
                                            <div className="custom-control custom-checkbox">
                                            <input
                                                className="custom-control-input"
                                                id="customCheck1"
                                                type="checkbox"
                                            />
                                            <label className="custom-control-label ml-2" htmlFor="customCheck1">
                                                Accidentes
                                            </label>
                                            </div>
                                            <Input
                                                className="form-control-alternative ml-3"
                                                id="input-Especifique"
                                                placeholder="Especifique"
                                                type="text"
                                                size="sm"
                                            />
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="3">
                                    <FormGroup>
                                        <div className="d-flex align-items-center">
                                            <div className="custom-control custom-checkbox">
                                            <input
                                                className="custom-control-input"
                                                id="customCheck1"
                                                type="checkbox"
                                            />
                                            <label className="custom-control-label ml-2" htmlFor="customCheck1">
                                                Cardiopatías
                                            </label>
                                            </div>
                                            <Input
                                                className="form-control-alternative ml-3"
                                                id="input-Especifique"
                                                placeholder="Especifique"
                                                type="text"
                                                size="sm"
                                            />
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="3">
                                    <FormGroup>
                                        <div className="d-flex align-items-center">
                                            <div className="custom-control custom-checkbox">
                                            <input
                                                className="custom-control-input"
                                                id="customCheck1"
                                                type="checkbox"
                                            />
                                            <label className="custom-control-label ml-2" htmlFor="customCheck1">
                                                Cirugías
                                            </label>
                                            </div>
                                            <Input
                                                className="form-control-alternative ml-3"
                                                id="input-Especifique"
                                                placeholder="Especifique"
                                                type="text"
                                                size="sm"
                                            />
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="3">
                                    <FormGroup>
                                        <div className="d-flex align-items-center">
                                            <div className="custom-control custom-checkbox">
                                            <input
                                                className="custom-control-input"
                                                id="customCheck1"
                                                type="checkbox"
                                            />
                                            <label className="custom-control-label ml-2" htmlFor="customCheck1">
                                                Fracturas
                                            </label>
                                            </div>
                                            <Input
                                                className="form-control-alternative ml-3"
                                                id="input-Especifique"
                                                placeholder="Especifique"
                                                type="text"
                                                size="sm"
                                            />
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="3">
                                    <FormGroup>
                                        <div className="d-flex align-items-center">
                                            <div className="custom-control custom-checkbox">
                                            <input
                                                className="custom-control-input"
                                                id="customCheck1"
                                                type="checkbox"
                                            />
                                            <label className="custom-control-label ml-2" htmlFor="customCheck1">
                                                Espasmos / Contractura
                                            </label>
                                            </div>
                                            <Input
                                                className="form-control-alternative ml-3"
                                                id="input-Especifique"
                                                placeholder="Sitio / Características"
                                                type="text"
                                                size="sm"
                                            />
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="12">
                                    <FormGroup className="mb-1">
                                        <div className="d-flex align-items-center">
                                            <label className="custom-control-alternative ml-2" htmlFor="">
                                                Signos vitales
                                            </label>
                                            <Input
                                                className="form-control-alternative ml-3"
                                                id="input-country"
                                                placeholder="T/A"
                                                type="text"
                                                size="sm"
                                            />
                                            <Input
                                                className="form-control-alternative ml-3"
                                                id="input-country"
                                                placeholder="Temperatura"
                                                type="text"
                                                size="sm"
                                            />
                                            <Input
                                                className="form-control-alternative ml-3"
                                                id="input-country"
                                                placeholder="FC"
                                                type="text"
                                                size="sm"
                                            />
                                            <Input
                                                className="form-control-alternative ml-3"
                                                id="input-country"
                                                placeholder="FR"
                                                type="text"
                                                size="sm"
                                            />
                                        </div>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>
                        <hr className="my-4" />
                        {/* Address */}
                        <h6 className="heading-small text-muted mb-4">
                            Hábitos de salud
                        </h6>
                        <div className="pl-lg-4">
                            <Row>
                                <Col lg="4">
                                    <FormGroup>
                                        <div className="d-flex align-items-center">
                                            <div className="custom-control custom-checkbox">
                                            <input
                                                className="custom-control-input"
                                                id="customCheck2"
                                                type="checkbox"
                                            />
                                            <label className="custom-control-label ml-2" htmlFor="customCheck2">
                                                Tabaquismo
                                            </label>
                                            </div>
                                            <Input
                                                className="form-control-alternative ml-3"
                                                id="input-Especifique"
                                                placeholder="Especifique"
                                                type="text"
                                                size="sm"
                                            />
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="4">
                                    <FormGroup>
                                        <div className="d-flex align-items-center">
                                            <div className="custom-control custom-checkbox">
                                            <input
                                                className="custom-control-input"
                                                id="customCheck1"
                                                type="checkbox"
                                            />
                                            <label className="custom-control-label ml-2" htmlFor="customCheck1">
                                                Alcoholismo
                                            </label>
                                            </div>
                                            <Input
                                                className="form-control-alternative ml-3"
                                                id="input-Especifique"
                                                placeholder="Especifique"
                                                type="text"
                                                size="sm"
                                            />
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="4">
                                    <FormGroup>
                                        <div className="d-flex align-items-center">
                                            <div className="custom-control custom-checkbox">
                                            <input
                                                className="custom-control-input"
                                                id="customCheck1"
                                                type="checkbox"
                                            />
                                            <label className="custom-control-label ml-2" htmlFor="customCheck1">
                                                Drogas
                                            </label>
                                            </div>
                                            <Input
                                                className="form-control-alternative ml-3"
                                                id="input-Especifique"
                                                placeholder="Especifique"
                                                type="text"
                                                size="sm"
                                            />
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="4">
                                    <FormGroup className="mb-lg-1">
                                        <div className="d-flex align-items-center">
                                            <div className="custom-control custom-checkbox">
                                            <input
                                                className="custom-control-input"
                                                id="customCheck1"
                                                type="checkbox"
                                            />
                                            <label className="custom-control-label ml-2" htmlFor="customCheck1">
                                                Actividad Física
                                            </label>
                                            </div>
                                            <Input
                                                className="form-control-alternative ml-3"
                                                id="input-Especifique"
                                                placeholder="Especifique"
                                                type="text"
                                                size="sm"
                                            />
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="4">
                                    <FormGroup className="mb-lg-1">
                                        <div className="d-flex align-items-center">
                                            <div className="custom-control custom-checkbox">
                                            <input
                                                className="custom-control-input"
                                                id="customCheck1"
                                                type="checkbox"
                                            />
                                            <label className="custom-control-label ml-2" htmlFor="customCheck1">
                                                Se automedica
                                            </label>
                                            </div>
                                            <Input
                                                className="form-control-alternative ml-3"
                                                id="input-Especifique"
                                                placeholder="Especifique"
                                                type="text"
                                                size="sm"
                                            />
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="4">
                                    <FormGroup className="mb-1">
                                        <div className="d-flex align-items-center">
                                            <div className="custom-control custom-checkbox">
                                            <input
                                                className="custom-control-input"
                                                id="customCheck1"
                                                type="checkbox"
                                            />
                                            <label className="custom-control-label ml-2" htmlFor="customCheck1">
                                                Pasatiempo
                                            </label>
                                            </div>
                                            <Input
                                                className="form-control-alternative ml-3"
                                                id="input-Especifique"
                                                placeholder="Especifique"
                                                type="text"
                                                size="sm"
                                            />
                                        </div>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>
                        <hr className="my-4" />
                        {/* Address */}
                        <h6 className="heading-small text-muted mb-4">
                            Em mujeres: Estado de ingravidez
                        </h6>
                        <div className="pl-lg-4">
                            <Row>
                                <Col lg="5">
                                    <FormGroup className="mb-lg-1">
                                        <div className="d-flex align-items-center">
                                            <div className="custom-control custom-checkbox">
                                            <input
                                                className="custom-control-input"
                                                id="customCheck1"
                                                type="checkbox"
                                            />
                                            <label className="custom-control-label ml-2" htmlFor="customCheck1">
                                                Esta embarazada
                                            </label>
                                            </div>
                                            <Input
                                                className="form-control-alternative ml-3"
                                                id="input-country"
                                                placeholder="Cuantos hijos tiene"
                                                type="text"
                                                size="sm"
                                            />
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="7">
                                    <FormGroup className="mb-1">
                                        <div className="d-flex align-items-center">
                                            <label className="custom-control-alternative ml-2">
                                                Cuenatos hijos tiene
                                            </label>
                                            <Input
                                                className="form-control-alternative ml-3"
                                                id="input-country"
                                                placeholder="Country"
                                                type="text"
                                                size="sm"
                                            />
                                        </div>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>
                        <hr className="my-4" />

                        {/* Description */}
                        <h6 className="heading-small text-muted mb-4">Digagnóstico Médico en Rehabilitación</h6>
                        <div className="pl-lg-4">
                            <Row>
                                <Col lg="3">
                                    <FormGroup className="mb-lg-1">
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-country"
                                    >
                                        Reglejos
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        placeholder="-"
                                        rows="3"
                                        type="textarea"
                                        size="sm"
                                    />
                                    </FormGroup>
                                </Col>
                                <Col lg="3">
                                    <FormGroup className="mb-lg-1">
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-country"
                                    >
                                        Sencibilidad
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        placeholder="-"
                                        rows="3"
                                        type="textarea"
                                        size="sm"
                                    />
                                    </FormGroup>
                                </Col>
                                <Col lg="3">
                                    <FormGroup className="mb-lg-1">
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-country"
                                    >
                                        Lenguaje / Orientación
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        placeholder="-"
                                        rows="3"
                                        type="textarea"
                                        size="sm"
                                    />
                                    </FormGroup>
                                </Col>
                                <Col lg="3">
                                    <FormGroup className="mb-lg-1">
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-country"
                                    >
                                        Otros
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        placeholder="-"
                                        rows="3"
                                        type="textarea"
                                        size="sm"
                                    />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>

                        <hr className="my-4" />

                        {/* Description */}
                        <h6 className="heading-small text-muted mb-4">Cicatríz Quierúrgica</h6>
                        <div className="pl-lg-4">
                            <Row>
                                <Col lg="4">
                                    <FormGroup >
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-country"
                                    >
                                        Sitio
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        placeholder="-"
                                        rows="3"
                                        type="textarea"
                                        size="sm"
                                    />
                                    </FormGroup>
                                </Col>
                                <Col lg="4">
                                    <FormGroup >
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-country"
                                    >
                                        Queloide
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        placeholder="-"
                                        rows="3"
                                        type="textarea"
                                        size="sm"
                                    />
                                    </FormGroup>
                                </Col>
                                <Col lg="4">
                                    <FormGroup >
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-country"
                                    >
                                        Retractil
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        placeholder="-"
                                        rows="3"
                                        type="textarea"
                                        size="sm"
                                    />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="4">
                                    <FormGroup className="mb-lg-1">
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-country"
                                    >
                                        Abierta
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        placeholder="-"
                                        rows="3"
                                        type="textarea"
                                        size="sm"
                                    />
                                    </FormGroup>
                                </Col>
                                <Col lg="4">
                                    <FormGroup className="mb-lg-1">
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-country"
                                    >
                                        Con adherencia
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        placeholder="-"
                                        rows="3"
                                        type="textarea"
                                        size="sm"
                                    />
                                    </FormGroup>
                                </Col>
                                <Col lg="4">
                                    <FormGroup className="mb-1">
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-country"
                                    >
                                        Hipertrófica
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        placeholder="-"
                                        rows="3"
                                        type="textarea"
                                        size="sm"
                                    />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>

                        <hr className="my-4" />
                        {/* Address */}
                        <h6 className="heading-small text-muted mb-4">
                            Translados
                        </h6>
                        <div className="pl-lg-4">
                            <Row>
                                <Col lg="3">
                                    <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-city"
                                    >
                                        Valor inicial
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-city"
                                        placeholder="Valor inicial"
                                        type="text"
                                        size="sm"
                                    />
                                    </FormGroup>
                                </Col>
                                <Col lg="3">
                                    <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-country"
                                    >
                                        Independiente
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-country"
                                        placeholder="Independiente"
                                        type="text"
                                        size="sm"
                                    />
                                    </FormGroup>
                                </Col>
                                <Col lg="2">
                                    <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-country"
                                    >
                                        Silla de ruedas
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-postal-code"
                                        placeholder="Silla de ruedas"
                                        type="text"
                                        size="sm"
                                    />
                                    </FormGroup>
                                </Col>
                                <Col lg="2">
                                    <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-country"
                                    >
                                        Con ayudas
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-postal-code"
                                        placeholder="Con ayudas"
                                        type="text"
                                        size="sm"
                                    />
                                    </FormGroup>
                                </Col>
                                <Col lg="2">
                                    <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-country"
                                    >
                                        Camillas
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-postal-code"
                                        placeholder="Camillas"
                                        type="text"
                                        size="sm"
                                    />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="3">
                                    <FormGroup className="mb-lg-1">
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-city"
                                    >
                                        Valor Final
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-city"
                                        placeholder="Valor Final"
                                        type="text"
                                        size="sm"
                                    />
                                    </FormGroup>
                                </Col>
                                <Col lg="3">
                                    <FormGroup className="mb-lg-1">
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-country"
                                    >
                                        Independiente
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-country"
                                        placeholder="Independiente"
                                        type="text"
                                        size="sm"
                                    />
                                    </FormGroup>
                                </Col>
                                <Col lg="2">
                                    <FormGroup className="mb-lg-1">
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-country"
                                    >
                                        Silla de ruedas
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-postal-code"
                                        placeholder="Silla de ruedas"
                                        type="text"
                                        size="sm"
                                    />
                                    </FormGroup>
                                </Col>
                                <Col lg="2">
                                    <FormGroup className="mb-lg-1">
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-country"
                                    >
                                        Con ayudas
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-postal-code"
                                        placeholder="Con ayudas"
                                        type="text"
                                        size="sm"
                                    />
                                    </FormGroup>
                                </Col>
                                <Col lg="2">
                                    <FormGroup className="mb-1">
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-country"
                                    >
                                        Camillas
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-postal-code"
                                        placeholder="Camillas"
                                        type="text"
                                        size="sm"
                                    />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>
                        <hr className="my-4" />
                        {/* Address */}
                        <h6 className="heading-small text-muted mb-4">
                            Marcha / Deambulación
                        </h6>
                        <div className="pl-lg-4">
                            <Row>
                                <Col lg="1" md="3">
                                    <FormGroup>
                                        <div className="d-flex align-items-center">
                                            <div className="custom-control custom-checkbox">
                                            <input
                                                className="custom-control-input"
                                                id="customCheck2"
                                                type="checkbox"
                                            />
                                            <label className="custom-control-label ml-2" htmlFor="customCheck2">
                                                Libre
                                            </label>
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="2" md="3">
                                    <FormGroup>
                                        <div className="d-flex align-items-center">
                                            <div className="custom-control custom-checkbox">
                                            <input
                                                className="custom-control-input"
                                                id="customCheck1"
                                                type="checkbox"
                                            />
                                            <label className="custom-control-label ml-2" htmlFor="customCheck1">
                                                Claudicante
                                            </label>
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="2" md="4">
                                    <FormGroup>
                                        <div className="d-flex align-items-center">
                                            <div className="custom-control custom-checkbox">
                                            <input
                                                className="custom-control-input"
                                                id="customCheck1"
                                                type="checkbox"
                                            />
                                            <label className="custom-control-label ml-2" htmlFor="customCheck1">
                                                Con ayuda
                                            </label>
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="1" md="3">
                                    <FormGroup>
                                        <div className="d-flex align-items-center">
                                            <div className="custom-control custom-checkbox">
                                            <input
                                                className="custom-control-input"
                                                id="customCheck1"
                                                type="checkbox"
                                            />
                                            <label className="custom-control-label ml-2" htmlFor="customCheck1">
                                                Espáticas
                                            </label>
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="1" md="3">
                                    <FormGroup>
                                        <div className="d-flex align-items-center">
                                            <div className="custom-control custom-checkbox">
                                            <input
                                                className="custom-control-input"
                                                id="customCheck1"
                                                type="checkbox"
                                            />
                                            <label className="custom-control-label ml-2" htmlFor="customCheck1">
                                                Atáxica
                                            </label>
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="1" md="3">
                                    <FormGroup>
                                        <div className="d-flex align-items-center">
                                            <div className="custom-control custom-checkbox">
                                            <input
                                                className="custom-control-input"
                                                id="customCheck1"
                                                type="checkbox"
                                            />
                                            <label className="custom-control-label ml-2" htmlFor="customCheck1">
                                                Diabetes
                                            </label>
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="1" md="3">
                                    <FormGroup>
                                        <div className="d-flex align-items-center">
                                            <div className="custom-control custom-checkbox">
                                            <input
                                                className="custom-control-input"
                                                id="customCheck1"
                                                type="checkbox"
                                            />
                                            <label className="custom-control-label ml-2" htmlFor="customCheck1">
                                                Diabetes
                                            </label>
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="1" md="3">
                                    <FormGroup>
                                        <div className="d-flex align-items-center">
                                            <div className="custom-control custom-checkbox">
                                            <input
                                                className="custom-control-input"
                                                id="customCheck1"
                                                type="checkbox"
                                            />
                                            <label className="custom-control-label ml-2" htmlFor="customCheck1">
                                                Diabetes
                                            </label>
                                            </div>
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col lg="12">
                                    <FormGroup className="mb-1">
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-country"
                                    >
                                        Obserbaciones
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        placeholder="-"
                                        rows="3"
                                        type="textarea"
                                        size="sm"
                                    />
                                    </FormGroup>
                                </Col>
                            </Row>                            
                        </div>

                        <hr className="my-4" />
                        {/* Address */}
                        <h6 className="heading-small text-muted mb-4">
                            Escala del dolor 
                        </h6>
                        <div className="pl-lg-4">
                            <Row>
                                <Col lg="12">
                                    <FormGroup>
                                        <input
                                            type="range"
                                            className="custom-range"
                                            min="1"
                                            max="10"
                                            id="painScale"
                                            name="painScale"
                                        />
                                        <div className="d-flex justify-content-between mt-2">
                                            {[...Array(10)].map((_, i) => (
                                                <span key={i}>{i + 1}</span>
                                            ))}
                                        </div>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>
                        <div className="pl-lg-4 text-right">
                            <input 
                                type="submit"
                                value="Guardar"
                                className="btn btn-success"
                            />
                        </div>
                        
                        </Form>
                    </CardBody>
                    </Card>
                </Col>
                </Row>

        </Container>
      </>
    );
  };
  
  export default HistoriaClinica;
  