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
import { useNavigate } from "react-router-dom";

//funciones CRUD axios
import usePaciente from "hooks/usePaciente";

const Pacientes = () => {
  const { obtenerPaciente, pacientes, eliminarPaciente, paciente_nuevo } = usePaciente();
  const navigate = useNavigate();

  useEffect(() => {
    obtenerPaciente();
    console.log(pacientes);
  }, []);

  /*table filter */
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState({ status_paciente: "" });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
  
    const handleSearchChange = (e) => {
      setSearch(e.target.value);
      setCurrentPage(1);
    };
  
    const handleFilterChange = (e) => {
      const { name, value } = e.target;
      console.log(name)
      console.log(value)
      setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
      setCurrentPage(1);
    };
  
    const filteredPacientes = useMemo(() => {
      return pacientes.filter((paciente) => {
        const matchStatus = filters.status_paciente ? paciente.status_paciente === filters.status_paciente : true;
        const matchSearch = paciente.nombre_paciente.toLowerCase().includes(search.toLowerCase());
        const omitNewStatus = paciente.status_paciente !== "nuevo"; // Excluye a los "nuevo"
        
        return matchStatus && matchSearch && omitNewStatus;
      });
    }, [pacientes, filters.status_paciente, search]);

    const filteredPacientesNew = useMemo(() => {
      return pacientes.filter((paciente) => {
        const omitNewStatus = paciente.status_paciente == "nuevo"; // Excluye a los "nuevo"
        
        return omitNewStatus;
      });
    }, [pacientes]);
    /*table filter */

  const handleButtonClick = (paciente_id) => {
    const url = `/admin/historia-clinica/${paciente_id}`;
    navigate(url);
  };

  const handleExpedientes = (paciente_id) => {
    alert(paciente_id);
  };

  const handleEditar = (administrador_id) => {
    console.log(administrador_id)
  };

  const handleEliminar = (paciente_id) => {
    console.log(paciente_id);
    eliminarPaciente(paciente_id);
    showAlert('success', 'Paciente eliminado');
  };

  const totalPages = Math.ceil(filteredPacientes.length / itemsPerPage);
  const displayedPacientes = filteredPacientes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <>
      <Header />
      <ToastContainer />
      <Container className="mt--7" fluid>

        {/* Tabla Pacientes nuevos */}
        <Row className="mb-4">
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Pacientes Actuales</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="">
                  <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Edad</th>
                    <th scope="col">Teléfono</th>
                    <th scope="col">Sexo</th>
                    <th scope="col">Estatus</th>
                    <th scope="col">Acciones</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                {filteredPacientesNew.length > 0 ? (
                  filteredPacientesNew.map((paciente, index) => (
                    <tr key={index}>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">{paciente.nombre_paciente}</span>
                          </Media>
                        </Media>
                      </th>
                      <td>{paciente.edad_paciente}</td>
                      <td>{paciente.telefono_paciente}</td>
                      <td>{paciente.sexo_paciente}</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-success" />
                          {paciente.status_paciente}
                        </Badge>
                      </td>
                      <td>
                        <Button className="btn btn-success" onClick={() => handleButtonClick(paciente.paciente_id)}>Atender</Button>
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
                            <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                              Ver Detalles
                            </DropdownItem>
                            <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                              Editar
                            </DropdownItem>
                            <DropdownItem href="#!" onClick={() => handleEliminar(paciente.paciente_id)}>
                              Eliminar
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-black">
                      Aún no se registró ningun paciente
                    </td>
                  </tr>
                )}
                </tbody>
              </Table>
              
            </Card>
          </div>
        </Row>

        {/*tabla Pacientes */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 d-flex justify-content-between">
                <Col lg="5" className="px-0">
                  <h3 className="mb-0 mt-3">Lista de Pacientes</h3>
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
                    <th scope="col">Edad</th>
                    <th scope="col">Teléfono</th>
                    <th scope="col">Sexo</th>
                    <th scope="col">
                      Estatus
                      <select
                        name="status_paciente"
                        value={filters.status_paciente}
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
                        <option value="activo">Activo</option>
                        <option value="inactivo">Inactivo</option>
                      </select>
                    </th>
                    <th scope="col">Acciones</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                {displayedPacientes.length > 0 ? (
                  displayedPacientes.map((paciente, index) => (
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
                            <span className="mb-0 text-sm">{paciente.nombre_paciente}</span>
                          </Media>
                        </Media>
                      </th>
                      <td>{paciente.edad_paciente}</td>
                      <td>{paciente.telefono_paciente}</td>
                      <td>{paciente.sexo_paciente}</td>
                      <td>
                        <p 
                            className={`mr-4 btn btn-sm ${
                              paciente.status_paciente === "activo" ? " btn-success" : " btn-danger"
                            }`}
                        >{paciente.status_paciente}</p>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Button className="btn btn-info" onClick={() => handleEditar(paciente.paciente_id)}>Editar</Button>
                          <Button className="btn btn-danger" onClick={() => handleEliminar(paciente.paciente_id)}>Eliminar</Button>
                          <Button className="btn btn-warning" onClick={() => handleExpedientes(paciente.paciente_id)}>Expediente</Button>
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
                        Aún no se registró ningun paciente
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

export default Pacientes;
