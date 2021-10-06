import React from "react";
import "./HomeSection.css";
import { useHistory } from "react-router";
import {
  Container,
  Col,
  Row,
  Button,
  ButtonToolbar,
  Card,
} from "react-bootstrap";

export default function HomeSection({ isOpen, toggle }) {
  const history = useHistory();

  const handlePractice = () => {
    history.push("/practice");
  };

  const handleExam = () => {
    history.push("/exam");
  };
  return (
    <Container
      className="home-container"
      style={{ marginLeft: isOpen ? "" : "20%" }}
    >
      <Row>
        <Col>
          <h1 className="welcome-h1">Welcome to your frontpage</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card body>
            <ButtonToolbar className="homesection-btn-toolbar">
              <Button
                onClick={handlePractice}
                className="btn-primary lg practice-btn"
              >
                Practice mode
              </Button>
              <Button onClick={handleExam} className="btn-primary lg exam-btn">
                Exam mode
              </Button>
            </ButtonToolbar>
          </Card>
        </Col>
        <Col>Mascot Img</Col>
      </Row>
      <Row>
        <Col>
          <div class="table-responsive">
            <table class="table table-hover table-nowrap">
              <thead class="thead-light">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Job Title</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Job Title">
                    <a class="text-heading font-semibold" href="#">
                      Robert Fox
                    </a>
                  </td>
                  <td data-label="Email">
                    <span>Web Designer</span>
                  </td>
                </tr>
                <tr>
                  <td data-label="Job Title">
                    {/* <img alt="..." src="https://images.unsplash.com/photo-1610271340738-726e199f0258?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80" class="avatar avatar-sm rounded-circle me-2"> */}
                    <a class="text-heading font-semibold" href="#">
                      Darlene Robertson
                    </a>
                  </td>
                  <td data-label="Email">
                    <span>Developer</span>
                  </td>
                  <td data-label="Phone">
                    <a class="text-current" href="mailto:darlene@example.com">
                      darlene@example.com
                    </a>
                  </td>
                  <td data-label="Lead Score">
                    <a class="text-current" href="tel:224-567-2662">
                      224-567-2662
                    </a>
                  </td>
                  <td data-label="Company">
                    <span class="badge bg-soft-warning text-warning">5/10</span>
                  </td>
                  <td data-label="">
                    <a class="text-current" href="#">
                      Netguru
                    </a>
                  </td>
                  <td data-label="" class="text-end">
                    <div class="dropdown">
                      <a
                        class="text-muted"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i class="bi bi-three-dots-vertical"></i>
                      </a>
                      <div class="dropdown-menu dropdown-menu-end">
                        <a href="#!" class="dropdown-item">
                          Action
                        </a>
                        <a href="#!" class="dropdown-item">
                          Another action
                        </a>
                        <a href="#!" class="dropdown-item">
                          Something else here
                        </a>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td data-label="Job Title">
                    {/* <img alt="..." src="https://images.unsplash.com/photo-1610878722345-79c5eaf6a48c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80" class="avatar avatar-sm rounded-circle me-2"> */}
                    <a class="text-heading font-semibold" href="#">
                      Theresa Webb
                    </a>
                  </td>
                  <td data-label="Email">
                    <span>Marketing Specialist</span>
                  </td>
                  <td data-label="Phone">
                    <a
                      class="text-current"
                      href="mailto:theresa.webb@example.com"
                    >
                      theresa.webb@example.com
                    </a>
                  </td>
                  <td data-label="Lead Score">
                    <a class="text-current" href="tel:401-505-6800">
                      401-505-6800
                    </a>
                  </td>
                  <td data-label="Company">
                    <span class="badge bg-soft-danger text-danger">2/10</span>
                  </td>
                  <td data-label="">
                    <a class="text-current" href="#">
                      Figma
                    </a>
                  </td>
                  <td data-label="" class="text-end">
                    <div class="dropdown">
                      <a
                        class="text-muted"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i class="bi bi-three-dots-vertical"></i>
                      </a>
                      <div class="dropdown-menu dropdown-menu-end">
                        <a href="#!" class="dropdown-item">
                          Action
                        </a>
                        <a href="#!" class="dropdown-item">
                          Another action
                        </a>
                        <a href="#!" class="dropdown-item">
                          Something else here
                        </a>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
