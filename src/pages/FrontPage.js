import React from "react";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/NavbarPostlogin";
import UserInfoTeacher from "../components/UserInfoTeacher/UserInfoTeacher";

export default function FrontPage() {
  return (
    <>
      <Navbar />
      <UserInfoTeacher />
      <Footer />
    </>
  );
}
