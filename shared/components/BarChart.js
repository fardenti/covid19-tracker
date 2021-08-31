import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ results }) => {
  const findValues = (countryName) =>
    results.find((e) => e.country === countryName);

  return (
    <div>
      <Bar
        data={{
          labels: ["UK", "USA"],
          datasets: [
            {
              label: "Number of Deaths",
              data: [findValues("UK").deaths, findValues("USA").deaths],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 99, 132, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 99, 132, 0.2)",
              ],
              borderWidth: 1,
            },
            {
              label: "Number of Cases",
              data: [findValues("UK").cases, findValues("USA").cases],
              backgroundColor: [
                "rgba(54, 162, 235, 0.2)",
                "rgba(54, 162, 235, 0.2)",
              ],
              borderColor: [
                "rgba(54, 162, 235, 0.2)",
                "rgba(54, 162, 235, 0.2)",
              ],
              borderWidth: 1,
            },
          ],
        }}
        height={400}
        width={400}
        options={{ maintainAspectRatio: false }}
      />
    </div>
  );
};

export default BarChart;
