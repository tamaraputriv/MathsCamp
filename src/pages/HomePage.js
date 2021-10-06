import React, { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/NavbarPostlogin";
import HomeSection from "../components/HomeSection/HomeSection";
import { Container, Row, Col } from "react-bootstrap";

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(true);
  const [columnSize, setColumnSize] = useState(4);

  const toggle = () => {
    if (isOpen) {
      setIsOpen(false);
      setColumnSize(2);
    } else {
      setIsOpen(true);
      setColumnSize(4);
    }
  };

  return (
    <div
      style={{
        margin: "0",
      }}
    >
      <Navbar />
      <div
        style={{
          margin: "0",
        }}
      >
        <Row>
          <Col lg={columnSize}>
            <Sidebar isOpen={isOpen} toggle={toggle} />
          </Col>
          <Col>
            <HomeSection />
          </Col>
        </Row>
      </div>
    </div>
  );
}
