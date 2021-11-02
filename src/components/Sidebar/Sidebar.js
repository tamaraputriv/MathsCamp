import React, { useEffect, useState } from "react";
import Parse from "parse";
import "./Sidebar.css";
import { BsChevronDoubleRight, BsChevronDoubleLeft } from "react-icons/bs";
import Badge1 from "../../images/Rewards/orange.png";
import Badge2 from "../../images/Rewards/head-scarf.png";
import Badge3 from "../../images/Rewards/sky.png";
import Badge4 from "../../images/Rewards/mouth.png";
import Badge5 from "../../images/Rewards/cat.png";
import Badge6 from "../../images/Rewards/croissant.png";
import Badge7 from "../../images/Rewards/red-hair.png";
import Badge8 from "../../images/Rewards/mountains.png";
import Badge9 from "../../images/Rewards/bag.png";
import Badge10 from "../../images/Rewards/bear.png";
import Badge11 from "../../images/Rewards/cake.png";
import Badge12 from "../../images/Rewards/old-man.png";
import Badge13 from "../../images/Rewards/egg.png";
import Badge14 from "../../images/Rewards/heart.png";
import Badge15 from "../../images/Rewards/fingers-crossed.png";
import Badge16 from "../../images/Rewards/avocado.png";
import Badge17 from "../../images/Rewards/black-hat.png";
import Badge18 from "../../images/Rewards/globe.png";
import Badge19 from "../../images/Rewards/glasses.png";
import Badge20 from "../../images/Rewards/milk.png";
import Badge21 from "../../images/Rewards/strawberry.png";
import Badge22 from "../../images/Rewards/helmet-man.png";
import Badge23 from "../../images/Rewards/coffee.png";
import Badge24 from "../../images/Rewards/love-letter.png";
import Badge25 from "../../images/Rewards/calculator-badge.png";

export default function Sidebar({ isOpen, toggle }) {
  const [rewards, setRewards] = useState([]);
  const [owned_rewards, setStudentRewards] = useState([]);

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
      if(wonRewardId !== "" && !rewards.includes(wonRewardId)){
        student.add("reward_badge_ids", wonRewardId);
        //Add en eller anden form for (du har vundet en reward!)
        student.save();
        rewards = await student.get("reward_badge_ids");
      }
      setStudentRewards(rewards);
    } else {
      alert("The user couldn't be retrieved");
    }
  };

  useEffect(() => {
    retrieveStudent();
  }, []);

  const getActiveDayReward = (length) => {
    switch(length){
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
  }

  const getRewardImage = (index) => {
    switch (index) {
      case 0: {
        return Badge1;
      }
      case 5: {
        return Badge2;
      }
      case 10: {
        return Badge3;
      }
      case 15: {
        return Badge4;
      }
      case 20: {
        return Badge5;
      }
      case 1: {
        return Badge6;
      }
      case 6: {
        return Badge7;
      }
      case 11: {
        return Badge8;
      }
      case 16: {
        return Badge9;
      }
      case 21: {
        return Badge10;
      }
      case 2: {
        return Badge11;
      }
      case 7: {
        return Badge12;
      }
      case 12: {
        return Badge13;
      }
      case 17: {
        return Badge14;
      }
      case 22: {
        return Badge15;
      }
      case 3: {
        return Badge16;
      }
      case 8: {
        return Badge17;
      }
      case 13: {
        return Badge18;
      }
      case 18: {
        return Badge19;
      }
      case 23: {
        return Badge20;
      }
      case 4: {
        return Badge21;
      }
      case 9: {
        return Badge22;
      }
      case 14: {
        return Badge23;
      }
      case 19: {
        return Badge24;
      }
      case 24: {
        return Badge25;
      }
      default:
        alert(
          "The reward images cannot be loaded. Please contact your teacher!"
        );
    }
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <p
          className="sidebarH1"
          style={{
            fontSize: isOpen ? "" : "18px",
            marginBottom: isOpen ? "" : "0px",
          }}
        >
          Your Collection
        </p>
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
      <div>
        <p className="sidebarP" style={{ display: isOpen ? "" : "none" }}>
          Hover the badges to learn how to win them!
        </p>
      </div>
      <div className="badge-col" style={{}}>
        {rewards.map((reward) => (
          <div className="reward-image-container" key={reward.id}>
          {owned_rewards.includes(reward.id) 
            ?(<img
            alt="reward"
            className="unlocked-badge"
            src={getRewardImage(rewards.indexOf(reward))}
            title={reward.attributes.description}
            />)
            :(<img
              key={reward.id}
              alt="reward"
              className="locked-badge"
              src={getRewardImage(rewards.indexOf(reward))}
              title={reward.attributes.description}
              />) 
          }
           </div>
        ))}
      </div>
    </div>
  );
}
