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
import { useEffect, useState } from "react";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const UsersLine = () => {
    const [cntUsers, setCntUsers] = useState([]);

    useEffect(() => {
        const getCountUsers = async () => {
            try {
                const response = await fetch("/api/admin/user/count", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log(data);
                setCntUsers(data.data || []);
            } catch (error) {
                console.error("Failed to fetch user count:", error);
            }
        };

        getCountUsers();
    }, []);

    const lineChartData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                data: cntUsers,
                label: "Users",
                borderColor: "#1ed760",
                backgroundColor: "rgba(30, 215, 96, 0.5)",
                fill: true,
                tension: 0.5,
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
                labels: {
                    color: "#fff",
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: "#fff",
                },
            },
            y: {
                ticks: {
                    color: "#fff",
                },
            },
        },
    };

    return <Line data={lineChartData} options={options} />;
};

export default UsersLine;