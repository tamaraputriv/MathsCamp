import React from "react";
import "./UserInfo.css";
import { useHistory } from "react-router";
import { Container, Col, Row, Button, Table, Image } from "react-bootstrap";
import {
  BsFillSunFill,
  BsFillFilterSquareFill,
  BsGem,
  BsPerson,
} from "react-icons/bs";
import Mascot from "../../images/Mascots/mascot1.png";

export default function UserInfo({
  username,
  total_points,
  total_days_played,
  total_answered_questions,
}) {
  const history = useHistory();

  const handlePractice = () => {
    history.push("/practice");
  };

  const handleExam = () => {
    history.push("/exam");
  };

  const handleChangeMascot = () => {
    history.push("/mascot");
  };

  return (
    <Container fluid className="home-container">
      <Row>
        <Col>
          <h1 className="welcome-h1">Welcome to your frontpage, {username}</h1>
        </Col>
      </Row>
      <Row>
        <Col lg="7">
          <div className="homesection-btn-div">
            <Button onClick={handlePractice} className="lg practice-btn">
              Practice mode
            </Button>
            <Button onClick={handleExam} className="lg exam-btn">
              Exam mode
            </Button>
          </div>
        </Col>
        <Col>
          <div className="mascot-div">
            <Row>
              <div className="mascot-img-container">
                <Image src={Mascot} />
              </div>
            </Row>
            <Row>
              <Button
                onClick={handleChangeMascot}
                className="change-mascot-btn"
                variant="primary"
                type="submit"
              >
                Change your mascot <BsPerson />
              </Button>
            </Row>
          </div>
        </Col>
      </Row>
      <Row>
        <h2 className="strike-h2">Your strikes</h2>
      </Row>
      <Row>
        <Col lg={6}>
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
                    {total_days_played} days
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
                    <span>{total_answered_questions} questions</span>
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
                    <span>{total_points} points</span>
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
