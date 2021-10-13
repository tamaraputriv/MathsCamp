import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
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

  const [isOpen, setIsOpen] = useState(true);
  const [columnSize, setColumnSize] = useState(5);

  const toggle = () => {
    if (isOpen) {
      setIsOpen(false);
      setColumnSize(3);
    } else {
      setIsOpen(true);
      setColumnSize(5);
    }
  };

  return (
    <Container className="home-container">
      <Row>
        <Col lg={columnSize}>
          <Sidebar isOpen={isOpen} toggle={toggle} />
        </Col>
        <Col
          className="userinfo-col"
          style={{ paddingLeft: isOpen ? "20px" : "100px" }}
        >
          <div>
            <h1 className="welcome-h1">Welcome, {username}</h1>
          </div>
          <Row>
            <Col>
              <div className="homesection-btn-div">
                <Button onClick={handlePractice} className="lg practice-btn">
                  Practice mode
                </Button>
                <Button onClick={handleExam} className="lg exam-btn">
                  Exam <br />
                  mode
                </Button>
              </div>
            </Col>
            <Col className="mascot-col">
              <Image src={Mascot} className="mascot-img" />
              <Button
                onClick={handleChangeMascot}
                className="change-mascot-btn"
                variant="primary"
                type="submit"
              >
                Change your mascot <BsPerson />
              </Button>
            </Col>
          </Row>
          <div>
            <h2 className="strike-h2">Your strikes</h2>
          </div>
          <Row>
            <Col lg={6}>
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
                    <td
                      data-label="Questions you answered"
                      className="body-text"
                    >
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
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
