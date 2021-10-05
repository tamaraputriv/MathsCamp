import React, { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar_postlogin";
import HomeSection from "../components/HomeSection/HomeSection";

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Navbar />
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <HomeSection isOpen={isOpen} toggle={toggle} />
    </>
  );
};

export default HomePage;
