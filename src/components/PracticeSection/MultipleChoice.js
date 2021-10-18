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

  const retrieveQuestion = async () => {
    const Question = Parse.Object.extend("Questions");
    const query = new Parse.Query(Question);

    query.get("61w4Jy1Wc0").then(
      (question) => {
        var description = question.get("description");
        var option_1 = question.get("option_1");
        var option_2 = question.get("option_2");
        var option_3 = question.get("option_3");
        var option_4 = question.get("option_4");
        var option_5 = question.get("option_5");
        var correct_answer = question.get("correct_answer");
        var hint = question.get("hint");
        var image = question.get("img_src");
        setDescription(description);
        setOptions(
          options.concat(option_1, option_2, option_3, option_4, option_5)
        );
        setHint(hint);
        setImage(image);
        setCorrectAnswer(correct_answer);
      },
      (error) => {
        // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and message.
        alert(
          "Failed to retrieve the object, with error code: " + error.message
        );
      }
    );
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
    retrieveQuestion();
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
