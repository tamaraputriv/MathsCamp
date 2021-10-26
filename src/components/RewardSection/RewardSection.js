import React, { useEffect } from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import "./RewardSection.css";
import { useHistory } from "react-router";
import { VscSmiley } from "react-icons/vsc";
import { BsTrophy } from "react-icons/bs";
import reward from "../../images/Rewards/avocado.png";

export default function RewardSection() {
  const history = useHistory();

  const handleGoBack = () => {
    history.push("/frontpage");
  };

  const handleNewQuiz = () => {
    history.push("/practice");
  };

  // const fetchStudent = async () => {
  //   const user = Parse.User.current();
  //   if (user) {
  //     // The object was retrieved successfully.
  //     console.log(user.id);
  //   } else {
  //     alert("Failed to retrieve the user.");
  //   }
  // };

  useEffect(() => {}, []);
  return (
    <Container fluid className="multiple-container">
      <Row className="reward-row">
        <Col>
          <Image src={reward} style={{ width: 566 }} />
        </Col>
        <Col className="text-div">
          <h2 className="h2-reward">
            Congratulations! <br /> You won a reward.
          </h2>
          <p className="p-reward">You answered 3 questions.</p>
          <div className="button-div ">
            <Button
              className="practice-again-btn quiz-btn"
              onClick={handleNewQuiz}
            >
              Practice again <VscSmiley className="btn-icon" />
            </Button>
            <Button
              className="go-collection-btn quiz-btn"
              onClick={handleGoBack}
            >
              Go to collection <BsTrophy className="btn-icon" />
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
