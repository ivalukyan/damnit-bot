import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const UsersLine = () => {
    const lineChartData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                data: [0, 1, 10, 30],
                label: "Users",
                borderColor: "#3333ff",
                backgroundColor: "rgba(51, 51, 255, 0.5)",
                fill: true,
                tension: 0.5, // Updated (use 'tension' instead of 'lineTension')
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "Пользователи",
                font: {
                    size: 16,
                    weight: "bold",
                },
                color: "#fff",
            },
            legend: {
                display: true,
                position: "top",
            },
        },
    };

    return <Line data={lineChartData} options={options} />;
};

export default UsersLine;
