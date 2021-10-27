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
  const [currentQuestionId, setId] = useState("");
  const [total_points, setTotalPoints] = useState(0);
  const [category, setCategory] = useState("");
  const [points, setPoints] = useState(0);

  // Level
  //const [level, setLevel] = useState(0);

  // Correct answered in levels
  const [correct_ids, setCorrectIds] = useState([]);

  const doQueryByCatAndLevel = async (info) => {
    const query1 = new Parse.Query("Questions");
    query1.equalTo("category", info.category);
    query1.equalTo("level", info.level);
    try {
      let question = await query1.first();
      const currentQuestionId = question.id;
      const correctArray = info.correct;
      console.log("CORRECT IDS: " + info.correct);
      if (!correctArray.includes(currentQuestionId)) {
        console.log("UNanswered");
        const correct_answer = question.get("correct_answer");
        const description = question.get("description");
        const options = question.get("options");
        const hint = question.get("hint");
        const image = question.get("img_src");
        setId(currentQuestionId);
        setDescription(description);
        setOptions(options);
        setCorrectAnswer(correct_answer);
        setHint(hint);
        setImage(image);
      } else {
        console.log("answered");
      }
    } catch (error) {
      alert(`Error! ${error.message}`);
    }
  };

  const retrieveStudent = () => {
    const category = getRandomCategory();
    const student = Parse.User.current();
    if (student) {
      const total_points = student.get("total_points");
      const level = student.get(category + "_level");
      const correct = student.get(category + "_correct_ids");
      setTotalPoints(total_points);
      setCorrectIds(correct);
      console.log(correct);
      return { level, category, correct };
    } else {
      alert("The user couldn't be retrieved");
    }
  };

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  // returns a random category
  const getRandomCategory = () => {
    const categories = [
      "number",
      "algebra",
      "measurement",
      "statistics",
      "geometry",
    ];
    const randomNumber = getRandomInt(5);
    const category = categories[randomNumber];
    setCategory(category);
    console.log("CATEGORY: " + category);
    return category;
  };

  const handleChange = (e) => {
    e.persist();
    console.log(e.target.value);
    setChosenOption(e.target.value);
  };

  const handleSubmit = async () => {
    if (correct_answer === chosenOption) {
      const student = Parse.User.current();
      if(student){
        var new_total_points = total_points + 5;
        student.set("total_points", new_total_points);
        var idArray = [currentQuestionId];
        var newCorrectArray = correct_answer.concat(idArray);
        setCorrectIds(newCorrectArray);
        student.add(category + "_correct_ids", currentQuestionId);
        console.log("currentQuestionId" + currentQuestionId);
        var correct = await student.get(category + "_correct_ids");
        setCorrectAnswer(correct);
        student.save();
      }
      alert("The answer is correct!");
    } else {
      alert("The answer is NOT correct!");
    }
  };

  useEffect(() => {
    doQueryByCatAndLevel(retrieveStudent());
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
