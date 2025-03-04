import React, { useState, useEffect, useMemo  } from "react";
import {
  CardBody,
  Button,
  FormGroup,
  Form,
  Col,
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
  Input,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import { showAlert } from "../components/Alert"
import { ToastContainer } from 'react-toastify';

//funciones CRUD axios
import useAdmin from "../hooks/useAdmin";

const Administradores = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [nombre_administrador, setNombreAdmin] = useState('')
  const [correo_administrador, setCorreo] = useState('')
  const [password_administrador, setPassword] = useState('')
  const [administrador_id, setId] = useState('')
  const [rol_administrador, setRol] = useState('')
  const [campoObligatorio, setCampoObligatorio] = useState(true);

  const [botonClase, setBotonClase] = useState("btn btn-primary");
  const [botonTexto, setBotonTexto] = useState("Agregar");

  const { admins, obtenerAdmin, registrarAdmin, eliminarAdmin } = useAdmin();

  useEffect(() => {
    obtenerAdmin();
  }, []);

  /*table filter */
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ rol: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    setCurrentPage(1);
  };

  const filteredAdmins = useMemo(() => {
    return admins.filter((admin) => {
      const matchRol = filters.rol ? admin.rol === filters.rol : true;
      const matchSearch = admin.nombre_administrador.toLowerCase().includes(search.toLowerCase());
      return matchRol && matchSearch;
    });
  }, [admins, filters.rol, search]);
  /*table filter */

  const handleEditar = (admin) => {
    console.log(admin)
    setNombreAdmin(admin.nombre_administrador)
    setCorreo(admin.correo_administrador)
    setRol(admin.rol)
    setId(admin.administrador_id)
    setPassword('')
    setIsFormVisible(!isFormVisible);
    setBotonClase("btn btn-success"); // Cambia la clase
    setBotonTexto("Guardar"); // Cambia el texto
  };

  const handleEliminar = (administrador_id) => {
    eliminarAdmin(administrador_id);
    showAlert('success', 'Administrador eliminado');
  };
  
  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if([nombre_administrador, correo_administrador, password_administrador].includes('')) {
        showAlert('error', 'Datos obligatorios');
        setCampoObligatorio(false);
        return 
    }

    registrarAdmin( nombre_administrador, correo_administrador, password_administrador, rol_administrador, administrador_id );

    if (!administrador_id) {
      showAlert('success', 'Administrador agregado');
    }else{
      showAlert('success', 'Administrador editado');
    }

    setNombreAdmin('');
    setCorreo('');
    setPassword('');
    setRol("0");

    setCampoObligatorio(true);
    obtenerAdmin();

  };

  const totalPages = Math.ceil(filteredAdmins.length / itemsPerPage);
  const displayedAdmins = filteredAdmins.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <>
      <Header />
      <ToastContainer />
      <Container className="mt--7" fluid>
        {/*formulario administradores */}
        <Row className="mb-4">
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Mi Cuenta</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button color="primary" size="sm" onClick={toggleFormVisibility}>
                      {isFormVisible ? "Ocultar formulario" : "Ver formulario"}
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              {isFormVisible && (
                <CardBody>
                  <Form onSubmit={handleSubmit}>
                    <h6 className="heading-small text-muted mb-4">Información del usuario</h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup >
                            <label className="form-control-label" htmlFor="input-username">
                              Nombre
                            </label>
                            <Input
                              className={!campoObligatorio ? "is-invalid" : "form-control-alternative"}
                              id="input-username"
                              name="nombre_administrador"
                              placeholder="Nombre completo"
                              value={nombre_administrador}
                              type="text"
                              onChange={(e) => {
                                setNombreAdmin(e.target.value);
                                setCampoObligatorio(true); // Quita el is-invalid cuando el usuario escribe
                              }}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label className="form-control-label" htmlFor="input-email">
                              Correo
                            </label>
                            <Input
                              className={!campoObligatorio ? "is-invalid" : "form-control-alternative"}
                              id="input-email"
                              name="correo_administrador"
                              placeholder="correo@example.com"
                              type="email"
                              value={correo_administrador}
                              onChange={e => setCorreo(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label className="form-control-label" htmlFor="input-first-name">
                              Contraseña
                            </label>
                            <Input
                              className={!campoObligatorio ? "is-invalid" : "form-control-alternative"}
                              id="input-first-name"
                              name="password_administrador"
                              placeholder="****"
                              value={password_administrador}
                              type="password"
                              onChange={e => setPassword(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <div class="form-group">
                            <label className="form-control-label" htmlFor="input-first-name">Rol</label>
                            <select 
                              className="form-control" 
                              id="exampleFormControlSelect1"
                              value={rol_administrador}
                              onChange={e => setRol(e.target.value)}
                            >
                              <option value="0">Alige un rol</option>
                              <option value="Administrador">Administrador</option>
                              <option value="Terapeuta">Terapeuta</option>
                            </select>
                          </div>
                        </Col>
                        <Col lg="12" className="text-right">
                          <input 
                              type="submit"
                              value={botonTexto}
                              className={botonClase}
                          />
                        </Col>
                        <Input
                          name="administrador_id"
                          value={administrador_id}
                          type="hidden"
                          onChange={e => setId(e.target.value)}
                        />
                      </Row>
                    </div>
                  </Form>
                </CardBody>
              )}
            </Card>
          </Col>
        </Row>

        {/*tabla administradores */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 d-flex justify-content-between">
                <Col lg="5" className="px-0">
                  <h3 className="mb-0 mt-3">Lista de Administradores</h3>
                </Col>
                {/* Search Input */}
                <Col lg="5" className="d-flex justify-content-end">
                  <label htmlFor="" className="mt-3 px-2">Buscar:</label>
                  <Input
                    type="text"
                    placeholder="Buscar..."
                    value={search}
                    onChange={handleSearchChange}
                    className="mb-3 mt-2"
                    style={{
                      width: '60%',
                    }}
                  />
                </Col>
              </CardHeader>

              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">
                      Nombre
                    </th>
                    <th scope="col">Correo</th>
                    <th scope="col">
                      Rol
                      <select
                        name="rol"
                        value={filters.rol}
                        onChange={handleFilterChange}
                        className="mt-1 mx-1 bg-transparent"
                        style={{
                          backgroundColor: "transparent",
                          border: "0px solid #D1D5DB", // Gray color for border
                          borderRadius: "8px",
                          padding: "5px", // Equivalent to p-2 in Tailwind
                          color: "#4B5563", // Text color
                          outline: "none", // Removes default focus outline
                        }}
                      >
                        <option value="">Todos</option>
                        <option value="Administrador">Administrador</option>
                        <option value="Terapeuta">Terapeuta</option>
                      </select>
                    </th>
                    <th scope="col">Acciones</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                {displayedAdmins.length > 0 ? (
                  displayedAdmins.map((admin, index) => (
                    <tr key={index}>
                      <th scope="row">
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={require("../assets/img/user.png")}
                            />
                          </a>
                          <Media>
                            <span className="mb-0 text-sm">{admin.nombre_administrador}</span>
                          </Media>
                        </Media>
                      </th>
                      <td>{admin.correo_administrador}</td>
                      <td>
                        
                        <p 
                            className={`mr-4 btn btn-sm ${
                              admin.rol === "Administrador" ? " btn-primary" : " btn-info"
                            }`}
                        >{admin.rol}</p>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Button className="btn btn-info" onClick={() => handleEditar(admin)}>Editar</Button>
                          <Button className="btn btn-danger" onClick={() => handleEliminar(admin.administrador_id)}>Eliminar</Button>
                        </div>
                      </td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Another action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Something else here
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                   ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center text-black">
                        Aún no se registró ningun Administrador
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
              <CardFooter>
                <Pagination className="pagination justify-content-end mb-0 px-3">
                  <PaginationItem disabled={currentPage === 1}>
                    <PaginationLink previous onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} />
                  </PaginationItem>
                  {[...Array(totalPages)].map((_, index) => (
                    <PaginationItem key={index} active={index + 1 === currentPage}>
                      <PaginationLink onClick={() => setCurrentPage(index + 1)}>{index + 1}</PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem disabled={currentPage === totalPages}>
                    <PaginationLink next onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} />
                  </PaginationItem>
                </Pagination>
              </CardFooter>
            </Card>
          </div>
        </Row>

      </Container>
    </>
  );
};

export default Administradores;
