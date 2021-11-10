import React, { useEffect, useState } from "react";
import Parse from "parse";
import "./Sidebar.css";
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";
import {
  BsChevronDoubleRight,
  BsChevronDoubleLeft,
  BsTrophy,
  BsX,
} from "react-icons/bs";
import { useHistory } from "react-router";
import { getRewardImage } from "../Utils";

export default function Sidebar({ isOpen, toggle }) {
  const [rewards, setRewards] = useState([]);
  const [owned_rewards, setStudentRewards] = useState([]);
  const [hasWonReward, setHasWonReward] = useState(false);
  const history = useHistory();

  const fetchRewards = async () => {
    const Rewards = new Parse.Object.extend("Reward");
    const query = new Parse.Query(Rewards);
    const result = await query.find();
    setRewards(result);
  };

  useEffect(() => {
    fetchRewards();
  }, []);

  const retrieveStudent = async () => {
    const student = Parse.User.current();
    if (student) {
      var active_days = student.get("active_days");
      var wonRewardId = getActiveDayReward(active_days.length);
      var rewards = student.get("reward_badge_ids");
      if (wonRewardId !== "" && !rewards.includes(wonRewardId)) {
        student.add("reward_badge_ids", wonRewardId);
        student.save();
        rewards = await student.get("reward_badge_ids");
        setHasWonReward(true);
        const points = student.get("total_points");
        const rewardPoints = points + 50;
        student.set("total_points", rewardPoints);
      }
      setStudentRewards(rewards);
    } else {
      console.log("The user couldn't be retrieved");
      Swal.fire({
        title: "Oops, something went wrong!",
        text: "Please try to refresh the page",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  useEffect(() => {
    retrieveStudent();
  }, []);

  const getActiveDayReward = (length) => {
    switch (length) {
      case 3: {
        return "Xn9GW6PD18";
      }
      case 5: {
        return "BDOyMkhoXE";
      }
      case 7: {
        return "1qWSzGiLPd";
      }
      case 11: {
        return "ThWu7K9V65";
      }
      case 15: {
        return "K4Sp4TC7SA";
      }
      default: {
        return "";
      }
    }
  };

  const handleSeeReward = () => {
    history.push("/reward");
  };

  const handleClose = () => {
    setHasWonReward(false);
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <h1
          className="sidebarH1"
          style={{
            fontSize: isOpen ? "" : "18px",
            marginBottom: isOpen ? "" : "0px",
          }}
        >
          Your Collection
        </h1>
        {isOpen ? (
          <BsChevronDoubleLeft
            onClick={toggle}
            className="arrow-icon"
            alt="icon arrow"
          ></BsChevronDoubleLeft>
        ) : (
          <BsChevronDoubleRight
            onClick={toggle}
            className="arrow-icon"
            alt="icon arrow"
          ></BsChevronDoubleRight>
        )}
      </div>
      {hasWonReward ? (
        <div className="text-center reward_container">
          <p className="reward_message">
            Congratulations! You have won a reward, check it out!
          </p>
          <Button className="see_reward_btn" onClick={handleSeeReward}>
            See reward <BsTrophy />
          </Button>
          <Button className="close_btn" onClick={handleClose}>
            Close <BsX size={21} />
          </Button>
        </div>
      ) : (
        <div></div>
      )}
      <div>
        <p className="sidebarP" style={{ display: isOpen ? "" : "none" }}>
          Hover the badges to learn how to win them!
        </p>
      </div>
      <div className="badge-col" style={{}}>
        {rewards.map((reward) => (
          <div className="reward-image-container" key={reward.id}>
            {owned_rewards.includes(reward.id) ? (
              <img
                alt="reward"
                className="unlocked-badge selector"
                src={getRewardImage(rewards.indexOf(reward))}
                title={reward.attributes.description}
              />
            ) : (
              <img
                key={reward.id}
                alt="reward"
                className="locked-badge selector"
                src={getRewardImage(rewards.indexOf(reward))}
                title={reward.attributes.description}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
