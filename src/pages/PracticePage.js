import React from "react";
import Navbar from "../components/Navbar/NavbarPracticeMode";
import MultipleChoice from "../components/PracticeSection/MultipleChoice";
import Footer from "../components/Footer/Footer";

export default function PracticePage() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Navbar />
      <MultipleChoice />
      <Footer />
    </div>
  );
}
