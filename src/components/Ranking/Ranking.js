import React, { useEffect, useState } from "react";
import "./Ranking.css";
import Parse from "parse";
import Leaderboard from "../LeaderboardTable/LeaderboardTable";
import { Table, Image, Button } from "react-bootstrap";
import { getMascotImage } from "../Utils";
import UserInfoTable from "../UserInfoTable/UserInfoTable";
import Swal from "sweetalert2";
import { GetPoints } from "./GetPoints";

export default function MyPage() {
  const [students_info, setStudentInfo] = useState([]);

  const [total_points, setTotal_points] = useState(0);
  const [total_coins, setTotal_coins] = useState(0);
  const [active_days, set_active_days] = useState([]);
  const [total_answered_questions, setTotal_answered_questions] = useState(0);

  const [active_mascot_index, setActiveMascotIndex] = useState(24);
  const user = Parse.User.current();

  const retrieveUser = async (e) => {
    if (user) {
      var total_points = user.get("total_points");
      var totalCoins = user.get("coins");
      var active_days = user.get("active_days");
      var total_answered_questions = user.get("total_answered_questions");
      setTotal_points(total_points);
      setTotal_coins(totalCoins);
      set_active_days(active_days);
      setTotal_answered_questions(total_answered_questions);
    } else {
      e.preventDefault();
    }
  };

  const fetchMascots = async () => {
    var activeMascot = user.get("active_mascot_id");
    const Mascots = new Parse.Object.extend("Mascot");
    const query = new Parse.Query(Mascots);
    const mascotArray = await query.find();

    try {
      var mascotIdArray = mascotArray.map((obj) => obj.id);
      var mascotIndex = mascotIdArray.indexOf(activeMascot);
      setActiveMascotIndex(mascotIndex);
    } catch (e) {
      console.log(e);
    }
  };

  const addTodayFilter = () => {
    getClassroom("today");
  };

  const addWeekFilter = () => {
    getClassroom("week");
  };

  const addAllTimeFilter = () => {
    getClassroom("all time");
  };

  const getClassroom = async (filt) => {
    setStudentInfo([]);
    const classroom = Parse.Object.extend("Classroom");
    const query = new Parse.Query(classroom);
    query.contains("students", user["id"]);
    const CR = await query.find();

    try {
      query
        .get(CR[0]["id"])
        .then(async function (object) {
          const studentids = object.get("students");
          const students = Parse.Object.extend("User");

          for (let i = 0; i < studentids.length; i++) {
            const points = await GetPoints(studentids[i], filt);

            const q_student = new Parse.Query(students);
            q_student
              .get(studentids[i])
              .then((student) => {
                const name = student.get("username");
                const mascotId = student.get("active_mascot_id");
                const user = studentids[i];

                const stud = {
                  userID: user,
                  name: name,
                  mascotid: mascotId,
                  points: points,
                };

                setStudentInfo((students_info) => [...students_info, stud]);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    retrieveUser();
    fetchMascots();
    getClassroom("all time");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="ranking-user-container">
      <div className="ranking-user-info-col">
        <div className="ranking-h1-table">
          <h1 className="user-welcome-h1">Your classroom ranking!</h1>
          <div className="button-row">
            <Button className="filter-bnt" onClick={() => addTodayFilter()}>
              Today
            </Button>
            <Button className="filter-bnt" onClick={() => addWeekFilter()}>
              This week
            </Button>
            <Button className="filter-bnt" onClick={() => addAllTimeFilter()}>
              All time
            </Button>
          </div>
          <div className="ranking-table-div">
            <Table>
              <thead className="thead-light ranking-table-header">
                <tr>
                  <th scope="col" className="ranking-rank">
                    RANK
                  </th>
                  <th scope="col" className="rank-mascot">
                    MASCOT
                  </th>
                  <th scope="col">NAME</th>
                  <th scope="col" className="ranking-points">
                    POINTS
                  </th>
                </tr>
              </thead>
              <tbody>
                {students_info
                  .sort(
                    ({ points: previousID }, { points: currentID }) =>
                      currentID - previousID
                  )
                  .slice(0, 10)
                  .map((student, index) => (
                    <tr key={index}>
                      <Leaderboard
                        userid={student.userID}
                        rank={index + 1}
                        username={student.name}
                        current_mascot={student.mascotid}
                        total_points={student.points}
                      />
                    </tr>
                  ))}
                <tr
                  style={{ borderTopWidth: "25px", borderTopStyle: "double" }}
                >
                  <Leaderboard
                    userid={"xxxxxx"}
                    rank={20}
                    username={"TESTING"}
                    current_mascot={"F9NDoW7kCq"}
                    total_points={0}
                  />
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
        <div className="user_information">
          <div className="user-mascot-div">
            <Image
              src={getMascotImage(active_mascot_index)}
              className="user-mascot-img"
            />
          </div>
          <h1 className="user-welcome-h1 user-info-h1">Your strikes</h1>
          <div className="table-div">
            <UserInfoTable
              total_points={total_points}
              total_Coins={total_coins}
              active_days={active_days.length}
              total_answered_questions={total_answered_questions}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
