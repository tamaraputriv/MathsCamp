import React from "react";
import Navbar from "../components/Navbar/NavbarPostlogin";
import { Row, Col } from "react-bootstrap";
import MultipleChoice from "../components/PracticeSection/MultipleChoice";

export default function PracticePage() {
  return (
    <>
      <Navbar />
      <Row>
        <Col>
          <MultipleChoice />
        </Col>
      </Row>
    </>
  );
}
