import React from "react";
import Navbar from "../components/Navbar/NavbarPracticeMode";
import Category from "../components/Category/Category";

const CategoryPage = (props) => {
  const { category } = (props.location && props.location.state) || {};
  return (
    <div>
      <Navbar />
      <Category category={category} />
    </div>
  );
};

export default CategoryPage;
