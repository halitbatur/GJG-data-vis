import React from "react";

type ObjectKeys<T> = T extends object
  ? (keyof T)[]
  : T extends number
  ? []
  : T extends Array<any> | string
  ? string[]
  : never;

interface ObjectConstructor {
  keys<T>(o: T): ObjectKeys<T>;
}

interface DataInfo {
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

const extractFilters = (key: string) => {
  const uniqueData: Record<string, string> = {};
  const filters: Record<string, string>[] = [];
  MOCK_DATA.forEach((el: DataInfo) => {
    if (!uniqueData[el[key]]) {
      uniqueData[el[key]] = "exists";
      filters.push({ text: el[key], value: el[key] });
    }
  });
  return filters;
};

const constructColumns = (dataInfo: DataInfo) => {
  const columns = [];

  for (const entry of Object.entries(dataInfo)) {
    const key = entry[0];
    const value = entry[1];
    if (typeof value === "number") {
      columns.push({
        title: key.charAt(0).toUpperCase() + key.slice(1),
        dataIndex: key,
        defaultSortOrder: "descend",
        sorter: (a: any, b: any) => a[key] - b[key],
      });
    } else {
      columns.push({
        title: key.charAt(0).toUpperCase() + key.slice(1),
        dataIndex: key,
        filters: extractFilters(key),
      });
    }
  }

  console.log(extractFilters("app"));
  return <h2>7abib 2lby</h2>;
};

const GraphView = () => {
  return <div>{constructColumns(MOCK_DATA[0])}</div>;
};

export default GraphView;
