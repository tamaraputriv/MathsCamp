import React from "react";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/NavbarPostlogin";

export default function ContactPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        margin: "0",
      }}
    >
      <Navbar />
      <Contact />
      <Footer />
    </div>
  );
}
