import React, { useState, useEffect } from "react";
import Parse from "parse";
import Sidebar from "../Sidebar/Sidebar";
import { useHistory } from "react-router";
import { Button, Image } from "react-bootstrap";
import { BsPerson } from "react-icons/bs";
import { getMascotImage } from "../Utils";
import UserInfoTable from "../UserInfoTable/UserInfoTable";
import "./UserInfo.css";
import { hotjar } from "react-hotjar";

export default function UserInfo() {
  const [isOpen, setIsOpen] = useState(true);
  const [username, setUsername] = useState("");
  const [total_points, setTotal_points] = useState(0);
  const [active_days, set_active_days] = useState([]);
  const [total_answered_questions, setTotal_answered_questions] = useState(0);
  const [active_mascot_index, setActiveMascotIndex] = useState(24);
  const history = useHistory();

  const handlePractice = (e) => {
    e.preventDefault();
    history.push("/practice");
  };

  const handleChangeMascot = (e) => {
    e.preventDefault();
    history.push("/mascot");
  };

  const toggle = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  const retrieveUser = async (e) => {
    const user = Parse.User.current();
    if (user) {
      var username = user.get("username");
      var total_points = user.get("total_points");
      var active_days = user.get("active_days");
      var total_answered_questions = user.get("total_answered_questions");
      var activeMascot = user.get("active_mascot_id");
      var activeMascotIndex = await fetchMascots(activeMascot);
      setUsername(username);
      setTotal_points(total_points);
      set_active_days(active_days);
      setTotal_answered_questions(total_answered_questions);
      setActiveMascotIndex(activeMascotIndex);
    } else {
      e.preventDefault();
      history.push("/login");
    }
  };

  useEffect(() => {
    retrieveUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    hotjar.initialize(2701912);
  }, []);

  const fetchMascots = async (active_mascot_id) => {
    const Mascots = new Parse.Object.extend("Mascot");
    const query = new Parse.Query(Mascots);
    const mascotArray = await query.find();
    var mascotIdArray = mascotArray.map((obj) => obj.id);
    var mascotIndex = mascotIdArray.indexOf(active_mascot_id);
    return mascotIndex;
  };

  return (
    <div className="user-container">
      <div className="sidebar-color-container">
        <Sidebar isOpen={isOpen} toggle={toggle} />
      </div>
      <div
        className="user-info-col"
        style={{
          width: isOpen ? "70%" : "85%",
        }}
      >
        <div>
          <h1 className="user-welcome-h1">
            Welcome {}
            {username}!
          </h1>
        </div>
        <div>
          <p className="user-p">
            Start practicing your math skills to earn points and badges
          </p>
        </div>
        <div className="card-mascot-div">
          <div className="card-div">
            <Button onClick={handlePractice} className="user-practice-btn">
              Start practice
            </Button>
          </div>
          <div className="user-mascot-div">
            <Image
              src={getMascotImage(active_mascot_index)}
              className="user-mascot-img"
            />
            <Button
              onClick={handleChangeMascot}
              className="user-change-mascot-btn"
              variant="primary"
              type="submit"
            >
              Change your mascot <BsPerson />
            </Button>
          </div>
        </div>
        <div>
          <h2 className="user-strike-h2">Your strikes</h2>
        </div>
        <div className="table-div">
          <UserInfoTable
            total_points={total_points}
            active_days={active_days.length}
            total_answered_questions={total_answered_questions}
            ranking={"25"}
          />
        </div>
      </div>
    </div>
  );
}
