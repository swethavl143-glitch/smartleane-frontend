import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Services/api";
import Navbar from "../Components/Navbar";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend
} from "recharts";
function EmployeeDashboard() {

    const navigate = useNavigate();
    const COLORS = [
        "#ffc107",
        "#198754",
        "#dc3545"
    ];
    const [stats, setStats] = useState({
        totalLeaves: 0,
        pendingLeaves: 0,
        approvedLeaves: 0,
        rejectedLeaves: 0
    });
    const chartData = [
        {
            name: "Pending",
            value: stats.pendingLeaves
        },
        {
            name: "Approved",
            value: stats.approvedLeaves
        },
        {
            name: "Rejected",
            value: stats.rejectedLeaves
        }
    ];



    useEffect(() => {
        // eslint-disable-next-line react-hooks/immutability
        fetchStats();
    }, []);

    const fetchStats = async () => {

        try {

            const response =
                await api.get(
                    "/leave/dashboard-stats"
                );

            setStats(response.data);

        } catch(error) {

            console.log(error);
        }
    };

    const logout = () => {

        localStorage.removeItem("token");

        navigate("/");
    };

    return (
        <>
            <Navbar />
        <div className="container mt-5">

            <h1 className="text-center mb-3">
                Employee Dashboard
            </h1>

            <h4 className="text-center text-muted mb-4">
                Welcome to SmartLeave
            </h4>

            <div className="row g-4 mb-5">

                <div className="col-md-3">
                    <div className="card shadow text-center">
                        <div className="card-body">
                            <h5 className="card-title">
                                Total Leaves
                            </h5>

                            <h2>
                                {stats.totalLeaves}
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow text-center">
                        <div className="card-body">
                            <h5 className="card-title">
                                Pending Leaves
                            </h5>

                            <h2>
                                {stats.pendingLeaves}
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow text-center">
                        <div className="card-body">
                            <h5 className="card-title">
                                Approved Leaves
                            </h5>

                            <h2>
                                {stats.approvedLeaves}
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow text-center">
                        <div className="card-body">
                            <h5 className="card-title">
                                Rejected Leaves
                            </h5>

                            <h2>
                                {stats.rejectedLeaves}
                            </h2>
                        </div>
                    </div>
                </div>

            </div>
            <h3 className="mt-5 text-center">
                Leave Distribution
            </h3>
            <div className="d-flex justify-content-center mt-4">

                <PieChart width={500} height={350}>

                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={120}
                        label
                    >
                        {chartData.map((entry, index) => (
                            <Cell
                                key={index}
                                fill={COLORS[index]}
                            />
                        ))}
                    </Pie>

                    <Tooltip />

                    <Legend />

                </PieChart>

            </div>

            <div className="d-flex justify-content-center gap-3 flex-wrap">

                <button
                    className="btn btn-primary"
                    onClick={() =>
                        navigate("/apply")
                    }
                >
                    Apply Leave
                </button>

                <button
                    className="btn btn-success"
                    onClick={() =>
                        navigate("/myleaves")
                    }
                >
                    My Leaves
                </button>

                <button
                    className="btn btn-warning"
                    onClick={() =>
                        navigate("/balance")
                    }
                >
                    Leave Balance
                </button>

                <button
                    className="btn btn-danger"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>

        </div>
            </>
    );
}

export default EmployeeDashboard;