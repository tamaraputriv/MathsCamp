import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import "./RewardSection.css";
import { useHistory } from "react-router";
import { VscSmiley } from "react-icons/vsc";
import { BsChevronLeft } from "react-icons/bs";
import { Trophy } from "react-bootstrap-icons";
import { getRewardImage } from "../Utils";
import Parse from "parse";

export default function RewardSection() {
  const [description, setDescription] = useState("");
  const [imgsrc, setImage] = useState("");
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };

  const handleNewQuiz = () => {
    history.push("/practice");
  };

  const getReward = async () => {
    const user = Parse.User.current();
    var reward_id;
    if (user) {
      const reward_badge_ids = user.get("reward_badge_ids");
      reward_id = reward_badge_ids.at(-1);
    } else {
      alert("Failed to retrieve the user.");
    }
    const Rewards = new Parse.Object.extend("Reward");
    const query = new Parse.Query(Rewards);
    const rewardArray = await query.find();
    query.equalTo("objectId", reward_id);
    const reward = await query.first();
    const description = reward.attributes.description;
    const index = rewardArray.map(element => element.id).indexOf(reward_id);
    const imgsrc = getRewardImage(index);
    setDescription(description);
    setImage(imgsrc);
    return reward;
  };

  useEffect(() => {
    getReward();
  }, []);

  return (
    <Container fluid className="multiple-container">
      <Row className="reward-row">
        <Col>
          <Image src={imgsrc} style={{ width: 566 }} />
        </Col>
        <Col className="text-div">
          <h2 className="h2-reward">
            Congratulations! <br/> You won a new reward
          </h2>
          <p className="p-reward">You earned your reward for this task:<br/> <b>{description} </b> <Trophy className="trophy-icon"/> Good job!<br/>You can now see it in your collection</p>
          <div className="button-div ">
            <Button
              className="practice-again-btn quiz-btn"
              onClick={handleNewQuiz}
            >
              Go to quiz <VscSmiley className="btn-icon" />
            </Button>
            <Button
              className="go-collection-btn quiz-btn"
              onClick={handleGoBack}
            >
              Go back <BsChevronLeft className="btn-icon" />
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
