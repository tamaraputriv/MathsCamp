import React from "react";
import { Table } from "react-bootstrap";
import "./LeaderboardTable.css";
import {
  BsFillSunFill,
  BsFillFilterSquareFill,
  BsGem,
  BsTrophy,
} from "react-icons/bs";

export default function Leaderboard({
  rank,
  username,
  current_mascot,
  total_points,
}) {
  return (
    <Table>
      <thead className="thead-light table-header">
        <tr>
          <th scope="col" className="table-header">
            Rank
          </th>
          <th scope="col" className="table-header">
            Mascot
          </th>
          <th scope="col" className="table-header">
            Name
          </th>
          <th scope="col" className="table-header">
            Points
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="body-text">{rank}</td>
          <td data-label="Days played" className="body-text">
            {current_mascot}
          </td>
          <td data-label="Days played" className="body-text">
            {username}
          </td>
          <td data-label="Days played" className="body-text">
            {total_points}
          </td>
        </tr>
      </tbody>
    </Table>
  );
}
