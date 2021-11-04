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
import {
  BsLifePreserver,
  BsCheckCircle,
  BsChevronRight,
  BsFileText,
} from "react-icons/bs";
import SpeakBoble from "../../images/Icons/SpeakBoble.svg";
import { useHistory } from "react-router";
import { getMascotImage } from "../Utils";

export default function MultipleChoice() {
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showMotivation, setShowMotivation] = useState(false);
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState([]);
  const [chosenOption, setChosenOption] = useState("");
  const [correct_answer, setCorrectAnswer] = useState("");
  const [hint, setHint] = useState("");
  const [explanation, setExplanation] = useState("");
  const [image, setImage] = useState("");
  const [currentQuestionId, setId] = useState("");
  const [total_points, setTotalPoints] = useState(0);
  const [category, setCategory] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState();
  const [motivationH1, setMotivationH1] = useState(["Correct!", "Oh well.."]);
  const [correctMotivation, setCorrectMotivation] = useState([
    "You're a true math master. Let's do another question.",
  ]);
  const [wrongMotivation, setWrongMotivation] = useState([
    "That wasn’t quite right. Take a look at the explanantion.",
  ]);
  const [active_mascot_index, setActiveMascotIndex] = useState(24);

  const fetchQuestion = async (info) => {
    var activeMascotIndex = await fetchMascots(info.activeMascotId);
    setActiveMascotIndex(activeMascotIndex);
    const query = new Parse.Query("Questions");
    console.log(
      "Retrievestudent returned level: " +
        info.level +
        ", correctids: " +
        info.correct
    );
    query.equalTo("category", info.category);
    query.equalTo("level", info.level);
    try {
      let question = await query.find();
      console.log(question);
      for (let i = 0; i < question.length; i++) {
        const currentId = question[i].id;
        console.log(currentId);
        if (!info.correct.includes(currentId)) {
          console.log("This question is unanswered");
          const correct_answer = question[i].get("correct_answer");
          const description = question[i].get("description");
          const options = question[i].get("options");
          const hint = question[i].get("hint");
          const explanation = question[i].get("explanation");
          const image = question[i].get("img_src");
          setId(currentId);
          setDescription(description);
          setOptions(options);
          setCorrectAnswer(correct_answer);
          setHint(hint);
          setExplanation(explanation);
          setImage(image);
          break;
        } else {
          console.log("The question was in the correct id array");
        }
      }
    } catch (error) {
      alert(`Error! ${error.message}`);
    }
  };

  const retrieveStudent = () => {
    const category = getRandomCategory();
    const student = Parse.User.current();
    if (student) {
      //Adde checks for reward
      const total_points = student.get("total_points");
      const correct = student.get(category + "_correct_ids");
      const level = student.get(category + "_level");
      console.log("Student retrieved correctids: " + correct);
      setTotalPoints(total_points);
      setCategory(category);
      var activeMascotId = student.get("active_mascot_id");
      return { level, correct, category, activeMascotId };
    } else {
      alert("The user couldn't be retrieved");
    }
  };

  const fetchMascots = async (active_mascot_id) => {
    const Mascots = new Parse.Object.extend("Mascot");
    const query = new Parse.Query(Mascots);
    const mascotArray = await query.find();
    var mascotIdArray = mascotArray.map((obj) => obj.id);
    var mascotIndex = mascotIdArray.indexOf(active_mascot_id);
    console.log(mascotIndex + " " + active_mascot_id);
    return mascotIndex;
  };

  useEffect(() => {
    fetchQuestion(retrieveStudent());
  }, []);

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  //Returns a random category
  const getRandomCategory = () => {
    const categories = [
      "number",
      "algebra",
      "measurement",
      //"statistics",
      "geometry",
    ];
    const randomNumber = getRandomInt(4);
    const category = categories[randomNumber];
    console.log("Category: " + category);
    return category;
  };

  const handleChange = (e) => {
    setChosenOption(e.target.value);
  };

  const toggleHint = () => {
    if (showHint) {
      setShowHint(false);
    } else {
      setShowHint(true);
    }
  };

  const toggleExplanation = () => {
    if (showExplanation) {
      setShowExplanation(false);
    } else {
      setShowExplanation(true);
    }
  };

  const checkAnswer = (option) => {
    var optionClass = "";
    if (option === chosenOption) {
      if (option === correct_answer) {
        optionClass = "correct-answer";
      } else {
        optionClass = "wrong-answer";
      }
    }
    return optionClass;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setShowMotivation(true);
    try {
      const student = Parse.User.current();
      if (student) {
        if (correct_answer === chosenOption) {
          setIsCorrect(true);
          var new_total_points = total_points + 10;
          student.set("total_points", new_total_points);
          student.add(category + "_correct_ids", currentQuestionId);
          console.log(currentQuestionId);
          student.increment("total_correct_questions");
          var correct = student.get(category + "_correct_ids");
          // Remember to change from 2 to 7
          if (correct.length == 2) {
            student.increment(category + "_level");
          }
          console.log("Added to the database in submit: " + correct);
          console.log("The answer is correct!");
        } else {
          var new_total_points = total_points + 5;
          student.set("total_points", new_total_points);
          console.log("The answer is NOT correct!");
          setIsCorrect(false);
        }
        student.increment("total_answered_questions");
        await student.save();
      }
    } catch (error) {
      alert("Could not submit your answer, try again!");
    }
  };

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
                            onChange={handleChange}
                            disabled={submitted ? true : false}
                            className={
                              submitted ? checkAnswer(`${option}`) : ""
                            }
                          />
                        </div>
                      ))}
                    </Col>
                  </Form.Group>
                </fieldset>
              </Card.Body>
            </Card>

            <Form.Group as={Row} className="mb-8 mt-8">
              {submitted ? (
                <div className="btn-div">
                  {showExplanation ? (
                    <Button
                      className="close-expl-btn quiz-btn"
                      onClick={toggleExplanation}
                    >
                      Close explanation
                      <BsFileText className="btn-icon" />
                    </Button>
                  ) : (
                    <Button
                      className="expl-btn quiz-btn"
                      onClick={toggleExplanation}
                    >
                      Explanation
                      <BsFileText className="btn-icon" />
                    </Button>
                  )}
                  <Button
                    className="next-btn quiz-btn"
                    onClick={() => fetchQuestion(retrieveStudent())}
                    type="submit"
                  >
                    Next question
                    <BsChevronRight className="btn-icon" />
                  </Button>
                </div>
              ) : (
                <div className="btn-div">
                  {showHint ? (
                    <Button
                      className="close-hint-btn quiz-btn"
                      onClick={toggleHint}
                    >
                      Close hint
                      <BsLifePreserver className="btn-icon" />
                    </Button>
                  ) : (
                    <Button className="hint-btn quiz-btn" onClick={toggleHint}>
                      Hint
                      <BsLifePreserver className="btn-icon" />
                    </Button>
                  )}
                  <Button
                    id="sub-btn"
                    className="sub-btn quiz-btn"
                    onClick={handleSubmit}
                    type="submit"
                  >
                    Submit <BsCheckCircle className="btn-icon" />
                  </Button>
                </div>
              )}
            </Form.Group>
          </Form>
          <div style={{ display: showExplanation ? "" : "none" }}>
            <div className="explanation-div"> {explanation}</div>
          </div>
        </Col>
        <Col md="auto" className="img-col">
          <div style={{ display: showHint ? "" : "none" }}>
            <Image src={SpeakBoble} className="speakboble" />
            <div className="speakboble-text">
              <p>{hint}</p>
            </div>
          </div>
          <div style={{ display: showMotivation ? "" : "none" }}>
            <Image src={SpeakBoble} className="speakboble" />
            <div className="speakboble-header">
              {isCorrect ? <>{motivationH1[0]}</> : <>{motivationH1[1]}</>}
            </div>
            <div className="speakboble-text">
              {isCorrect ? (
                <>{correctMotivation[0]}</>
              ) : (
                <>{wrongMotivation[0]}</>
              )}
            </div>
          </div>
          <Image
            src={getMascotImage(active_mascot_index)}
            className="quiz-mascot-img"
          />
        </Col>
      </Row>
      <Row>
        <Col></Col>
      </Row>
    </Container>
  );
}
