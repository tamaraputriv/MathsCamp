import React, { useState } from "react";
import "./HomeSection.css";
import { useHistory } from "react-router";
import {
  Container,
  Col,
  Row,
  Button,
  ButtonToolbar,
  Card,
  Table,
} from "react-bootstrap";
import { BsFillSunFill, BsFillFilterSquareFill, BsGem } from "react-icons/bs";

export default function HomeSection({ isOpen, toggle }) {
  const [daysPlayed, setDaysPlayed] = useState(0);
  const [questionsAnswered, setQuestionAnswered] = useState(0);
  const [points, setPoints] = useState(0);

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
        <h2 className="strike-h2">Your strikes</h2>
      </Row>
      <Row>
        <Col lg={4}>
          <div>
            <Table>
              <thead className="thead-light table-header">
                <tr>
                  <th scope="col" className="table-header">
                    CATEGORY
                  </th>
                  <th scope="col" className="table-header">
                    AMOUNT
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="body-text">
                    <BsFillSunFill
                      size={25}
                      className="category-icon"
                      color={"#F2B84B"}
                    />
                    Days you played
                  </td>
                  <td data-label="Days played" className="body-text">
                    {daysPlayed} days
                  </td>
                </tr>
                <tr>
                  <td className="body-text">
                    <BsFillFilterSquareFill
                      size={25}
                      className="category-icon"
                      color={"#FF6665"}
                    />
                    Questions you answered
                  </td>
                  <td data-label="Questions you answered" className="body-text">
                    <span>{questionsAnswered} questions</span>
                  </td>
                </tr>
                <tr>
                  <td className="body-text">
                    <BsGem
                      size={25}
                      className="category-icon"
                      color={"#7C7EF2"}
                    />
                    Your Points
                  </td>
                  <td data-label="Your points" className="body-text">
                    <span>{points} points</span>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
