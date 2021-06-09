import React from "react";
import { MemoizedGraphView, GraphViewProps } from "../../components/GraphView";
import { Form, Select, Button } from "antd";

const { Option } = Select;

const GraphForm = () => {
  const [formInput, setFormInput] = React.useState<GraphViewProps>({
    graphMetric: "clicks",
    graphSize: "7",
  });
  const [graphs, setGraphs] = React.useState<GraphViewProps[]>([]);

  const handleChange = (e: any, inputType: string) => {
    setFormInput({ ...formInput, [inputType]: e });
  };

  const handleFinish = () => {
    setGraphs([...graphs, formInput]);
  };
  return (
    <div>
      <Form onFinish={handleFinish}>
        {" "}
        <Select
          placeholder="Choose a metric"
          style={{ width: 120, marginBottom: "25px" }}
          onChange={(e) => handleChange(e, "graphMetric")}
          value={formInput.graphMetric}
        >
          <Option value="clicks">Clicks</Option>
          <Option value="impressions">Impressions</Option>
          <Option value="installs">Installs</Option>
          <Option value="dau">Dau</Option>
          <Option value="revenue">Revenue</Option>
        </Select>
        <Select
          placeholder="Choose a metric"
          style={{ width: 120 }}
          onChange={(e) => handleChange(e, "graphSize")}
          value={formInput.graphSize}
        >
          <Option value="7">7 days</Option>
          <Option value="14">14 days</Option>
          <Option value="30">30 days</Option>
          <Option value="dau">All available data</Option>
        </Select>
        <Button type="primary" htmlType="submit">
          Add Graph
        </Button>
      </Form>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          columnGap: "10px",
          justifyContent: "center",
          rowGap: "25px",
        }}
      >
        {graphs.map((el) => {
          return (
            <MemoizedGraphView
              graphMetric={el.graphMetric}
              graphSize={el.graphSize}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GraphForm;
