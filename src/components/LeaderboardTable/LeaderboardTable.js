import React, { useEffect, useState } from "react";
import Parse from "parse";
import "./LeaderboardTable.css";
import { Image } from "react-bootstrap";
import { getMascotImage } from "../Utils";

export default function Leaderboard(props) {
  const [active_mascot_index, setActiveMascotIndex] = useState(24);
  const [current_user_id, setCurrentUser] = useState();

  const fetchMascots = async () => {
    const current_user = Parse.User.current();
    setCurrentUser(current_user["id"]);
    const Mascots = new Parse.Object.extend("Mascot");
    const query = new Parse.Query(Mascots);
    const mascotArray = await query.find();

    try {
      var mascotIdArray = mascotArray.map((obj) => obj.id);
      var mascotIndex = mascotIdArray.indexOf(props.current_mascot);
      setActiveMascotIndex(mascotIndex);
    } catch (e) {
      console.log(e.message);
    }
  };

  //methods defining the different return views
  //View for the current user (Current user highlighted in the leaderboard)
  const currentUserPlace = () => {
    return (
      <>
        <th
          className="rank-text"
          style={{
            fontWeight: "1000",
            fontSize: "30px",
            borderTopWidth: "5px",
            borderBottomWidth: "5px",
          }}
        >
          {props.rank}
        </th>
        <td
          className="ranking-body-text rank-mascot"
          style={{
            fontWeight: "1000",
            fontSize: "30px",
            borderTopWidth: "5px",
            borderBottomWidth: "5px",
          }}
        >
          {" "}
          <Image
            src={getMascotImage(active_mascot_index)}
            className="ranking-mascot-img"
          />
        </td>
        <td
          className="ranking-body-text"
          style={{
            fontWeight: "1000",
            fontSize: "30px",
            borderTopWidth: "5px",
            borderBottomWidth: "5px",
          }}
        >
          {props.username}
        </td>
        <td
          className="ranking-body-text ranking-points"
          style={{
            fontWeight: "1000",
            fontSize: "30px",
            borderTopWidth: "5px",
            borderBottomWidth: "5px",
          }}
        >
          {props.total_points}
        </td>
      </>
    );
  };

  //Every other view (not current user, not first place)
  const otherPlace = () => {
    return (
      <>
        <th className="rank-text">{props.rank}</th>
        <td className="ranking-body-text rank-mascot">
          {" "}
          <Image
            src={getMascotImage(active_mascot_index)}
            className="ranking-mascot-img"
          />
        </td>
        <td className="ranking-body-text">{props.username}</td>
        <td className="ranking-body-text ranking-points">
          {props.total_points}
        </td>
      </>
    );
  };

  useEffect(() => {
    fetchMascots();
  });

  return (
    <>
      {props.userid === current_user_id && currentUserPlace()}
      {props.userid !== current_user_id && otherPlace()}
    </>
  );
}
