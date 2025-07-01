import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";

const monthlyRevenue = [
  300, 400, 500, 600, 300, 400, 500, 600, 300, 400, 500, 600,
];

const monthlyProfit = [
  300 / 2,
  400 / 2,
  500 / 2,
  600 / 2,
  300 / 2,
  400 / 2,
  500 / 2,
  600 / 2,
  300 / 2,
  400 / 2,
  500 / 2,
  600 / 2,
];

const statistics = [
  {
    title: "Total Revenue",
    value: monthlyRevenue.reduce((prev, acc) => prev + acc),
  },
  {
    title: "Total Profit",
    value: monthlyProfit.reduce((prev, acc) => prev + acc),
  },
  {
    title: "Total Sold",
    value: "5",
  },
  {
    title: "Avg. Sale Duration",
    value: "15 days",
  },
];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const chartData = months.map((month, i) => ({
  name: month,
  revenue: monthlyRevenue[i],
  profit: monthlyProfit[i],
}));

function AnalyticsHeader() {
  return (
    <div className="analytics-header flex justify-between bg-white p-3 items-center rounded-lg">
      <h1 className="font-bold">Your analytics</h1>
    </div>
  );
}

export default function Analytics() {
  return (
    <div className="flex flex-col gap-5">
      <AnalyticsHeader />
      <div className="grid grid-cols-2 sm:grid-cols-4">
        {statistics.map((stat) => (
          <div key={`${stat.title}+${stat.value}`} className="statistic">
            <p className="w-full text-xs">{stat.title}</p>
            <p className="font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Monthly Revenue Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="font-semibold mb-2">Monthly Revenue</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#0096FF" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Trend Line Chart */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="font-semibold mb-2">Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#0096FF"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue vs Profit Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="font-semibold mb-2">Revenue vs Profit</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="revenue"
                fill="#0096FF"
                name="Revenue"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="profit"
                fill="#00C49F"
                name="Profit"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
