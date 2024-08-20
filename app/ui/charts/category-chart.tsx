"use client";

import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { title } from "process";

Chart.register(CategoryScale);

export default function CategoryChart({ categories }: { categories: {} }) {
  const labels = Object.keys(categories);
  const values = Object.values(categories);
  const data = {
    labels: labels,
    datasets: [
      {
        data: values,
      },
    ],
  };
  return (
    <div className="bg-white rounded-lg mt-2 p-3 shadow-md w-[50%]">
      <Pie
        data={data}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Events by categories",
            },
          },
        }}
      ></Pie>
    </div>
  );
}
