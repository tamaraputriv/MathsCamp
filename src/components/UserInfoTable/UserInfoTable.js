import React from "react";
import { Table } from "react-bootstrap";
import "./UserInfoTable.css";
import { BsFillSunFill, BsFillFilterSquareFill, BsGem } from "react-icons/bs";

export default function UserInfoTable({
  total_points,
  active_days,
  total_answered_questions,
}) {
  return (
    <Table>
      <thead className="thead-light table-header">
        <tr>
          <th scope="col" className="table-header">
            CATEGORY
          </th>
          <th scope="col" className="table-header">
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
            Days you played
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
            Questions you answered
          </td>
          <td data-label="Questions you answered" className="body-text">
            <span>{total_answered_questions} questions</span>
          </td>
        </tr>
        <tr>
          <td className="body-text">
            <BsGem size={25} className="category-icon" color={"#7C7EF2"} />
            Your Points
          </td>
          <td data-label="Your points" className="body-text">
            <span>{total_points} points</span>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}
