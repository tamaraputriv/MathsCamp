import React, { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/NavbarPostlogin";
import { Row, Col } from "react-bootstrap";
import UserInfo from "../components/UserInfo/UserInfo";
import { User } from "../users/User";

export default function FrontPage() {
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
    <>
      <Navbar />
      <Row>
        <Col lg={columnSize}>
          <Sidebar isOpen={isOpen} toggle={toggle} />
        </Col>
        <Col>
          <UserInfo {...User} />
        </Col>
      </Row>
    </>
  );
}
