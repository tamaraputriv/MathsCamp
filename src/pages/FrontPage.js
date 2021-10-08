import React, { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/NavbarPostlogin";
import { Row, Col } from "react-bootstrap";
import UserInfo from "../components/UserInfo/UserInfo";
import { User } from "../users/User";

export default function FrontPage() {
  return (
    <div>
      <Navbar />
      <UserInfo {...User} />
    </div>
  );
}
