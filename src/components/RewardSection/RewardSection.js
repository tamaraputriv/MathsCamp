import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { useHistory } from "react-router";
import { VscSmiley } from "react-icons/vsc";
import { BsChevronRight } from "react-icons/bs";
import { Trophy } from "react-bootstrap-icons";
import { getRewardImage } from "../Utils";
import Parse from "parse";
import "./RewardSection.css";

export default function RewardSection() {
  const [description, setDescription] = useState("");
  const [imgsrc, setImage] = useState("");
  const history = useHistory();

  //Redirects the user to the page they were on when winning the badge
  const handleGoBack = () => {
    history.goBack();
  };

  //Redirects the user to the frontpage with their collection of badges
  const handleCollection = () => {
    history.push("/frontpage");
  };

  /*Gets the last element from the user's reward_badge_ids array and uses this to
  retrieve the correct badge image and description from the database*/
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
    const index = rewardArray.map((element) => element.id).indexOf(reward_id);
    const imgsrc = getRewardImage(index);
    setDescription(description);
    setImage(imgsrc);
    return reward;
  };

  useEffect(() => {
    getReward();
  }, []);

  return (
    <Container fluid className="reward-container">
      <Row className="reward-row">
        <Col>
          <Image src={imgsrc} style={{ width: 566 }} />
        </Col>
        <Col className="text-div">
          <h2 className="h2-reward">
            Congratulations! <br /> You won a new badge
          </h2>
          <p className="p-reward">
            You earned your badge for this task:
            <br /> <b>{description} </b> <Trophy className="trophy-icon" />{" "}
            <br />
            You earned 50 points! Good job!
            <br />
          </p>
          <div className="button-div ">
            <Button
              className="practice-again-btn quiz_btn"
              onClick={handleCollection}
            >
              See collection <VscSmiley className="btn-icon" />
            </Button>
            <Button
              className="go-collection-btn quiz_btn"
              onClick={handleGoBack}
            >
              Go back <BsChevronRight className="btn-icon" />
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
