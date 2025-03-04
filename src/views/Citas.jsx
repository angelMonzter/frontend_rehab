import React, { useState } from "react";
import {
  Card,
  CardHeader,
  Container,
  Row,
  CardBody,
  Button,
  FormGroup,
  Form,
  Input,
  Col,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

DataTable.use(DT);

const Citas = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    username: "lucky.jesse",
    email: "jesse@example.com",
    firstName: "Lucky",
    lastName: "Jesse",
  });

  const [tableData] = useState([
    ["Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800"],
    ["Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750"],
  ]);

  const handleButtonClick = (name) => {
    alert(`Detalles de: ${name}`);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Mi Cuenta</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button color="primary" size="sm" onClick={toggleFormVisibility}>
                      {isFormVisible ? "Ocultar" : "Settings"}
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              {isFormVisible && (
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">Información del usuario</h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label className="form-control-label" htmlFor="input-username">
                              Username
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-username"
                              name="username"
                              placeholder="Username"
                              type="text"
                              value={formData.username}
                              onChange={handleInputChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label className="form-control-label" htmlFor="input-email">
                              Email address
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-email"
                              name="email"
                              placeholder="jesse@example.com"
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label className="form-control-label" htmlFor="input-first-name">
                              First name
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-first-name"
                              name="firstName"
                              placeholder="First name"
                              type="text"
                              value={formData.firstName}
                              onChange={handleInputChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label className="form-control-label" htmlFor="input-last-name">
                              Last name
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-last-name"
                              name="lastName"
                              placeholder="Last name"
                              type="text"
                              value={formData.lastName}
                              onChange={handleInputChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                  </Form>
                </CardBody>
              )}
            </Card>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            <Card className="shadow p-4">
              <CardHeader className="border-0 py-2">
                <h3 className="mb-0">Calendario</h3>
              </CardHeader>
              <CardBody>
                <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Citas;
