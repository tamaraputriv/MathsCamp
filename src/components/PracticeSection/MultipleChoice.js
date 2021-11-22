import React, { useState, useEffect } from "react";
import Parse from "parse";
import Swal from "sweetalert2";
import {
  Container,
  Row,
  Form,
  Col,
  Button,
  Card,
  Image,
} from "react-bootstrap";
import {
  BsLifePreserver,
  BsCheckCircle,
  BsChevronRight,
  BsFileText,
  BsX,
  BsTrophy,
} from "react-icons/bs";
import { useHistory } from "react-router";
import { getMascotImage } from "../Utils";
import SpeakBoble from "../../images/Icons/SpeakBoble.svg";
import "./MultipleChoice.css";
import { hotjar } from "react-hotjar";

export default function MultipleChoice() {
  const [level, setLevel] = useState();
  const [count, setCount] = useState();
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showMotivation, setShowMotivation] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState([]);
  const [chosenOption, setChosenOption] = useState("");
  const [correct_answer, setCorrectAnswer] = useState("");
  const [hint, setHint] = useState("");
  const [explanation, setExplanation] = useState("");
  const [questionImage, setQuestionImage] = useState("");
  const [explanationImage, setExplanationImage] = useState("");
  const [currentQuestionId, setId] = useState("");
  const [total_points, setTotalPoints] = useState(0);
  const [category, setCategory] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [motivationMessage, setMotivationMessage] = useState("");
  const [motivationH1, setMotivationH1] = useState("");
  const motivationH1Correct = [
    "Correct!",
    "Well done!",
    "Impressive,",
    "Super!",
    "Outstanding,",
    "Excellent",
    "Cool!",
    "Groovy,",
  ];
  const correctMotivation = [
    "You're a true math master. Let's do another question.",
    "You are doing so great! Keep on going.",
  ];
  const wrongMotivation = [
    "That wasn’t quite right. Take a look at the explanantion.",
    "Math can be hard. Try taking a look at the explanation.",
    "You still got this! Take a look at the explanation and keep going.",
  ];
  const motivationH1Wrong = ["Woops!", "Oh well..", "Next time!"];
  const [active_mascot_index, setActiveMascotIndex] = useState(24);
  const [hasOptionFraction, setHasOptionFraction] = useState(false);
  const history = useHistory();

  const fetchQuestion = async (info) => {
    setShowMotivation(false);
    var activeMascotIndex = await fetchMascots(info.activeMascotId);
    setActiveMascotIndex(activeMascotIndex);
    const query = new Parse.Query("Questions");
    /*console.log(
      "Retrievestudent returned level: " +
        info.level +
        ", correctids: " +
        info.correct
    );*/
    query.equalTo("category", info.category);
    query.equalTo("level", info.level);
    try {
      let question = await query.find();
      //console.log("array with questions: " + question);
      let foundQuestion = false;
      while (!foundQuestion) {
        let i = getRandomInt(10);
        const currentId = question[i].id;
        //console.log("The current question has this id: " + currentId);
        if (!info.correct.includes(currentId)) {
          //console.log("This question is unanswered");
          const correct_answer = question[i].get("correct_answer");
          const description = question[i].get("description");
          const options = question[i].get("options");
          const hint = question[i].get("hint");
          const explanation = question[i].get("explanation");
          if (question[i].get("question_image")) {
            const questionImageURL = question[i].get("question_image")._url;
            setQuestionImage(questionImageURL);
          }
          if (question[i].get("explanation_image")) {
            const explanationImageURL =
              question[i].get("explanation_image")._url;
            setExplanationImage(explanationImageURL);
          }
          if (options[0].includes("/frac")) {
            setHasOptionFraction(true);
            let regex = /{([^}]+)}/g;
            let result = [];
            for (let i = 0; i < options.length; i++) {
              let matches = [...options[i].matchAll(regex)];
              let resultstring =
                '<div className="fractioncontainer"><sup><u><big>' +
                matches[0][1] +
                '</big></u></sup><br className="fractionbr"/><sup><big>' +
                matches[1][1] +
                "</big></sup></div>";
              result.push(resultstring);
            }
            setOptions(result);
          } else {
            setOptions(options);
          }
          setId(currentId);
          setDescription(description);
          setCorrectAnswer(correct_answer);
          if (hint !== undefined) {
            if (hint.includes("/frac")) {
              let regex = /{([^}]+)}/g;
              let matches = [...hint.matchAll(regex)];
              let resultstring =
                "<br/><br/><p> " +
                matches[1][1] +
                "<br/><u>" +
                matches[0][1] +
                matches[2][1] +
                "</u></p>";
              let end = hint.indexOf("/frac");
              let newHint = hint.substring(0, end);
              setHint(newHint + resultstring);
            } else {
              setHint(hint);
            }
          } else {
            setHint(hint);
          }
          setExplanation(explanation);
          foundQuestion = true;
        } else {
          console.log("The question was in the correct id array");
        }
      }
    } catch (error) {
      console.log(`Error! ${error.message}`);
      Swal.fire({
        title: "Oops, something went wrong!",
        text: "Please try to refresh the page",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const retrieveStudent = () => {
    const category = getRandomCategory();
    const student = Parse.User.current();
    try {
      if (student) {
        const total_points = student.get("total_points");
        const correct = student.get(category + "_correct_ids");
        const level = student.get(category + "_level");
        const count = student.get("practice_timer_count");
        //console.log(count);
        //console.log("Student retrieved correctids: " + correct);
        setTotalPoints(total_points);
        setCategory(category);
        setCount(count);
        setLevel(level);
        var activeMascotId = student.get("active_mascot_id");
        return { level, correct, category, activeMascotId };
      }
    } catch (e) {
      console.log("The user couldn't be retrieved " + e.message);
      Swal.fire({
        title: "Oops, something went wrong!",
        text: "Please try to refresh the page",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const refreshPage = (e) => {
    e.preventDefault();
    hotjar.event("new question");
    history.go(0);
  };

  const fetchMascots = async (active_mascot_id) => {
    const Mascots = new Parse.Object.extend("Mascot");
    const query = new Parse.Query(Mascots);
    const mascotArray = await query.find();
    var mascotIdArray = mascotArray.map((obj) => obj.id);
    var mascotIndex = mascotIdArray.indexOf(active_mascot_id);
    //console.log(mascotIndex + " " + active_mascot_id);
    return mascotIndex;
  };

  useEffect(() => {
    fetchQuestion(retrieveStudent());
  }, []);

  useEffect(() => {
    hotjar.initialize(2701912);
  }, []);

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const getRandomCategory = () => {
    const categories = ["number", "algebra", "measurement", "geometry"];
    const randomNumber = getRandomInt(categories.length);
    const category = categories[randomNumber];
    //console.log("Category: " + category);
    return category;
  };

  const getRandomMotivation = (motivationArray) => {
    let motivation =
      motivationArray[Math.floor(Math.random() * motivationArray.length)];
    return motivation;
  };

  const handleChange = (e) => {
    setChosenOption(e.target.value);
  };

  const toggleHint = () => {
    if (showHint) {
      setShowHint(false);
    } else {
      setShowWarning(false);
      setShowHint(true);
    }
  };

  const toggleExplanation = () => {
    if (!showExplanation) {
      const student = Parse.User.current();
      if (student && explanation !== undefined) {
        student.increment("checked_explanation");
        const totalexplanation = student.get("checked_explanation");
        if (
          (totalexplanation % 20 === 0 || totalexplanation === 5) &&
          0 < totalexplanation &&
          totalexplanation < 81
        ) {
          const reward = getExplanationReward(totalexplanation);
          student.add("reward_badge_ids", reward);
          const points = student.get("total_points");
          const rewardPoints = points + 50;
          student.set("total_points", rewardPoints);
          Swal.fire({
            title: "Yay! You earned a badge!",
            text: "Click OK to see your badge",
            icon: "success",
            showDenyButton: true,
            confirmButtonText: `OK`,
            denyButtonText: `Close`,
          }).then((result) => {
            if (result.isConfirmed) {
              history.push("/reward");
            } else if (result.isDenied) {
              Swal.close();
            }
          });
        }
        student.save();
      }
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

  const showSubmitWarning = () => {
    setShowHint(false);
    setShowWarning(true);
  };

  const showSubmitMotivation = () => {
    setShowWarning(false);
    setSubmitted(true);
    setShowMotivation(true);
    setShowHint(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!chosenOption) {
      showSubmitWarning();
    } else {
      showSubmitMotivation();
    }
    try {
      const student = Parse.User.current();
      if (student) {
        const studentLevel = level;
        let initialCount = count;
        student.set("practice_timer_count", initialCount);
        student.increment("total_answered_questions");
        if (correct_answer === chosenOption) {
          setMotivationH1(getRandomMotivation(motivationH1Correct));
          setMotivationMessage(getRandomMotivation(correctMotivation));
          let new_total_points = total_points + 10;
          student.set("total_points", new_total_points);
          student.add(category + "_correct_ids", currentQuestionId);
          //console.log(currentQuestionId);
          student.increment("total_correct_questions");
          var correct = student.get(category + "_correct_ids");
          if (correct.length === 7) {
            if (studentLevel === 3) {
              student.set(category + "_level", 1);
              Swal.fire({
                title: "Congrats! You finished " + category + "!",
                text:
                  "You have answered all the questions in the " +
                  category +
                  " category. Let's take another round with the same questions. Practice makes perfect.",
                icon: "success",
                confirmButtonText: "OK",
              });
            } else {
              student.increment(category + "_level");
              student.set(category + "_correct_ids", []);
            }
          }
          //console.log("Added to the database in submit: " + correct);
          //console.log("The answer is correct!");
          const total_correct = student.get("total_correct_questions");
          const total_answered = student.get("total_answered_questions");
          if (
            (total_answered % 20 === 0 || total_answered === 5) &&
            0 < total_answered &&
            total_answered < 81
          ) {
            const reward = getTotalAnsweredReward(total_answered);
            student.add("reward_badge_ids", reward);
            const rewardPoints = new_total_points + 50;
            student.set("total_points", rewardPoints);
            Swal.fire({
              title: "Yay! You won a badge!",
              text: "Click OK to see your badge",
              icon: "success",
              showDenyButton: true,
              confirmButtonText: `OK`,
              denyButtonText: `Close`,
            }).then((result) => {
              if (result.isConfirmed) {
                history.push("/reward");
              } else if (result.isDenied) {
                Swal.close();
              }
            });
          }
          if (
            (total_correct % 20 === 0 || total_correct === 5) &&
            0 < total_correct &&
            total_correct < 81
          ) {
            const reward = getTotalCorrectReward(total_correct);
            student.add("reward_badge_ids", reward);
            const originalpoints = student.get("total_points");
            const rewardPoints = originalpoints + 50;
            student.set("total_points", rewardPoints);
            Swal.fire({
              title: "Yay! You won a badge!",
              text: "Click OK to see your badge",
              icon: "success",
              showDenyButton: true,
              confirmButtonText: `OK`,
              denyButtonText: `Close`,
            }).then((result) => {
              if (result.isConfirmed) {
                history.push("/reward");
              } else if (result.isDenied) {
                Swal.close();
              }
            });
          }
        } else {
          setMotivationH1(getRandomMotivation(motivationH1Wrong));
          setMotivationMessage(getRandomMotivation(wrongMotivation));
          let new_total_points = total_points + 5;
          student.set("total_points", new_total_points);
          const total_answered = student.get("total_answered_questions");
          if (
            (total_answered % 20 === 0 || total_answered === 5) &&
            0 < total_answered &&
            total_answered < 81
          ) {
            const reward = getTotalAnsweredReward(total_answered);
            student.add("reward_badge_ids", reward);
            const rewardPoints = new_total_points + 50;
            student.set("total_points", rewardPoints);
            Swal.fire({
              title: "Yay! You won a badge!",
              text: "Click OK to see your badge",
              icon: "success",
              showDenyButton: true,
              confirmButtonText: `OK`,
              denyButtonText: `Close`,
            }).then((result) => {
              if (result.isConfirmed) {
                history.push("/reward");
              } else if (result.isDenied) {
                Swal.close();
              }
            });
          }
        }
        await student.save();
      }
    } catch (error) {
      console.log(`Error! ${error.message}`);
      Swal.fire({
        title: "Oops, something went wrong!",
        text: "Please try to refresh the page",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const getTotalAnsweredReward = (length) => {
    switch (length) {
      case 5: {
        return "QmMHU6HOyE";
      }
      case 20: {
        return "GwG4dzfCuT";
      }
      case 40: {
        return "5IFox85lUC";
      }
      case 60: {
        return "pjukkloh3r";
      }
      case 80: {
        return "0qfqFayIZw";
      }
      default: {
        return "";
      }
    }
  };

  const getTotalCorrectReward = (length) => {
    switch (length) {
      case 5: {
        return "QzQhNUEEp3";
      }
      case 20: {
        return "IxEXq05Whj";
      }
      case 40: {
        return "tSi2TA2olv";
      }
      case 60: {
        return "SlmCKp4FMX";
      }
      case 80: {
        return "f6C0n4oGX6";
      }
      default: {
        return "";
      }
    }
  };

  const getExplanationReward = (length) => {
    switch (length) {
      case 5: {
        return "gRPbOWs9nE";
      }
      case 20: {
        return "HwjknOcp4Y";
      }
      case 40: {
        return "rCADOvIMcB";
      }
      case 60: {
        return "zonuJlC6ZN";
      }
      case 80: {
        return "TBYdE77gyD";
      }
      default: {
        return "";
      }
    }
  };

  useEffect(() => {
    const timer = count > 0 && setInterval(() => setCount(count - 1), 1000);
    if (count == 0) {
      handleBreakTime();
    }
    return () => clearInterval(timer);
  }, [count]);

  const handleBreakTime = (e) => {
    e.preventDefault();
    history.push("/break");
  };

  return (
    <Container fluid className="multiple-container">
      <Row className="question-row">
        <Col className="question-col">
          <div className="category-h1">
            {category ? (
              <h1>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
            ) : (
              <></>
            )}
          </div>
          <Card className="title-card">
            <Card.Body className="text-center">
              <Card.Title className="question-description">
                {description}
              </Card.Title>
            </Card.Body>
          </Card>
          <Image src={questionImage} className="question-img" />
          <Form>
            <Card className="option-card">
              <Card.Body className="text-center">
                <fieldset className="options-form">
                  <Form.Group as={Row}>
                    <Col className="options">
                      {hasOptionFraction
                        ? options.map((option) => (
                            <div key={`${option}`}>
                              <Form.Check
                                type="radio"
                                value={option}
                                label={
                                  <div
                                    dangerouslySetInnerHTML={{ __html: option }}
                                  />
                                }
                                name="formHorizontalRadios"
                                onChange={handleChange}
                                disabled={submitted ? true : false}
                                className={submitted ? checkAnswer(option) : ""}
                              />
                            </div>
                          ))
                        : options.map((option) => (
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
              <div>
                {showExplanation ? (
                  explanation !== undefined ? (
                    <div className="explanation-div">
                      {explanationImage ? (
                        <div className="explanation-img">
                          <Image
                            src={explanationImage}
                            className="explanation-img"
                          />
                        </div>
                      ) : (
                        <></>
                      )}

                      <div className="explanation-text">{explanation}</div>
                    </div>
                  ) : (
                    <div
                      className="explanation-div"
                      style={{ display: showExplanation ? "" : "none" }}
                    >
                      <div className="explanation-text">
                        Sorry, there is no explanation for this questions.
                      </div>
                    </div>
                  )
                ) : (
                  <div></div>
                )}
              </div>
              {submitted ? (
                <div className="btn-div">
                  <Button
                    className="expl-btn quiz-btn"
                    onClick={toggleExplanation}
                  >
                    Explanation
                    <BsFileText className="btn-icon" />
                  </Button>
                  <Button
                    className="next-btn quiz-btn"
                    onClick={refreshPage}
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
        </Col>
        <Col md="auto" className="mascot-col">
          <div style={{ display: showHint ? "" : "none" }}>
            <Image src={SpeakBoble} className="speakboble" />

            {hint ? (
              <div className="speakboble-text text-center">
                <div dangerouslySetInnerHTML={{ __html: hint }} />
              </div>
            ) : (
              <div className="speakboble-text">
                <h2>Sorry,</h2>
                <p>
                  there's no hint for this question. Try to ask your teacher 
                  for help.
                </p>
              </div>
            )}
          </div>
          <div style={{ display: showWarning ? "" : "none" }}>
            <Image src={SpeakBoble} className="speakboble" />
            <div className="speakboble-text">
              <h2>Hold your horses!</h2>
              <p>You need to pick an option.</p>
            </div>
          </div>
          <div style={{ display: showMotivation ? "" : "none" }}>
            <Image src={SpeakBoble} className="speakboble" />
            <div className="speakboble-text">
              <h2>{motivationH1}</h2>
              <p>{motivationMessage}</p>
            </div>
          </div>
          <Image
            src={getMascotImage(active_mascot_index)}
            className="quiz-mascot-img"
          />
        </Col>
      </Row>
    </Container>
  );
}
