import React from "react";
import Navbar from "../components/Navbar/NavbarPracticeMode";
import MultipleChoice from "../components/PracticeSection/MultipleChoice";
import Input from "../components/PracticeSection/Input";
import { Question, QuestionInput } from "../questions/Question";
import Footer from "../components/Footer/Footer";

export default function PracticePage() {
  return (
    <div>
      <Navbar />
      <MultipleChoice />
    </div>
  );
}
