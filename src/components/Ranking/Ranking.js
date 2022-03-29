import React, { useEffect, useState } from "react";
import Parse from "parse";
import Leaderboard from "../LeaderboardTable/LeaderboardTable";
import "./Ranking.css";

export default function MyPage() {
  const [students_info, setStudentInfo] = useState([]);
  const numbers = [1, 2, 3, 4, 5];

  const fetchClass = async (e) => {
    let student_info = [];

    const user = Parse.User.current();
    const classroom = Parse.Object.extend("Classroom");
    const query = new Parse.Query(classroom);
    query.contains("students", user["id"]);
    const CR = await query.find();

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

              student_info.push({
                name: name,
                mascotid: mascotId,
                points: points,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
        setStudentInfo(student_info);
      })
      .catch((error) => {
        console.log(error);
      });

    student_info.sort((a, b) => (b.points > a.points ? 1 : -1));
  };

  useEffect(() => {
    fetchClass();
    document.title = "This is the student ${students_info}";
  }, []);

  return (
    <div className="user-container">
      <div className="table-div">
        <ul>
          {/* {students_info.map((student, index) => (
            <Leaderboard key={index} rank={student.points} />
          ))} */}
          {students_info.map((student, index) => (
            <p key={index}>{student.name}</p>
          ))}

          {/* <Leaderboard
            rank={25}
            username={"hello"}
            current_mascot={"klafsdj"}
            total_points={2500}
          /> */}
          {/* {students_info.map((student, index) => (
            <Leaderboard
              key={index}
              rank={student.index}
              username={student.name}
              current_mascot={student.mascotId}
              total_points={student.points}
            />
          ))} */}
        </ul>
      </div>
    </div>
  );
}
