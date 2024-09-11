
import "./Dashboard.scss";
import "../../component/widget/widget.scss";
import Widget from "../../component/widget/Widget"
import Featured from "../../component/featured/Featured";
import Chart from "../../component/chart/Chart";
import Table from "../../component/table/Table";

export const Dashboard = () => {
  return (
    <div className="home">
        <div className="widgets">
          <Widget type="user" />
          <Widget type="game" />
          <Widget type="brand" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Play By Game" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table title="Last 6 Months (Revenue)" />
        </div>
      </div>

  );
};


