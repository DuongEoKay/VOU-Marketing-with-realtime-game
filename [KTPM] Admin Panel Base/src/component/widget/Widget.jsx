import React, { useEffect, useState } from "react";
import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';

const Widget = ({ type }) => {
  const [data, setData] = useState({});
  const [amount, setAmount] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        switch (type) {
          case "user":
            response = await fetch("http://localhost:8080/users/total-customer");
            break;
          case "game":
            response = await fetch("http://localhost:8080/games/total-game");
            break;
          case "brand":
            response = await fetch("http://localhost:8080/users/total-brand");
            break;
          default:
            return;
        }
        const result = await response.json();
        setAmount(result.amount);
        setData({
          title: result.title,
          icon: getIcon(type),
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [type]);

  const getIcon = (type) => {
    switch (type) {
      case "user":
        return (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        );
      case "game":
        return (
          <SportsEsportsOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        );
      case "brand":
        return (
          <HandshakeOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {amount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;