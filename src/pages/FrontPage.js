import React from "react";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/NavbarPostlogin";
import UserInfo from "../components/UserInfo/UserInfo";

export default function FrontPage() {
  return (
    <>
      <Navbar />
      <UserInfo />
      <Footer />
    </>
  );
}
