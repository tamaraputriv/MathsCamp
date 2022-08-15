import { Container, Form, Col, Row, Button } from "react-bootstrap";
import { CardList, Tree } from "react-bootstrap-icons";
import { useHistory } from "react-router";
import React, { useState, useEffect } from "react";
import Parse from "parse";
import Swal from "sweetalert2";
import "./RegisterComponent.css";
import { hotjar } from "react-hotjar";

export default function RegisterComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [classroomid, setClassroomid] = useState("");
  const history = useHistory();

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateClassroom = (e) => {
    setClassroomid(e.target.value);
  };

  const generateRandomEmail = () => {
    const randomEmail = "random" + getRandomInt(1000) + "@email.com";
    return randomEmail;
  };

  /**
   * This function is a new addition implemented by Tamara-Putri Nge.
   * It is a part of the final bachelor product.
   */
  const generateProgressTables = async (u) => {
    const query = new Parse.Query("Category");
    let categories = await query.find();

    for (let i = 0; i < categories.length; i++) {
      const progressTable = new Parse.Object("Progress");
      progressTable.set("user_id", u.id);
      progressTable.set("category_name", categories[i].get("name"));
      progressTable.set("correct_question_ids", []);
      await progressTable.save();
    }
  };

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };

  /*Signs the user in if there is a password and a username. signUp() checks 
  if the username and email are unique and stores the password securely */
  const handleReg = async (e) => {
    e.preventDefault();
    if (password === "" || username === "") {
      Swal.fire({
        title: "Oops!",
        text: "You need to fill out a username and password",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
    console.log("I am setting the users information");
    const user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    if (email === "" || email === undefined) {
      const randomEmail = generateRandomEmail();
      user.set("email", randomEmail);
    } else {
      user.set("email", email);
    }
    var date = new Date().toLocaleDateString();
    user.add("active_days", date);
    user.add("owned_mascot_ids", "syMxG0A2nM");
    try {
      await user.signUp();

      const classroom = Parse.Object.extend("Classroom");
      const query = new Parse.Query(classroom);
      query.equalTo("classroom_id", classroomid);
      const res = await query.find();

      const student = Parse.User.current();
      query
        .get(res[0]["id"])
        .then((ob) => {
          ob.add("students", student["id"]);
          ob.save();
        })
        .catch((error) => {
          console.log(error);
        });
      await generateProgressTables(user);
      history.push("/frontpage");
    } catch (error) {
      Swal.fire({
        title: "Oops!",
        text:
          "Something went wrong while registering you as a user: " +
          error.message +
          " Please try again!",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.log(error.message);
    }
  };

  useEffect(() => {
    hotjar.initialize(2944506);
  }, []);

  return (
    <Container className="login-container">
      <div className="text-center">
        <Tree size={30} color="#4D4D4D" />
        <h1 className="register-h1">Welcome!</h1>
        <p className="register-p">Create a user and play today</p>
      </div>
      <Container className="form-container">
        <Row>
          <Col>
            <Form onSubmit={handleReg}>
              <Form.Group controlId="formUserName" className="upperform">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter a username"
                  onChange={updateUsername}
                />
              </Form.Group>
              <Form.Group controlId="formPassword" className="upperform">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter a password"
                  onChange={updatePassword}
                />
              </Form.Group>
              <Form.Group controlId="formEmail" className="upperform">
                <Form.Label>Parental email (optional)</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter an email"
                  onChange={updateEmail}
                />
                <p className="information-text">
                  This email will be used for password recovery
                </p>
              </Form.Group>
              <Form.Group controlId="formClassroom" className="upperform">
                <Form.Label>Classroom code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter classcode given by teacher"
                  onChange={updateClassroom}
                />
                <p className="information-text">If no class type: noClass</p>
              </Form.Group>
              <Button className="registerbtn" variant="primary" type="submit">
                Register <CardList />
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
