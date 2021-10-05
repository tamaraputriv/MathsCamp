import React from "react";
import "./Sidebar.css";
import ArrowIcon from "../../images/Icons/chevron-double-left.svg";
import UnlockedBagde from "../../images/Icons/unlocked-reward-badge.svg";
import { Container, Col, Row } from "react-bootstrap";

export default function Sidebar() {
  return (
    <Container className="sidebar-container">
      <Row className="icon-row">
        <Col></Col>
        <Col md="auto">
          <img className="arrow-icon" src={ArrowIcon} alt="icon arrow" />
        </Col>
      </Row>
      <Row className="h1-row">
        <Col md="auto">
          <h1 className="sidebarH1">Your Collection</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="sidebarP">
            Your collection is empty! Go to Practice mode and earn your first
            reward.
          </p>
        </Col>
      </Row>
      <Row className="badge-row">
        <Col>
          <img
            className="unlocked-badge"
            src={UnlockedBagde}
            alt="unlocked badge"
          />
          <img
            className="unlocked-badge"
            src={UnlockedBagde}
            alt="unlocked badge"
          />
          <img
            className="unlocked-badge"
            src={UnlockedBagde}
            alt="unlocked badge"
          />
          <img
            className="unlocked-badge"
            src={UnlockedBagde}
            alt="unlocked badge"
          />
          <img
            className="unlocked-badge"
            src={UnlockedBagde}
            alt="unlocked badge"
          />
          <img
            className="unlocked-badge"
            src={UnlockedBagde}
            alt="unlocked badge"
          />
          <img
            className="unlocked-badge"
            src={UnlockedBagde}
            alt="unlocked badge"
          />
          <img
            className="unlocked-badge"
            src={UnlockedBagde}
            alt="unlocked badge"
          />
          <img
            className="unlocked-badge"
            src={UnlockedBagde}
            alt="unlocked badge"
          />
          <img
            className="unlocked-badge"
            src={UnlockedBagde}
            alt="unlocked badge"
          />
          <img
            className="unlocked-badge"
            src={UnlockedBagde}
            alt="unlocked badge"
          />
          <img
            className="unlocked-badge"
            src={UnlockedBagde}
            alt="unlocked badge"
          />
        </Col>
      </Row>
    </Container>
  );
}
