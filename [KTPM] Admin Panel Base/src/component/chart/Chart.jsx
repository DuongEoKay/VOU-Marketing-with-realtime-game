import React, { useEffect, useState } from "react";
import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ aspect, title }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("jwt"); // Replace with your method of getting the token

      try {
        // Fetch play counts by game ID
        const playCountsResponse = await fetch("http://localhost:8080/report/user-count-by-all-games", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const playCountsResult = await playCountsResponse.json();

        // Fetch game details
        const gamesResponse = await fetch("http://localhost:8080/games/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const gamesResult = await gamesResponse.json();

        // Transform data to match game IDs with game names
        const transformedData = Object.keys(playCountsResult).map(gameId => {
          const game = gamesResult.find(g => g.id === gameId);
          return {
            game: game ? game.name : `Unknown Game (${gameId})`,
            plays: playCountsResult[gameId],
          };
        });

        setData(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 80, bottom: 50 }} // Adjust bottom margin
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="game" 
            stroke="gray" 
            angle={-45} // Rotate labels
            textAnchor="end" // Align text to the end
            interval={0} // Show all labels
          />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="plays"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;