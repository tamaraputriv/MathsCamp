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
import { MdWavingHand } from "react-icons/";
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
  const [columnSize, setColumnSize] = useState(4);

  const toggle = () => {
    if (isOpen) {
      setIsOpen(false);
      setColumnSize(2);
    } else {
      setIsOpen(true);
      setColumnSize(4);
    }
  };

  return (
    <Container fluid className="home-container">
      <Row>
        <Col className="sidebar-col" lg={columnSize}>
          <Sidebar isOpen={isOpen} toggle={toggle} />
        </Col>
        <Col
          lg={5}
          className="userinfo-col"
          style={{ paddingLeft: isOpen ? "10px" : "100px" }}
        >
          <Row>
            <Col>
              <h1 className="welcome-h1">Welcome, {username}</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="homesection-btn-div">
                <Button onClick={handlePractice} className="lg practice-btn">
                  Practice mode
                </Button>
                <Button onClick={handleExam} className="lg exam-btn">
                  Exam mode
                </Button>
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
              </div>
            </Col>
          </Row>
        </Col>
        <Col
          lg={3}
          className="mascot-col"
          style={{ marginLeft: isOpen ? "0" : "100px" }}
        >
          <Row>
            <Image src={Mascot} className="mascot-img" />
            <Button
              onClick={handleChangeMascot}
              className="change-mascot-btn"
              variant="primary"
              type="submit"
            >
              Change your mascot <BsPerson />
            </Button>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
