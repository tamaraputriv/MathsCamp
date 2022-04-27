import React from "react";
import { Button } from "react-bootstrap";
import "./CategoryButton.css";
import { BsFillFilterSquareFill } from "react-icons/bs";
import { useHistory } from "react-router";

export default function CategoryButton({ category, level, correct_answers }) {
  const history = useHistory();

  const handlePractice = (e) => {
    e.preventDefault();
    console.log(category);
    history.push({
      pathname: "/practice",
      state: category,
    });
  };

  return (
    <Button className="category-button" onClick={handlePractice}>
      <div className="left-div">
        <BsFillFilterSquareFill
          size={40}
          className="category-icon"
          color={"#FF6665"}
        />
        {category}
        <div className="level-div">{level}</div>
      </div>
      <div className="right-div">
        <p>x/y questions answered!</p>
        <div className="progressbar-div">
          <div
            className="progressbar"
            style={{
              backgroundColor: correct_answers >= 1 ? "#ffd27c" : {},
            }}
          ></div>
          <div
            className="progressbar"
            style={{ backgroundColor: correct_answers >= 2 ? "#ffd27c" : {} }}
          ></div>
          <div
            className="progressbar"
            style={{ backgroundColor: correct_answers >= 3 ? "#ffd27c" : {} }}
          ></div>
          <div
            className="progressbar"
            style={{ backgroundColor: correct_answers >= 4 ? "#ffd27c" : {} }}
          ></div>
          <div
            className="progressbar"
            style={{ backgroundColor: correct_answers >= 5 ? "#ffd27c" : {} }}
          ></div>
          <div
            className="progressbar"
            style={{ backgroundColor: correct_answers >= 6 ? "#ffd27c" : {} }}
          ></div>
          <div
            className="progressbar"
            style={{ backgroundColor: correct_answers >= 7 ? "#ffd27c" : {} }}
          ></div>
        </div>
      </div>
    </Button>
  );
}
