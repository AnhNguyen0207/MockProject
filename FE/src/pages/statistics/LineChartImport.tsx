import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const data = [
  {
    name: "Tháng 1",
    uv: 4000,
    pv: 2400,
    amt: 2400,
    soluong:300

  },
  {
    name: "Tháng 3",
    uv: 3000,
    pv: 1398,
    amt: 2210,
    soluong:300

  },
  {
    name: "Tháng 4",
    uv: 2000,
    pv: 9800,
    amt: 2290,
    soluong:2214

  },
  {
    name: "Tháng 5",
    uv: 2780,
    pv: 3908,
    amt: 2000,
    soluong:300

  },
  {
    name: "Tháng 6",
    uv: 1890,
    pv: 4800,
    amt: 2181,
    soluong:300

  },
  {
    name: "Tháng 7",
    uv: 2390,
    pv: 3800,
    amt: 2500,
    soluong:300

  },
  {
    name: "Tháng 8",
    uv: 3490,
    pv: 4300,
    amt: 2100,
    soluong:300

  },
  
  {
    name: "Tháng 9",
    uv: 3490,
    pv: 4300,
    amt: 2100,
    soluong:300
  },
  
  {
    name: "Tháng 10",
    uv: 3490,
    pv: 4300,
    amt: 2100,
    soluong:300

  },
  {
    name: "Tháng 11",
    uv: 3490,
    pv: 4300,
    amt: 2100,
    soluong:4000

  },
  {
    name: "Tháng 12",
    uv: 3490,
    pv: 4300,
    amt: 2100,
    soluong:100

  }
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const LineCharImport = (props: any) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        {...props}
        data={data}
        style={{ width: "100%" }}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#8884d8"
          activeDot={{ r: 12 }}
        />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        <Line type="monotone" dataKey="soluong" stroke="#82cb9d" />

      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineCharImport;
