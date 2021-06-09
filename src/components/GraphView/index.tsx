import React from "react";
import { Line } from "react-chartjs-2";
import { useFetch } from "../../hooks/useFetch";

interface DataSet {
  label: string;
  data: number[];
  fill: boolean;
  backgroundColor: string;
}

interface GraphData {
  labels: string[];
  datasets: DataSet[];
}

const constructLabel = (
  metric: string,
  game: string,
  platform: string
): string => {
  return `# of ${metric} in ${game} (${platform})`;
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

const GraphView = () => {
  const { statsStatus, statsData } = useFetch(
    "https://recruitment-mock-data.gjg-ads.io/data",
    "stats"
  );

  console.log(statsData);

  const constructGraphDates = () => {
    const labels: string[] = [];
    const uniData: Record<string, string> = {};

    statsData.data.forEach((el: DataInfo) => {
      if (!uniData[el.date]) {
        uniData[el.date] = "exists";
        labels.push(el.date);
      }
    });

    return labels;
  };

  const constructDataSets = () => {
    const labels: string[] = constructGraphDates().slice(0, 5);
    const uniqueValues: Record<string, number> = {};
    const datasets: DataSet[] = [];
    const dataSetsHashMap: Record<string, string> = {};

    statsData.data.forEach((el: DataInfo) => {
      const datasetLabel = constructLabel("revenue", el.app, el.platform);
      const dateIndex = labels.findIndex((label) => label === el.date);
      if (!dataSetsHashMap[datasetLabel]) {
        const data = new Array(labels.length);
        data[dateIndex] = el.revenue;
        dataSetsHashMap[datasetLabel] = "exists";
        datasets.push({
          label: datasetLabel,
          data,
          fill: false,
          backgroundColor: "#FF6384",
        });
      } else {
        const datasetIndex = datasets.findIndex(
          (data) => data.label === datasetLabel
        );
        const dataCopy = [...datasets[datasetIndex].data];
        dataCopy[dateIndex] = el.clicks;
        datasets[datasetIndex].data = dataCopy;
      }
    });
    return { labels, datasets };
  };

  return (
    <div>
      {statsStatus && (
        <Line data={constructDataSets()} options={options} type="line" />
      )}
    </div>
  );
};

export default GraphView;
