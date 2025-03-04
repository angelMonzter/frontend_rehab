import React, { useState } from "react";
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
  Input,
  Col,
} from "reactstrap";
import Header from "components/Headers/Header.js";

const Tables = () => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    users: "",
    project: "",
  });

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Sample data for filtering
  const data = [
    {
      project: "Argon Design System",
      budget: "$2,500 USD",
      status: "pending",
      users: ["Ryan Tompson", "Romina Hadid", "Alexander Smith", "Jessica Doe"],
      completion: 60,
    },
    {
      project: "Angular Now UI Kit PRO",
      budget: "$1,800 USD",
      status: "completed",
      users: ["Ryan Tompson", "Romina Hadid", "Alexander Smith", "Jessica Doe"],
      completion: 100,
    },
  ];

  const filteredData = data.filter((row) => {
    return (
      row.project.toLowerCase().includes(search.toLowerCase()) &&
      (filters.status ? row.status === filters.status : true) &&
      (filters.users ? row.users.includes(filters.users) : true)
    );
  });

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 d-flex justify-content-between">
                <Col lg="5" >
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
                      Project
                    </th>
                    <th scope="col">Budget</th>
                    <th scope="col">
                      Status
                      <select
                        name="status"
                        value={filters.status}
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
                        <option value="">All</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                      </select>
                    </th>
                    <th scope="col">
                      Users
                      <select
                        name="users"
                        value={filters.users}
                        onChange={handleFilterChange}
                        className="mt-1"
                      >
                        <option value="">All</option>
                        <option value="Ryan Tompson">Ryan Tompson</option>
                        <option value="Romina Hadid">Romina Hadid</option>
                        <option value="Alexander Smith">Alexander Smith</option>
                        <option value="Jessica Doe">Jessica Doe</option>
                      </select>
                    </th>
                    <th scope="col">Completion</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((row, index) => (
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
                              src={require("../../assets/img/theme/bootstrap.jpg")}
                            />
                          </a>
                          <Media>
                            <span className="mb-0 text-sm">{row.project}</span>
                          </Media>
                        </Media>
                      </th>
                      <td>{row.budget}</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i
                            className={`${
                              row.status === "pending" ? "bg-warning" : "bg-success"
                            }`}
                          />
                          {row.status}
                        </Badge>
                      </td>
                      <td>
                        <div className="avatar-group">
                          {row.users.map((user, idx) => (
                            <a
                              key={idx}
                              className="avatar avatar-sm"
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                className="rounded-circle"
                                src={require("../../assets/img/theme/team-1-800x800.jpg")}
                              />
                            </a>
                          ))}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">{row.completion}%</span>
                          <div>
                            <Progress
                              max="100"
                              value={row.completion}
                              barClassName={row.completion === 100 ? "bg-success" : "bg-danger"}
                            />
                          </div>
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
                  ))}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Tables;
