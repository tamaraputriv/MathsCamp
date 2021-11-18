import React, { useEffect } from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import "./Break.css";
import { useHistory } from "react-router";
import { VscSmiley } from "react-icons/vsc";
import Camel from "../../images/Break/breakCamel.png";

export default function Break() {
  const history = useHistory();

  const handleGoBack = () => {
    history.push("#frontpage");
  };

  useEffect(() => {}, []);
  return (
    <Container fluid className="break-container">
      <Row className="reward-row">
        <Col>
          <Image src={Camel} style={{ width: 566 }} />
        </Col>
        <Col className="text-div">
          <h2 className="h2-break">Time to take a break.</h2>
          <p className="p-break">
            Good job! You’re on a roll. <br /> Take 5 minutes to cool off, and
            come <br />
            back to earn more points.
          </p>
          <div className="button-div ">
            <Button
              className="done-break-btn"
              variant="primary"
              onClick={handleGoBack}
            >
              I’m done with my break <VscSmiley className="btn-icon" />
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
