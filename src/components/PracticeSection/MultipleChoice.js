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
  const [number_level, setNumberLevel] = useState();
  const [algebra_level, setAlgebraLevel] = useState();
  const [measurement_level, setMeasurementLevel] = useState();
  const [geometry_level, setGeometryLevel] = useState();
  const [statistics_level, setStatisticsLevel] = useState();

  // Correct answered in levels
  const [number_correct, setNumberCorrect] = useState([]);
  const [algebra_correct, setAlgebraCorrect] = useState([]);
  const [measurement_correct, setMeasurementCorrect] = useState([]);
  const [geometry_correct, setGeometryCorrect] = useState([]);
  const [statistics_correct, setStatisticsCorrect] = useState([]);

  const doQueryByName = async function (level) {
    const query1 = new Parse.Query("Questions");
    query1.equalTo("cat", category);
    const query2 = new Parse.Query("Questions");
    query2.equalTo("level", level);
    const query = new Parse.Query("Questions");
    query._andQuery([query1, query2]);
    try {
      let questions = await query.find();
      console.log(questions);
      for (let question of questions) {
        var description = question.get("description");
        var options = question.get("options");
        var correct_answer = question.get("correct_answer");
        var hint = question.get("hint");
        var image = question.get("img_src");
        setDescription(description);
        setOptions(options);
        setCorrectAnswer(correct_answer);
        setHint(hint);
        setImage(image);
        console.log("getQuestion er blevet kaldt!");
      }
      return true;
    } catch (error) {
      alert(`Error! ${error.message}`);
      return false;
    }
  };

  const retrieveStudent = async () => {
    const query = new Parse.Query("Studentinfo");
    query
      .get("AazMFClZa7")
      .then((student) => {
        var total_points = student.get("total_points");
        var number_level = student.get("number_level");
        var number_correct = student.get("number_correct_answered");
        var algebra_level = student.get("algebra_level");
        var algebra_correct = student.get("algebra_correct_answered");
        var measurement_level = student.get("measurement_level");
        var measurement_correct = student.get("measurement_correct_answered");
        var geometry_level = student.get("geometry_level");
        var geometry_correct = student.get("geometry_correct_answered");
        var statistics_level = student.get("statistics_level");
        var statistics_correct = student.get("statistics_correct_answered");
        setTotalPoints(total_points);
        setNumberLevel(number_level);
        setAlgebraLevel(algebra_level);
        setMeasurementLevel(measurement_level);
        setGeometryLevel(geometry_level);
        setStatisticsLevel(statistics_level);
        setNumberCorrect(number_correct);
        setAlgebraCorrect(algebra_correct);
        setMeasurementCorrect(measurement_correct);
        setGeometryCorrect(geometry_correct);
        setStatisticsCorrect(statistics_correct);
      })
      .catch((error) => {
        alert("The username or password is incorrect");
      });
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
    var randomNumber = getRandomInt(5);
    var category = categories[randomNumber];
    console.log("today's category is " + category);
    setCategory(category);
    return category;
  };

  // returns a level and category
  const getInfo = (category) => {
    var level;
    if (category === "number") {
      level = number_level;
    } else if (category === "algebra") {
      level = algebra_level;
    } else if (category === "measurement") {
      level = measurement_level;
    } else if (category === "statistics") {
      level = statistics_level;
    } else {
      var level = geometry_level;
    }
    console.log("today's level is " + level);
    return level;
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
    retrieveStudent();
    doQueryByName(getInfo(getRandomCategoryId()));
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
