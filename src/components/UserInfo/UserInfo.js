import React, { useState, useEffect, useContext } from "react";
import Parse from "parse";
import Sidebar from "../Sidebar/Sidebar";
import "./UserInfo.css";
import { useHistory } from "react-router";
import { Container, Col, Row, Button, Image, Card } from "react-bootstrap";
import { BsPerson } from "react-icons/bs";
import Mascot from "../../images/Mascots/mascot1.png";
import UserInfoTable from "../UserInfoTable/UserInfoTable";

export default function UserInfo() {
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
  const [username, setUsername] = useState("");
  const [total_points, setTotal_points] = useState(0);
  const [active_days, set_active_days] = useState([]);
  const [total_answered_questions, setTotal_answered_questions] = useState(0);

  const toggle = () => {
    if (isOpen) {
      setIsOpen(false);
      setColumnSize(2);
    } else {
      setIsOpen(true);
      setColumnSize(4);
    }
  };

  const retrieveUser = async () => {
    const user = Parse.User.current();
    if (user) {
        var username = user.get("username");
        var total_points = user.get("total_points");
        var active_days = user.get("active_days");
        var total_answered_questions = user.get("total_answered_questions");
        setUsername(username);
        setTotal_points(total_points);
        set_active_days(active_days);
        setTotal_answered_questions(total_answered_questions);
        
        console.log("Name: " + username);
        console.log(user.id);
    } else {
        history.push("/login");
    }
  };

  useEffect(() => {
    retrieveUser();
  }, []);

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
            <h1 className="welcome-h1">Welcome {username}</h1>
          </div>
          <Row>
            <Col md="auto">
              <Card className="title-card">
                <Card.Body>
                  <div className="homesection-btn-div">
                    <Button onClick={handlePractice} className="practice-btn">
                      Practice mode
                    </Button>
                    <Button onClick={handleExam} className="exam-btn">
                      Exam <br />
                      mode
                    </Button>
                  </div>
                </Card.Body>
              </Card>
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
                active_days={active_days.length}
                total_answered_questions={total_answered_questions}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
