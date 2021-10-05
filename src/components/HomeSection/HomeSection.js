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
        <Col>Strikes</Col>
      </Row>
    </Container>
  );
}
