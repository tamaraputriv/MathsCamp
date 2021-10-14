import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./UserInfo.css";
import { useHistory } from "react-router";
import { Container, Col, Row, Button, Image } from "react-bootstrap";
import { BsPerson } from "react-icons/bs";
import Mascot from "../../images/Mascots/mascot1.png";
import UserInfoTable from "../UserInfoTable/UserInfoTable";

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
      setColumnSize(3);
    } else {
      setIsOpen(true);
      setColumnSize(4);
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
            <Col lg={7}>
              <UserInfoTable
                total_points={total_points}
                total_days_played={total_days_played}
                total_answered_questions={total_answered_questions}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
