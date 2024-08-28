"use client";

import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { title } from "process";

Chart.register(CategoryScale);

export default function EventsBar({ eventsCount }: { eventsCount: {} }) {
  const labels = Object.keys(eventsCount);
  const values = Object.values(eventsCount);
  const data = {
    labels: labels,
    datasets: [
      {
        labels: "Months",
        data: values,
      },
    ],
  };
  return (
    <div className="bg-white rounded-lg mt-2 p-3 shadow-md md:w-[70%]">
      <Bar
        data={data}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Events organized by months",
            },
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              grid: {
                display: false,
              },
            },
          },
          backgroundColor: "rgba(0, 111, 238, 0.8)",
        }}
      ></Bar>
    </div>
  );
}
