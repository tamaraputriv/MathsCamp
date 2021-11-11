import React, { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Trophy } from "react-bootstrap-icons";
import { BsChevronRight } from "react-icons/bs";
import { useHistory } from "react-router";
import Parse from "parse";
import "./BadgeInfo.css";
import { getRewardImage } from "../Utils";

export default function BadgeInfo() {
  const history = useHistory();
  const [rewards, setRewards] = useState([]);

  //Redirects the user to the frontpage
  const handleGoBack = () => {
    history.push("/frontpage");
  };

  const fetchRewards = async () => {
    const Rewards = new Parse.Object.extend("Reward");
    const query = new Parse.Query(Rewards);
    const result = await query.find();
    setRewards(result);
  };

  useEffect(() => {
    fetchRewards();
  }, []);

  return (
    <Container className="mascot-container">
      <div className="point-container">
        <div className="points-div">
          <Trophy color="#F2B84B" size={50} />
          <div className="header-circle">
            <p className="top-point-text text-center">Badge Library</p>
          </div>
        </div>
        <div>
          <Button className="go-back-btn" onClick={handleGoBack}>
            Go back <BsChevronRight />
          </Button>
        </div>
      </div>
      <Row>
        {rewards.map((reward) => (
          <Col key={reward.id}>
            <Card className="reward-card">
              <Card.Img
                variant="top"
                src={getRewardImage(rewards.indexOf(reward))}
              />
              <Card.Body className="text-center">
                <Card.Title className="point-text">
                  {reward.attributes.description}
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
