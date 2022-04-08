import React from "react";
import { Table } from "react-bootstrap";
import "./LeaderboardTable.css";

export default function Leaderboard(props) {
  return (
    <Table>
      <tbody>
        <tr className="ranking-row">
          <th scope="row">{props.rank}</th>
          <td className="body-text">{props.current_mascot}</td>
          <td className="body-text">{props.username}</td>
          <td className="body-text">{props.total_points}</td>
        </tr>
      </tbody>
    </Table>
  );
}
