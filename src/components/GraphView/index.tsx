import React from "react";
import { Line } from "react-chartjs-2";

const constructGraphData = () => {
  const labels: any[] = [];
  const uniData: Record<string, string> = {};

  MOCK_DATA.forEach((el: DataInfo) => {
    if (!uniData[el.date]) {
      uniData[el.date] = "exists";
      labels.push(el.date);
    }
  });
  console.log(labels);
};

const data: any = {
  labels: ["date1", "date2", "date3", "date4", "date6", "date7"],
  datasets: [
    {
      label: "# of Votes of 3d game",
      data: [12, 19, 3, 5, 2],
      fill: false,
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgba(255, 99, 132, 0.2)",
    },
  ],
};

const options: any = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

export interface DataInfo {
  key: number;
  date: string;
  impressions: number;
  clicks: number;
  installs: number;
  dau: number;
  revenue: number;
  platform: string;
  app: string;
}

const MOCK_DATA: DataInfo[] = [
  {
    key: 1,
    date: "2020-05-09",
    impressions: 511548,
    clicks: 53936,
    installs: 1387,
    dau: 11293,
    revenue: 9217.2,
    platform: "iOS",
    app: "Jelly Dye",
  },
  {
    key: 2,
    date: "2020-05-09",
    impressions: 531217,
    clicks: 56202,
    installs: 1492,
    dau: 2653,
    revenue: 5761.2,
    platform: "Android",
    app: "Jelly Dye",
  },
  {
    key: 3,
    date: "2020-05-10",
    impressions: 505172,
    clicks: 52831,
    installs: 2301,
    dau: 6450,
    revenue: 7280,
    platform: "iOS",
    app: "Fun Race 3D",
  },
  {
    key: 4,
    date: "2020-05-10",
    impressions: 536004,
    clicks: 52877,
    installs: 1853,
    dau: 3704,
    revenue: 6181.6,
    platform: "Android",
    app: "Fun Race 3D",
  },
];

const GraphView = () => {
  return (
    <div>
      {constructGraphData()}
      <Line data={data} options={options} type="line" />
    </div>
  );
};

export default GraphView;
