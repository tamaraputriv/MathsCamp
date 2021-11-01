import React, { useState, useEffect } from "react";
import Parse from "parse";
import Sidebar from "../Sidebar/Sidebar";
import "./UserInfo.css";
import { useHistory } from "react-router";
import { Button, Image, Card } from "react-bootstrap";
import { BsPerson } from "react-icons/bs";
import Mascot from "../../images/Mascots/mascot1.png";
import UserInfoTable from "../UserInfoTable/UserInfoTable";

export default function UserInfo() {
  const history = useHistory();

  const handlePractice = () => {
    history.push("/category");
  };

  const handleExam = () => {
    history.push("/break");
  };

  const handleChangeMascot = () => {
    history.push("/mascot");
  };

  const [isOpen, setIsOpen] = useState(true);
  const [username, setUsername] = useState("");
  const [total_points, setTotal_points] = useState(0);
  const [active_days, set_active_days] = useState([]);
  const [total_answered_questions, setTotal_answered_questions] = useState(0);

  const toggle = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  const retrieveUser = async () => {
    const user = Parse.User.current();
    if (user) {
      var username = user.get("username");
      var total_points = user.get("total_points");
      var active_days = user.get("active_days");
      var total_answered_questions = user.get("total_answered_questions");
      setUsername(username);
      setTotal_points(total_points);
      set_active_days(active_days);
      setTotal_answered_questions(total_answered_questions);
    } else {
      history.push("/login");
    }
  };

  useEffect(() => {
    retrieveUser();
  }, []);

  return (
    <div className="user-container">
      <div
        className="sidebar-div"
        style={{
          maxWidth: isOpen ? "30%" : "15%",
        }}
      >
        <Sidebar isOpen={isOpen} toggle={toggle} />
      </div>
      <div
        className="user-info-col"
        style={{
          width: isOpen ? "70%" : "85%",
        }}
      >
        <div>
          <h1 className="user-welcome-h1">Welcome {username}</h1>
        </div>
        <div className="card-mascot-div">
          <div className="card-div">
            <Card className="user-card">
              <Card.Body>
                <Button onClick={handlePractice} className="user-practice-btn">
                  Practice mode
                </Button>
                <Button onClick={handleExam} className="user-exam-btn">
                  Exam <br />
                  mode
                </Button>
              </Card.Body>
            </Card>
          </div>
          <div className="user-mascot-div">
            <Image src={Mascot} className="user-mascot-img" />
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
          />
        </div>
      </div>
    </div>
  );
}
