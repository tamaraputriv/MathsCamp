import React, { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Gem, Person } from "react-bootstrap-icons";
import { BsChevronRight } from "react-icons/bs";
import { useHistory } from "react-router";
import Parse from "parse";
import "./EditMascot.css";
import { getMascotImage } from "../Utils";
import Swal from 'sweetalert2';

export default function EditMascot() {
  const history = useHistory();
  const [mascots, setMascots] = useState([]);
  const [owned_mascot_ids, setOwnedMascotIds] = useState([]);
  const [active_mascot_id, setActiveMascotId] = useState("");
  const [total_points, setTotalPoints] = useState(0);

  //Redirects the user to the frontpage
  const handleGoBack = () => {
    history.push("/frontpage");
  };

  /*Fetches the mascots from the database and removes the blank mascot used as a placeholder
  on the frontpage and in the multiplechoice section*/
  const fetchMascots = async () => {
    const Mascots = new Parse.Object.extend("Mascot");
    const query = new Parse.Query(Mascots);
    const result = await query.find();
    const removeBlank = result.filter((e) => e.attributes.required_points > 0);
    setMascots(removeBlank);
  };

  useEffect(() => {
    fetchMascots();
  }, []);

  //Fetches the student and sets the states used in this component
  const fetchStudent = async () => {
    const user = Parse.User.current();
    if (user) {
      var owned = user.get("owned_mascot_ids");
      var active = user.get("active_mascot_id");
      var points = user.get("total_points");
      setOwnedMascotIds(owned);
      setActiveMascotId(active);
      setTotalPoints(points);
    } else {
      alert("Failed to retrieve the user.");
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  /*Checks if a student has sufficient points to buy a mascot. If they do, checks if 
  the student has won a reward for owning a certain number of mascots*/
  const buyMascot = (mascotId, mascotPrice, points) => {
    if (points >= mascotPrice) {
      const user = Parse.User.current();
      if (user) {
        user.add("owned_mascot_ids", mascotId);
        points -= mascotPrice;
        setTotalPoints(points);
        user.set("total_points", points);
        var owned = user.get("owned_mascot_ids");
        setOwnedMascotIds(owned);   
        var wonRewardId = getMascotReward(owned.length);
        var hasWon = wonRewardId !== "";
        if (hasWon) {
          user.add("reward_badge_ids", wonRewardId);
          const rewardPoints = points + 50;
          user.set("total_points", rewardPoints);
          setTotalPoints(rewardPoints);
        }   
        user.save();
        if (hasWon) {
          history.push("/reward");
        }
      }
    } else {
      Swal.fire({
        title: "You don't have enough points to buy this mascot!",
        text: "You can earn more points by answering math questions",
        icon: "error",
        confirmButtonText: "OK"
      })
    }
  };

  //Returns the id of a reward based on the amount of mascots a user owns
  const getMascotReward = (length) => {
    switch (length) {
      case 3: {
        return "Q6AkAx4llp";
      }
      case 5: {
        return "skz6uxOpI6";
      }
      case 7: {
        return "6U3vVNGZOO";
      }
      case 9: {
        return "A66daWHfAy";
      }
      case 11: {
        return "liTmaZ30Tb";
      }
      default: {
        return "";
      }
    }
  };

  //Sets the user's active mascot to the mascotId given as a parameter
  const pickMascot = (mascotId) => {
    const user = Parse.User.current();
    if (user) {
      user.set("active_mascot_id", mascotId);
      user.save();
      setActiveMascotId(mascotId);
    }
  };

  return (
    <Container className="mascot-container">
      <div className="point-container">
        <div className="points-div">
          <Gem color="#F2B84B" size={50} />
          <div className="point-circle">
            <p className="top-point-text text-center">{total_points}</p>
          </div>
        </div>
        <div>
          <Button className="go-back-btn" onClick={handleGoBack}>
            Go back <BsChevronRight />
          </Button>
        </div>
      </div>
      <Row>
        {mascots.map((mascot) => (
          <Col key={mascot.id}>
            <Card
              className="mascot-card"
              style={{
                width: "16rem",
                outline:
                  mascot.id === active_mascot_id ? "8px dashed #FBBB00" : "",
                boxShadow:
                  mascot.id === active_mascot_id
                    ? ""
                    : "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              }}
            >
              <Card.Img
                variant="top"
                src={getMascotImage(mascots.indexOf(mascot))}
              />
              <Card.Body className="text-center">
                <Card.Title className="mascot-name">
                  {mascot.attributes.name}
                </Card.Title>
                <Card.Text className="point-text">
                  <Gem color="#F2B84B" /> {mascot.attributes.required_points}{" "}
                  points
                </Card.Text>
                <div>
                  {owned_mascot_ids.includes(mascot.id) ? (
                    [
                      active_mascot_id === mascot.id ? (
                        <div key={mascot.id} className="active-mascot-btn">
                          Your mascot
                        </div>
                      ) : (
                        <Button
                          key={mascot.id}
                          className="pick-mascot-btn"
                          variant="primary"
                          onClick={() => pickMascot(mascot.id)}
                        >
                          Pick mascot <Person />
                        </Button>
                      ),
                    ]
                  ) : (
                    <Button
                      key={mascot.id}
                      className="buy-mascot-btn"
                      variant="primary"
                      onClick={() =>
                        buyMascot(
                          mascot.id,
                          mascot.attributes.required_points,
                          total_points
                        )
                      }
                    >
                      Buy mascot <Gem />
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="go-back-btn-container">
        <Button className="go-back-btn" onClick={handleGoBack}>
          Go back <BsChevronRight />
        </Button>
      </div>
    </Container>
  );
}
