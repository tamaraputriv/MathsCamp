import React, { useEffect, useState } from "react";
import "./Ranking.css";
import Parse from "parse";
import Leaderboard from "../LeaderboardTable/LeaderboardTable";
import { Table } from "react-bootstrap";

export default function MyPage() {
  const [students_info, setStudentInfo] = useState([]);

  const pushNumbers = async () => {
    const user = Parse.User.current();
    const classroom = Parse.Object.extend("Classroom");
    const query = new Parse.Query(classroom);
    query.contains("students", user["id"]);
    const CR = await query.find();

    try {
      query
        .get(CR[0]["id"])
        .then((object) => {
          const studentids = object.get("students");
          const students = Parse.Object.extend("User");

          for (let i = 0; i < studentids.length; i++) {
            const q_student = new Parse.Query(students);
            q_student
              .get(studentids[i])
              .then((student) => {
                const name = student.get("username");
                const mascotId = student.get("active_mascot_id");
                const points = student.get("total_points");

                const stud = { name: name, mascotid: mascotId, points: points };

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
    console.log("executed");
    pushNumbers();
  }, []);

  return (
    <div className="ranking-user-container">
      <div className="user-info-col">
        <div>
          <h1 className="user-welcome-h1">Your classroom ranking!</h1>
        </div>
        <div className="ranking-table-div">
          <Table>
            <thead className="thead-light ranking-table-header">
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">Mascot</th>
                <th scope="col">Name</th>
                <th scope="col">Points</th>
              </tr>
            </thead>
            <tbody>
              {students_info
                .sort(
                  ({ points: previousID }, { points: currentID }) =>
                    currentID - previousID
                )
                .map((student, index) => (
                  <tr key={index}>
                    <Leaderboard
                      rank={index + 1}
                      username={student.name}
                      current_mascot={student.mascotid}
                      total_points={student.points}
                    />
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
