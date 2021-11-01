import React from "react";
import "./Category.css";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

export default function Category({ setCategory }) {
  const history = useHistory();

  return (
    <div className="category-container">
      <h1>Which category do you want to practice?</h1>
      <div className="button-container">
        <Link
          to={{
            pathname: "/practice",
            state: "algebra",
          }}
        >
          Algebra
        </Link>
      </div>
    </div>
  );
}
