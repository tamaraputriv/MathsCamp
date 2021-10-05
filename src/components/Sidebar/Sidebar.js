import React from "react";
import "./Sidebar.css";
import { BsChevronDoubleRight, BsChevronDoubleLeft } from "react-icons/bs";
import UnlockedBagde from "../../images/Icons/unlocked-reward-badge.svg";
import { Container, Col, Row } from "react-bootstrap";

export default function Sidebar({ isOpen, toggle }) {
  return (
    <Container
      className="sidebar-container"
      style={{ width: isOpen ? "" : "15%", height: isOpen ? "100vh" : "100%" }}
    >
      <Row className="icon-row">
        <Col></Col>
        <Col md="auto">
          {isOpen ? (
            <BsChevronDoubleLeft
              onClick={toggle}
              className="arrow-icon"
              alt="icon arrow"
            ></BsChevronDoubleLeft>
          ) : (
            <BsChevronDoubleRight
              onClick={toggle}
              className="arrow-icon"
              alt="icon arrow"
            ></BsChevronDoubleRight>
          )}
        </Col>
      </Row>
      <Row className="h1-row">
        <Col md="auto">
          <h1
            className="sidebarH1"
            style={{
              fontSize: isOpen ? "" : "20px",
              marginTop: isOpen ? "" : "0",
              marginBottom: isOpen ? "" : "0",
            }}
          >
            Your Collection
          </h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="sidebarP" style={{ display: isOpen ? "" : "none" }}>
            Your collection is empty! Go to Practice mode and earn your first
            reward.
          </p>
        </Col>
      </Row>
      <Row className="badge-row">
        <Col className="badge-col">
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
