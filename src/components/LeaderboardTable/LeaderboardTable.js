import React from "react";
import { Table } from "react-bootstrap";
import "./LeaderboardTable.css";
import {
  BsFillSunFill,
  BsFillFilterSquareFill,
  BsGem,
  BsTrophy,
} from "react-icons/bs";

export default function Leaderboard(props) {
  return (
    <div>
      <li>{props.rank}</li>
      {/* <li>{props.username}</li>
      <li>{props.current_mascot}</li>
      <li>{props.total_points}</li> */}
    </div>

    // <Table>
    //   <thead className="thead-light table-header">
    //     <tr>
    //       <th scope="col" className="table-header">
    //         Rank
    //       </th>
    //       <th scope="col" className="table-header">
    //         Mascot
    //       </th>
    //       <th scope="col" className="table-header">
    //         Name
    //       </th>
    //       <th scope="col" className="table-header">
    //         Points
    //       </th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     <tr>
    //       <td className="body-text">{rank}</td>
    //       <td data-label="mascot" className="body-text">
    //         {current_mascot}
    //       </td>
    //       <td data-label="username" className="body-text">
    //         {username}
    //       </td>
    //       <td data-label="total points" className="body-text">
    //         {total_points}
    //       </td>
    //     </tr>
    //   </tbody>
    // </Table>
  );
}
