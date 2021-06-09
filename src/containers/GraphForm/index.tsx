import React from "react";
import GraphView, { GraphViewProps } from "../../components/GraphView";
import { Form, Select, Button } from "antd";

const { Option } = Select;

const GraphForm = () => {
  const [formInput, setFormInput] = React.useState({
    graphMetric: "",
    graphSize: "",
  });
  const [graphs, setGraphs] = React.useState<GraphViewProps[]>([]);

  const handleChange = (e: any) => {
    console.log(e);
  };

  const handleFinish = () => {
    console.log("omg");
  };
  return (
    <div>
      <Form onFinish={handleFinish}>
        {" "}
        <Select
          placeholder="Choose a metric"
          style={{ width: 120 }}
          onChange={handleChange}
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
          onChange={handleChange}
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
      <div>
        {graphs.map((el) => {
          return (
            <GraphView graphMetric={el.graphMetric} graphSize={el.graphSize} />
          );
        })}
      </div>
    </div>
  );
};

export default GraphForm;
