// import { async } from "parse/lib/browser/Storage";
import React, { useEffect, useState } from "react";
// import { Card, Button, Container, Row, Col } from "react-bootstrap";
import Parse from "parse";
// import UserInfoTable from "../UserInfoTable/UserInfoTable";
import Leaderboard from "../LeaderboardTable/LeaderboardTable";
import "./MyPage.css";
// import { Query } from "parse/lib/browser/Parse";

export default function MyPage() {
  const [username, setUsername] = useState("");
  const [points, setPoints] = useState(0);
  const [active_days, set_active_days] = useState([]);
  const [total_answered_questions, setTotal_answered_questions] = useState(0);
  const [current_mascot, setCurrentMascot] = useState("");

  const retrieveStudent = async (e) => {
    const student = Parse.User.current();
    if (student) {
      const name = student.get("username");
      const mascot = student.get("active_mascot_id");
      const userpoints = student.get("total_points");
      const active_days = student.get("active_days");
      const total_answered_questions = student.get("total_answered_questions");
      setPoints(userpoints);
      setUsername(name);
      set_active_days(active_days);
      setTotal_answered_questions(total_answered_questions);
      setCurrentMascot(mascot);
    } else {
      e.preventDefault();
    }
  };

  const Ranking = async (e) => {
    const Users = new Parse.Object.extend("User");
    const q = new Parse.Query(Users).addDescending("total_points");
    const UserArray = await q.find();

    console.log(UserArray);
    return UserArray;
  };

  useEffect(() => {
    retrieveStudent();
  }, []);

  return (
    <div className="user-container">
      <div className="table-div">
        <Leaderboard
          rank={25}
          username={username}
          current_mascot={current_mascot}
          total_points={points}
        />
        {/* <UserInfoTable
          total_points={points}
          active_days={active_days.length}
          total_answered_questions={total_answered_questions}
          ranking={"25"}
        /> */}
      </div>
    </div>
  );
}
