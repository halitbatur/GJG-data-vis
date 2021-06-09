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
