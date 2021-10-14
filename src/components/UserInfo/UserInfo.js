import React, { useState, useEffect } from "react";
import Parse from "parse/dist/parse.min.js";
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
  // const [total_points, setTotal_points] = useState(0);
  // const [total_days_played, setTotal_days_played] = useState(0);
  // const [total_answered_questions, setTotal_answered_questions] = useState(0);
  // const [readResults, setReadResults] = useState([]);

  const toggle = () => {
    if (isOpen) {
      setIsOpen(false);
      setColumnSize(2);
    } else {
      setIsOpen(true);
      setColumnSize(4);
    }
  };

  // const readStudent = async function () {
  //   // Reading parse objects is done by using Parse.Query
  //   const parseQuery = new Parse.Query("Studentinfo");
  //   try {
  //     let student = await parseQuery.find();
  //     // Be aware that empty or invalid queries return as an empty array
  //     // Set results to state variable
  //     setReadResults(student);
  //     console.log(student);
  //     return true;
  //   } catch (error) {
  //     // Error can be caused by lack of Internet connection
  //     alert(`Error! ${error.message}`);
  //     return false;
  //   }
  // };

  // const retrieveStudent = async () => {
  //   var Student = Parse.Object.extend("Studentinfo");
  //   var query = new Parse.Query(Student);

  //   query.get("lHuM92lCeM").then(
  //     (student) => {
  //       var username = student.get("username");
  //       setUsername(username);

  //       // The object was retrieved successfully.
  //       alert("Name: " + username);
  //     },
  //     (error) => {
  //       // The object was not retrieved successfully.
  //       // error is a Parse.Error with an error code and message.
  //       alert(
  //         "Failed to retrieve the object, with error code: " + error.message
  //       );
  //     }
  //   );
  // };

  // useEffect(() => {
  //   retrieveStudent();
  // });

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
              // total_points={total_points}
              // total_days_played={total_days_played}
              // total_answered_questions={total_answered_questions}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
