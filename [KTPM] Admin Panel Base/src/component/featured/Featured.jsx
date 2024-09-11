import React, { useEffect, useState } from "react";
import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const Featured = () => {
  const [todayPlays, setTodayPlays] = useState(0);
  const [lastWeekPlays, setLastWeekPlays] = useState(0);
  const [lastMonthPlays, setLastMonthPlays] = useState(0);
  const [target, setTarget] = useState(100); // Default target value
  const token = localStorage.getItem("jwt"); // Replace with your actual token

  useEffect(() => {
    const fetchTodayPlays = async () => {
      try {
        const response = await fetch("http://localhost:8080/report/play-by-today", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.text();
        setTodayPlays(Number(data));
      } catch (error) {
        console.error("Error fetching today's plays:", error);
      }
    };

    const fetchLastWeekPlays = async () => {
      try {
        const response = await fetch("http://localhost:8080/report/play-by-last-week", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.text();
        setLastWeekPlays(Number(data));
      } catch (error) {
        console.error("Error fetching last week's plays:", error);
      }
    };

    const fetchLastMonthPlays = async () => {
      try {
        const response = await fetch("http://localhost:8080/report/play-by-last-month", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.text();
        setLastMonthPlays(Number(data));
      } catch (error) {
        console.error("Error fetching last month's plays:", error);
      }
    };

    fetchTodayPlays();
    fetchLastWeekPlays();
    fetchLastMonthPlays();
  }, [token]);

  const handleTargetChange = (e) => {
    setTarget(Number(e.target.value));
  };

  const percentage = target > 0 ? (todayPlays / target) * 100 : 0;

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Plays</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={percentage} text={`${Math.round(percentage)}%`} strokeWidth={5} />
        </div>
        <p className="title">Total plays today</p>
        <p className="amount">{todayPlays}</p>
        <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult">
              <input 
                type="number" 
                value={target} 
                onChange={handleTargetChange} 
                className="targetInput"
              />
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <div className="resultAmount">{lastWeekPlays}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <div className="resultAmount">{lastMonthPlays}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;