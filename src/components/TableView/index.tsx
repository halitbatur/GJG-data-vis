import React from "react";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { ColumnFilterItem } from "antd/es/table/interface";
import { useFetch } from "../../hooks/useFetch";

interface DataInfo {
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

const TableView = () => {
  const { statsStatus, statsData } = useFetch(
    "https://recruitment-mock-data.gjg-ads.io/data",
    "stats"
  );

  const constructColumns = (dataInfo: DataInfo) => {
    const columns: ColumnsType<DataInfo> = [];
    for (const entry in dataInfo) {
      let key = entry as keyof DataInfo;
      if (entry === "key") {
        continue;
      }
      if (typeof dataInfo[key] === "number") {
        columns.push({
          title: key.charAt(0).toUpperCase() + key.slice(1),
          dataIndex: key,
          defaultSortOrder: "descend",
          sorter: (a: any, b: any) => a[key] - b[key],
        });
      } else if (entry === "date") {
        columns.push({
          title: key.charAt(0).toUpperCase() + key.slice(1),
          dataIndex: key,
          filters: extractFilters(key),
          defaultSortOrder: "descend",
          sorter: (a: any, b: any) => ("" + a[key]).localeCompare(b[key]),
          onFilter: (value, record) => record[key] === value,
        });
      } else {
        columns.push({
          title: key.charAt(0).toUpperCase() + key.slice(1),
          dataIndex: key,
          filters: extractFilters(key),
          onFilter: (value, record) => record[key] === value,
        });
      }
    }
    console.log(columns);
    return columns;
  };

  const extractFilters = (key: keyof DataInfo) => {
    const uniqueData: Record<string, string> = {};
    const filters: ColumnFilterItem[] = [];
    statsData.data.forEach((el: DataInfo) => {
      if (!uniqueData[el[key]]) {
        uniqueData[el[key]] = "exists";
        filters.push({ text: el[key], value: el[key] });
      }
    });

    return filters;
  };

  return (
    <div>
      {statsStatus === "fetched" && (
        <Table
          columns={constructColumns(statsData.data[0])}
          dataSource={statsData.data}
        />
      )}
    </div>
  );
};

export default TableView;
