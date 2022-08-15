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
  BsCoin,
} from "react-icons/bs";
import { Gem } from "react-bootstrap-icons";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import { getTeacherImage } from "../Utils";
import SpeakBoble from "../../images/Icons/SpeakBoble.svg";
import "./MultipleChoice.css";
import { hotjar } from "react-hotjar";

import { updatePointsOnCorrectAnswer } from "../../db/submittingAnswers";
import { registerPoints } from "../../db/submittingPoints";

/**
 * Changes to this component has been implemented by Tamara-Putri Nge.
 * It is a part of the final bachelor product.
 *
 * Look for comments in order to know the exact contributions.
 */

export default function MultipleChoice() {
  /** Added hooks by Tamara:
   * setLevel
   * set
   */
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
  const [total_coins, setTotalCoins] = useState(0);
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
  const location = useLocation();

  const correct_answer_point_reward = 25;
  const correct_answer_coins_reward = 10;
  const get_bagde_point_reward = 50;
  const get_bagde_coins_reward = 25;

  /**
   * This function has been altered by Tamara.
   * It now fetches a question based on the information provided by the user return by the retrieveStudent-function.
   * Also, it only presents questions within a chosen category.
   */

  const fetchQuestion = async (info) => {
    var activeMascotIndex = await fetchMascots(info.activeMascotId);
    setActiveMascotIndex(activeMascotIndex);
    const student = Parse.User.current();

    const Progress = Parse.Object.extend("Progress");
    const query = new Parse.Query(Progress);

    query.equalTo("user_id", student.id);
    query.equalTo("category_name", info.category);
    const res = await query.find();
    const progressTable = res[0];
    const progressLevel = progressTable.get("current_level");
    const answeredQuestions = progressTable.get("correct_question_ids");
    const questionQuery = new Parse.Query("Questions");
    questionQuery.equalTo("category", info.category);
    questionQuery.equalTo("level", progressLevel);
    try {
      let question = await questionQuery.find();
      let foundQuestion = false;
      while (!foundQuestion) {
        let i = getRandomInt(question.length);
        const currentId = question[i].id;
        /* Checking if the question has been answered */
        if (!answeredQuestions.includes(currentId)) {
          const correct_answer = question[i].get("correct_answer");
          console.log(correct_answer);
          const description = question[i].get("description");
          const options = question[i].get("options");
          const hint = question[i].get("hint");
          const explanation = question[i].get("explanation");
          if (question[i].get("question_image")) {
            const questionImageURL = question[i].get("question_image")._url;
            setQuestionImage(questionImageURL);
          } else setQuestionImage("No image for this question.");
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
      console.log(error.message);
      Swal.fire({
        title: "Oops, something went wrong!",
        text: "Please try to refresh the page",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  /**
   * This function has been altered by Tamara.
   * It now fetches the progress table related to the user and chosen category.
   */

  const retrieveStudent = (categoryState) => {
    const category = location.state;
    var cat;
    if (typeof category === "undefined") {
      cat = categoryState;
    } else {
      cat = category;
    }
    const student = Parse.User.current();
    try {
      if (student) {
        console.log("who is student", student);
        const user_points = student.get("total_points");
        const user_coins = student.get("coins");
        const count = student.get("practice_timer_count");

        setTotalPoints(user_points);
        setTotalCoins(user_coins);
        setCategory(category);
        setCount(count);

        var activeMascotId = student.get("active_mascot_id");
        return { category, activeMascotId };
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
    setSubmitted(false);
    setShowExplanation(false);
    setShowMotivation(false);
    fetchQuestion(retrieveStudent(location.state));
  };

  const fetchMascots = async (active_mascot_id) => {
    const Mascots = new Parse.Object.extend("Mascot");
    const query = new Parse.Query(Mascots);
    const mascotArray = await query.find();
    var mascotIdArray = mascotArray.map((obj) => obj.id);
    var mascotIndex = mascotIdArray.indexOf(active_mascot_id);
    return mascotIndex;
  };

  useEffect(() => {
    fetchQuestion(retrieveStudent());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    hotjar.initialize(2944506);
  }, []);

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

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
          const originalCoins = student.get("coins");
          student.set("total_points", points + get_bagde_point_reward);
          student.set("coins", originalCoins + get_bagde_coins_reward);

          registerPoints(student.id, get_bagde_point_reward);

          Swal.fire({
            title: "Yay! You earned a badge!",
            text: "Take a look at the badge you earned or continue your practice.",
            icon: "success",
            showDenyButton: true,
            confirmButtonText: `See badge`,
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

  const categoryCompleteNotification = () => {
    Swal.fire({
      title: "Congrats! You finished " + category + "!",
      text:
        "You have answered all the questions in the " +
        category +
        " category. Let's take another round with the same questions. Practice makes perfect.",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  /**
   * This function has been altered by Tamara.
   * It now fetches updated information in the current users related progress table.
   * Also, the amount of points rewarded when answering questions has been altered.
   */

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!chosenOption) {
      showSubmitWarning();
    } else {
      showSubmitMotivation();
      console.log(location.state);
    }
    try {
      const student = Parse.User.current();
      if (student) {
        const studentId = student.id;
        const studentLevel = level;
        let initialCount = count;
        student.set("practice_timer_count", initialCount);
        student.increment("total_answered_questions");

        if (correct_answer === chosenOption) {
          setMotivationH1(getRandomMotivation(motivationH1Correct));
          setMotivationMessage(getRandomMotivation(correctMotivation));
          let new_total_points = total_points + correct_answer_point_reward;
          let new_total_coins = total_coins + correct_answer_coins_reward;
          const Progress = Parse.Object.extend("Progress");
          const query = new Parse.Query(Progress);
          query.equalTo("user_id", studentId);
          query.equalTo("category_name", category);
          const res = await query.find();
          const progressTable = res[0];
          query
            .get(progressTable["id"])
            .then((obj) => {
              if (obj.exists(currentQuestionId)) {
                console.log("question already answered");
              } else {
                obj.add("correct_question_ids", currentQuestionId);
                obj.save();
              }
            })
            .catch((error) => {
              console.log(error);
            });
          student.increment("total_correct_questions");
          var correct = progressTable.get("correct_question_ids");
          var currentLevel = progressTable.get("correct_question_ids");
          if (correct.length === 7) {
            if (currentLevel === 3) {
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
              progressTable.increment("current_level");
              progressTable.set("correct_question_ids", []);
            }
          }

          updatePointsOnCorrectAnswer(
            student,
            studentId,
            category,
            currentQuestionId,
            studentLevel,
            new_total_points,
            new_total_coins,
            categoryCompleteNotification
          );

          const total_correct = student.get("total_correct_questions");
          const total_answered = student.get("total_answered_questions");

          registerPoints(student.id, correct_answer_point_reward);

          if (
            (total_answered % 20 === 0 || total_answered === 5) &&
            0 < total_answered &&
            total_answered < 81
          ) {
            const reward = getTotalAnsweredReward(total_answered);
            student.add("reward_badge_ids", reward);
            student.set("total_points", total_points + get_bagde_point_reward);
            registerPoints(student.id, get_bagde_point_reward);
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
            const points = student.get("total_points");
            const originalCoins = student.get("coins");
            student.set("total_points", points + get_bagde_point_reward);
            student.set("coins", originalCoins + get_bagde_coins_reward);
            registerPoints(student.id, get_bagde_point_reward);
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
          const total_answered = student.get("total_answered_questions");
          if (
            (total_answered % 20 === 0 || total_answered === 5) &&
            0 < total_answered &&
            total_answered < 81
          ) {
            const reward = getTotalAnsweredReward(total_answered);
            student.add("reward_badge_ids", reward);
            const points = student.get("total_points");
            const originalCoins = student.get("coins");
            student.set("total_points", points + get_bagde_point_reward);
            student.set("coins", originalCoins + get_bagde_coins_reward);
            registerPoints(student.id, get_bagde_point_reward);
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

  /**
   * This function has been implemented in order to allow the students to provide direct feedback through the application.
   */

  const handleFeedback = async () => {
    const { value: text } = await Swal.fire({
      input: "textarea",
      inputLabel: "Feedback",
      inputPlaceholder:
        "We will love to hear your thoughts. \nWrite your feedback here!",
      confirmButtonText: "Send",
      inputAttributes: {
        "aria-label": "Type your message here",
      },
      showCancelButton: true,
    });
    if (text) {
      const currentUser = Parse.User.current();
      const feedback = new Parse.Object("Feedback");
      feedback.set("user_id", currentUser.id);
      feedback.set("feedback", text);
      await feedback.save();
    } else {
      Swal.close();
    }
  };

  const getTotalAnsweredReward = (length) => {
    switch (length) {
      case 5: {
        return "BnZeRFtRs0";
      }
      case 20: {
        return "mmwJQW74iG";
      }
      case 40: {
        return "TEbtu5kejQ";
      }
      case 60: {
        return "H0ncvYchC7";
      }
      case 80: {
        return "ksFhan0che";
      }
      default: {
        return "";
      }
    }
  };

  const getTotalCorrectReward = (length) => {
    switch (length) {
      case 5: {
        return "TQU7vTDs0e";
      }
      case 20: {
        return "b8heC968Mn";
      }
      case 40: {
        return "O67JfE5HPq";
      }
      case 60: {
        return "2kZLCBzlJi";
      }
      case 80: {
        return "OP6QgCLbfx";
      }
      default: {
        return "";
      }
    }
  };

  const getExplanationReward = (length) => {
    switch (length) {
      case 5: {
        return "UywFMR01L0";
      }
      case 20: {
        return "S1SjOBpHBo";
      }
      case 40: {
        return "EOfdWQ4gBl";
      }
      case 60: {
        return "bfNFdVO9uo";
      }
      case 80: {
        return "LhRXTLKZAN";
      }
      default: {
        return "";
      }
    }
  };

  useEffect(() => {
    const timer = count > 0 && setInterval(() => setCount(count - 1), 1000);
    if (count === 0) {
      handleBreakTime();
    }
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const handleBreakTime = (e) => {
    history.push("/break");
  };

  /**
   * A feedback button has been added to the layout.
   */

  return (
    <>
      <Container fluid className="multiple-container">
        <Row className="question-row">
          <Col className="question-col">
            <h5 className="navbar-brand">
              <p>
                <Gem size={20} color="#F4C46B" /> {total_points}
              </p>
              <p className="coin-logo">
                <BsCoin size={20} color="#F4C46B" /> {total_coins}
              </p>
            </h5>
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
                                  id={option}
                                  label={option}
                                  name="formHorizontalRadios"
                                  onChange={handleChange}
                                  disabled={submitted ? true : false}
                                  className={
                                    submitted ? checkAnswer(option) : ""
                                  }
                                />
                              </div>
                            ))
                          : options.map((option) => (
                              <div key={`${option}`}>
                                <Form.Check
                                  type="radio"
                                  value={option}
                                  id={option}
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
                      <Button
                        className="hint-btn quiz-btn"
                        onClick={toggleHint}
                      >
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
            <Image src={getTeacherImage(0)} className="quiz-mascot-img" />
            <div className="feedback-div">
              <Button
                className="feedback-btn quiz-btn"
                onClick={handleFeedback}
              >
                Give feedback
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
