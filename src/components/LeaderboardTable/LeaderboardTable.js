import React, { useEffect, useState } from "react";
import Parse from "parse";
import { Table } from "react-bootstrap";
import "./LeaderboardTable.css";
import { Image } from "react-bootstrap";
import { getMascotImage } from "../Utils";

export default function Leaderboard(props) {
  const [active_mascot_index, setActiveMascotIndex] = useState(24);

  const fetchMascots = async () => {
    const Mascots = new Parse.Object.extend("Mascot");
    const query = new Parse.Query(Mascots);
    const mascotArray = await query.find();

    try {
      var mascotIdArray = mascotArray.map((obj) => obj.id);
      var mascotIndex = mascotIdArray.indexOf(props.current_mascot);
      setActiveMascotIndex(mascotIndex);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchMascots();
  });

  return (
    <>
      <th>{props.rank}</th>
      <td className="ranking-body-text">
        {" "}
        <Image
          src={getMascotImage(active_mascot_index)}
          className="ranking-mascot-img"
        />
      </td>
      <td className="ranking-body-text">{props.username}</td>
      <td className="ranking-body-text">{props.total_points}</td>
    </>
  );
}
