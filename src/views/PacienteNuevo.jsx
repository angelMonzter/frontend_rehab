// reactstrap components
import React, { useState, useEffect, useRef  } from "react";
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
import { showAlert } from "../components/Alert"
import { ToastContainer } from 'react-toastify';
import usePaciente from "hooks/usePaciente";

import { Document, Page, pdfjs } from "react-pdf";
import SignatureCanvas from "react-signature-canvas";
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js`;

const PacienteNuevo = () => {
    const { registrarPaciente } = usePaciente();

    const [mostrarPDF, setMostrarPDF] = useState(false);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const signaturePadRef = React.useRef(null);
    const [campoObligatorio, setCampoObligatorio] = useState(true);
    
    const [nombre_paciente, setNombrePaciente] = useState('')
    const [telefono_paciente, setTelefonoPaciente] = useState('')
    const [ocupacion_paciente, setOcupacionPaciente] = useState('')
    const [edad_paciente, setEdadPaciente] = useState('')
    const [sexo_paciente, setSexoPaciente] = useState('')
    const [estado_civil_paciente, setEstadoCivilPaciente] = useState('')
    const [escolaridad_paciente, setEscolaridadPaciente] = useState('')
    const [calle_paciente, setCallePaciente] = useState('')
    const [ciudad_paciente, setCiudadPaciente] = useState('')
    const [pais_paciente, setPaisPaciente] = useState('')
    const [codigo_paciente, setCodigoPaciente] = useState('')
    const [medio_publicidad, setMedioPaciente] = useState('')

    const onLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const clearSignature = () => {
        signaturePadRef.current.clear();
    };

    const saveSignature = () => {
        const dataURL = signaturePadRef.current.toDataURL();
        // Aquí puedes hacer algo con la firma, como agregarla al PDF o guardarla
        console.log(dataURL);
    };

    const handleContinue = () => {
        if([nombre_paciente, telefono_paciente].includes('')) {
            showAlert('error', 'Datos obligatorios');
            setCampoObligatorio(false);
            setMostrarPDF(false);
            return 
        }
        setMostrarPDF(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if([nombre_paciente, telefono_paciente].includes('')) {
            return 
        }

        console.log("Datos del nombre_paciente:", nombre_paciente);
        console.log("Datos del telefono_paciente:", telefono_paciente);

        const domicilio_paciente = calle_paciente + ' ' + ciudad_paciente + ' ' + pais_paciente + ' ' + codigo_paciente;

        registrarPaciente( {
            nombre_paciente,
            telefono_paciente,
            domicilio_paciente,
            ocupacion_paciente,
            sexo_paciente,
            edad_paciente,
            escolaridad_paciente,
            estado_civil_paciente,
            medio_publicidad
        } );
        
        setNombrePaciente('');
        setTelefonoPaciente('');
        setOcupacionPaciente('');
        setEdadPaciente('')
        setEstadoCivilPaciente('0')
        setEscolaridadPaciente('0')
        setSexoPaciente('0')
        setCallePaciente('')
        setCiudadPaciente('')
        setPaisPaciente('')
        setCodigoPaciente('')
        setMedioPaciente('0')
    
        showAlert('success', 'Datos agregados correctamente');

        setMostrarPDF(false);
        setCampoObligatorio(true);
    };

    return (
      <>
        <ToastContainer />
        <Col lg="7" md="8">
        <Form onSubmit={handleSubmit}>

          <Card className="bg-secondary shadow border-0">

          {!mostrarPDF ? (
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Datos necesarios para consulta</small>
              </div>
                <h6 className="heading-small text-muted mb-4">
                    Información personal
                </h6>
                <div className="pl-lg-0">
                    <Row>
                    <Col lg="6">
                        <FormGroup>
                        <label
                            className="form-control-label"
                            htmlFor="input-username"
                        >
                            Nombre completo
                        </label>
                        <Input
                            className={!campoObligatorio ? "is-invalid" : "form-control-alternative"}
                            id="input-username"
                            placeholder="Nombre"
                            type="text"
                            onChange={(e) => {
                                setNombrePaciente(e.target.value);
                                setCampoObligatorio(true); // Quita el is-invalid cuando el usuario escribe
                            }}
                            value={nombre_paciente}
                        />
                        </FormGroup>
                    </Col>
                    <Col lg="6">
                        <FormGroup>
                        <label
                            className="form-control-label"
                            htmlFor="input-email"
                        >
                            Teléfono
                        </label>
                        <Input
                            className={!campoObligatorio ? "is-invalid" : "form-control-alternative"}
                            id="input-email"
                            placeholder="7220000000"
                            type="text"
                            maxLength="10"
                            onChange={(e) => {
                                setTelefonoPaciente(e.target.value);
                                setCampoObligatorio(true); // Quita el is-invalid cuando el usuario escribe
                            }}
                            value={telefono_paciente}
                        />
                        </FormGroup>
                    </Col>
                    </Row>
                    <Row>
                    <Col lg="6">
                        <FormGroup>
                        <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                        >
                            Ocupación
                        </label>
                        <Input
                            className="form-control-alternative"
                            id="input-first-name"
                            placeholder="Ocupación"
                            type="text"
                            onChange={(e) => {
                                setOcupacionPaciente(e.target.value);
                                setCampoObligatorio(true); // Quita el is-invalid cuando el usuario escribe
                            }}
                            value={ocupacion_paciente}
                        />
                        </FormGroup>
                    </Col>
                    <Col lg="6">
                        <FormGroup>
                        <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                        >
                            Edad
                        </label>
                        <Input
                            className="form-control-alternative"
                            defaultValue="Jesse"
                            id="input-last-name"
                            placeholder="Edad"
                            type="number"
                            onChange={(e) => {
                                setEdadPaciente(e.target.value);
                                setCampoObligatorio(true); // Quita el is-invalid cuando el usuario escribe
                            }}
                            value={edad_paciente}
                        />
                        </FormGroup>
                    </Col>
                    <Col lg="4">
                        <div class="form-group">
                            <label className="form-control-label" htmlFor="input-first-name">Estado civil</label>
                            <select 
                                className="form-control" 
                                id="exampleFormControlSelect1"
                                onChange={(e) => {
                                    setEstadoCivilPaciente(e.target.value);
                                    setCampoObligatorio(true); // Quita el is-invalid cuando el usuario escribe
                                }}
                                value={estado_civil_paciente}
                            >
                                <option value="0">Alige una opción</option>
                                <option value="Casado">Casado</option>
                                <option value="Soltero">Soltero</option>
                            </select>
                        </div>
                    </Col>
                    <Col lg="4">
                        <div class="form-group">
                            <label className="form-control-label" htmlFor="input-first-name">Escolaridad</label>
                            <select 
                                className="form-control" 
                                id="exampleFormControlSelect1"
                                onChange={(e) => {
                                    setEscolaridadPaciente(e.target.value);
                                    setCampoObligatorio(true); // Quita el is-invalid cuando el usuario escribe
                                }}
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
                    <Col lg="4">
                        <div class="form-group">
                            <label className="form-control-label" htmlFor="input-first-name">Sexo</label>
                            <select 
                                className="form-control" 
                                id="exampleFormControlSelect1"
                                onChange={(e) => {
                                    setSexoPaciente(e.target.value);
                                    setCampoObligatorio(true); // Quita el is-invalid cuando el usuario escribe
                                }}
                                value={sexo_paciente}
                            >
                                <option value="0">Alige una opción</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                            </select>
                        </div>
                    </Col>
                    </Row>
                </div>
                <hr className="my-4" />
                {/* Address */}
                <h6 className="heading-small text-muted mb-4">
                    Domicilio
                </h6>
                <div className="pl-lg-0">
                    <Row>
                    <Col md="12">
                        <FormGroup>
                        <label
                            className="form-control-label"
                            htmlFor="input-address"
                        >
                            Calle y numero
                        </label>
                        <Input
                            className="form-control-alternative"
                            id="input-address"
                            placeholder="Calle y numero"
                            type="text"
                            onChange={(e) => {
                                setCallePaciente(e.target.value);
                                setCampoObligatorio(true); // Quita el is-invalid cuando el usuario escribe
                            }}
                            value={calle_paciente}
                        />
                        </FormGroup>
                    </Col>
                    </Row>
                    <Row>
                    <Col lg="4">
                        <FormGroup>
                        <label
                            className="form-control-label"
                            htmlFor="input-city"
                        >
                            Ciudad
                        </label>
                        <Input
                            className="form-control-alternative"
                            defaultValue="Toluca"
                            id="input-city"
                            placeholder="Ciudad"
                            type="text"
                            onChange={(e) => {
                                setCiudadPaciente(e.target.value);
                                setCampoObligatorio(true); // Quita el is-invalid cuando el usuario escribe
                            }}
                            value={ciudad_paciente}
                        />
                        </FormGroup>
                    </Col>
                    <Col lg="4">
                        <FormGroup>
                        <label
                            className="form-control-label"
                            htmlFor="input-country"
                        >
                            País
                        </label>
                        <Input
                            className="form-control-alternative"
                            defaultValue="México"
                            id="input-country"
                            placeholder="País"
                            type="text"
                            onChange={(e) => {
                                setPaisPaciente(e.target.value);
                                setCampoObligatorio(true); // Quita el is-invalid cuando el usuario escribe
                            }}
                            value={pais_paciente}
                        />
                        </FormGroup>
                    </Col>
                    <Col lg="4">
                        <FormGroup>
                        <label
                            className="form-control-label"
                            htmlFor="input-country"
                        >
                            Código postal
                        </label>
                        <Input
                            className="form-control-alternative"
                            id="input-postal-code"
                            placeholder="Codigo postal"
                            type="number"
                            onChange={(e) => {
                                setCodigoPaciente(e.target.value);
                                setCampoObligatorio(true); // Quita el is-invalid cuando el usuario escribe
                            }}
                            value={codigo_paciente}
                        />
                        </FormGroup>
                    </Col>
                    </Row>
                </div>
                <hr className="my-4" />
                {/* Description */}
                <h6 className="heading-small text-muted mb-4">Medio de contacto</h6>
                <div className="pl-lg-0">
                    <div class="form-group">
                        <label className="form-control-label" htmlFor="input-first-name">Conocí la clinica por</label>
                        <select 
                            className="form-control" 
                            id="exampleFormControlSelect1"
                            onChange={(e) => {
                                setMedioPaciente(e.target.value);
                                setCampoObligatorio(true); // Quita el is-invalid cuando el usuario escribe
                            }}
                            value={medio_publicidad}
                        >
                            <option value="0">Alige una opción</option>
                            <option value="Internet">Internet</option>
                            <option value="Recomendacion">Recomendación</option>
                            <option value="Flayer">Flayer</option>
                        </select>
                    </div>
                </div>
                <Col lg="12" className="text-right p-0">
                    <Button  onClick={handleContinue} block color="primary" size="lg" type="button">
                        Continuar
                    </Button>
                </Col>
            </CardBody>

) : (

            <CardBody className="px-lg-5 py-lg-5">
                {/* Cargar PDF desde una ruta específica 
                
                <Document
                    file="../assets/img/HOSTORIA_CLINICA.pdf" // Aquí se coloca la ruta de tu archivo PDF
                    onLoadSuccess={onLoadSuccess}
                >
                    <Page pageNumber={pageNumber} />
                </Document>
                
                */}
                <p>Mostrar pdf</p>
                <input 
                    type="submit"
                    value="Registrar"
                    class="btn btn-primary btn-lg btn-block"
                />
            </CardBody>

)}

          </Card>
</Form>

        </Col>
      </>
    );
  };
  
  export default PacienteNuevo;
  