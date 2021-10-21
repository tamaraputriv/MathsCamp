import React, { useState, useEffect } from "react";
import Parse from "parse";
import {
  Container,
  Row,
  Form,
  Col,
  Button,
  Card,
  Image,
} from "react-bootstrap";
import "./MultipleChoice.css";
import { BsLifePreserver, BsCheckCircle } from "react-icons/bs";
import Mascot from "../../images/Mascots/mascot1.png";
import SpeakBoble from "../../images/Icons/SpeakBoble.svg";

export default function MultipleChoice() {
  const [showHint, setShowHint] = useState(false);
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState([]);
  const [chosenOption, setChosenOption] = useState("");
  const [correct_answer, setCorrectAnswer] = useState("");
  const [hint, setHint] = useState("");
  const [image, setImage] = useState("");
  const [total_points, setTotalPoints] = useState(0);
  const [category, setCategory] = useState("");

  // Level
  const [level, setLevel] = useState(0);

  // Correct answered in levels
  const [correct_ids, setCorrectIds] = useState([]);


  const doQueryByName = async (info) => {
    const query1 = new Parse.Query("Questions");
    query1.equalTo("cat", info.category);
    console.log(category);
    query1.equalTo("level", info.level);
    try {
      let question = await query1.first();
      console.log(question);
      if(question) {
        const description = question.get("description");
        const options = question.get("options");
        const correct_answer = question.get("correct_answer");
        const hint = question.get("hint");
        const image = question.get("img_src");
        setDescription(description);
        setOptions(options);
        setCorrectAnswer(correct_answer);
        setHint(hint);
        setImage(image);
        console.log("getQuestion er blevet kaldt!");
      }
    } catch (error) {
      alert(`Error! ${error.message}`);
    }
  };

  const retrieveStudent = () => {
    const category = getRandomCategoryId()
    const student = Parse.User.current();
    if (student) {
        const total_points = student.get("total_points");
        const level = student.get(category + "_level");
        const correct = student.get(category + "_correct_ids");
        setTotalPoints(total_points);
        setLevel(level);
        setCorrectIds(correct);
        console.log(level + " " + category);
        return {level, category};
    }else{
      alert("The user couldn't be retrieved");
    }
  };

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  // returns a category
  const getRandomCategoryId = () => {
    var categories = [
      "number",
      "algebra",
      "measurement",
      "statistics",
      "geometry",
    ];
    let randomNumber = getRandomInt(5);
    let category = categories[randomNumber];
    console.log("today's category is " + category);
    setCategory(category);
    return category;
  };

  const handleChange = (e) => {
    e.persist();
    console.log(e.target.value);
    setChosenOption(e.target.value);
  };

  const handleSubmit = () => {
    if (correct_answer === chosenOption) {
      alert("the answer is correct!");
    } else {
      alert("the answer is NOT correct!");
    }
  };

  useEffect(() => {
    doQueryByName(retrieveStudent());
  }, []);

  return (
    <Container fluid className="multiple-container">
      <Row>
        <Col md="auto" className="question-img-col">
          <Image src={image} />
        </Col>
        <Col className="question-col">
          <Card className="title-card">
            <Card.Body className="text-center">
              <Card.Title className="question-description">
                {description}
              </Card.Title>
            </Card.Body>
          </Card>
          <Form>
            <Card className="option-card">
              <Card.Body className="text-center">
                <fieldset className="options-form">
                  <Form.Group as={Row}>
                    <Col className="options">
                      {options.map((option) => (
                        <div key={`${option}`}>
                          <Form.Check
                            type="radio"
                            value={option}
                            label={`${option}`}
                            name="formHorizontalRadios"
                            className="option-text"
                            onChange={handleChange}
                          />
                        </div>
                      ))}
                    </Col>
                  </Form.Group>
                </fieldset>
              </Card.Body>
            </Card>

            <Form.Group as={Row} className="mb-8 mt-8">
              <div className="btn-div">
                <Button className="hint-btn quiz-btn" onClick={setShowHint}>
                  Hint
                  <BsLifePreserver className="btn-icon" />
                </Button>
                <Button
                  className="submit-btn quiz-btn"
                  onClick={handleSubmit}
                  type="submit"
                >
                  Submit <BsCheckCircle className="btn-icon" />
                </Button>
              </div>
            </Form.Group>
          </Form>
        </Col>
        <Col md="auto" className="img-col">
          <div style={{ display: showHint ? "" : "none" }}>
            <Image src={SpeakBoble} className="speakboble" />
            <div className="speakboble-text">
              <p>{hint}</p>
            </div>
          </div>
          <Image src={Mascot} className="quiz-mascot-img" />
        </Col>
      </Row>
    </Container>
  );
}
