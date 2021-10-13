import React from "react";
import Navbar from "../components/Navbar/NavbarPracticeMode";
import MultipleChoice from "../components/PracticeSection/MultipleChoice";
import Input from "../components/PracticeSection/Input";
import { Question } from "../questions/Question";

export default function PracticePage() {
  return (
    <div>
      <Navbar />
      {Question.type == 1 ? (
        <MultipleChoice {...Question} />
      ) : (
        <Input {...Question} />
      )}
    </div>
  );
}
