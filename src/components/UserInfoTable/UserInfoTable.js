import React from "react";
import { Table } from "react-bootstrap";
import "./UserInfoTable.css";
import {
  BsFillSunFill,
  BsFillFilterSquareFill,
  BsGem,
  BsTrophy,
  BsCoin,
} from "react-icons/bs";

export default function UserInfoTable({
  total_points,
  total_Coins,
  active_days,
  total_answered_questions,
  total_rewards,
}) {
  return (
    <Table>
      <thead className="thead-light table-header">
        <tr>
          <th scope="col" className="table-header">
            CATEGORY
          </th>
          <th scope="col" className="table-header-amount">
            AMOUNT
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="body-text">
            <BsFillSunFill
              size={25}
              className="category-icon"
              color={"#F2B84B"}
            />
            Days played
          </td>
          <td data-label="Days played" className="body-text">
            {active_days} days
          </td>
        </tr>
        <tr>
          <td className="body-text">
            <BsFillFilterSquareFill
              size={25}
              className="category-icon"
              color={"#FF6665"}
            />
            Questions answered
          </td>
          <td data-label="Questions you answered" className="body-text">
            <span>{total_answered_questions} questions</span>
          </td>
        </tr>
        <tr>
          <td className="body-text">
            <BsGem size={25} className="category-icon" color={"#47B0F1"} />
            Points
          </td>
          <td data-label="Your points" className="body-text">
            <span>{total_points} points</span>
          </td>
        </tr>
        <tr>
          <td className="body-text">
            <BsTrophy size={25} className="category-icon" color={"#F2B84B"} />
            Badges
          </td>
          <td>
            <span>{total_rewards}</span>
          </td>
        </tr>
        <tr>
          <td className="body-text">
            <BsCoin size={25} className="category-icon" color={"#28A3EE"} />
            Your Coins
          </td>
          <td data-label="Your coins" className="body-text">
            <span>{total_Coins} coins</span>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}
