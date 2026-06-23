import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import ManagerNavbar from "../components/ManagerNavbar.jsx";


function ManagerDashboard() {

    const [leaves, setLeaves] = useState([]);
    const navigate = useNavigate();

    const fetchPendingLeaves = async () => {

        try {

            const response = await api.get(
                "/manager/pending"
            );

            setLeaves(response.data);

        } catch (error) {

            console.log("FULL ERROR:", error);

            if(error.response){
                console.log(error.response.data);
            }

            alert("Failed to load pending leaves");
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        void fetchPendingLeaves();
    }, []);
    const approveLeave = async (id) => {

        const remarks =
            prompt("Enter approval remarks");

        if (remarks === null) return;

        try {

            const response = await api.put(
                `/manager/approve/${id}`,
                {
                    remarks
                }
            );

            alert(response.data);

            await fetchPendingLeaves();

        } catch (error) {

            console.log(error);

            alert("Failed to approve leave");
        }
    };
    const logout = () => {

        localStorage.removeItem("token");

        navigate("/");
    };

    const rejectLeave = async (id) => {

        const remarks =
            prompt("Enter rejection remarks");

        if (remarks === null) return;

        try {

            const response = await api.put(
                `/manager/reject/${id}`,
                {
                    remarks
                }
            );

            alert(response.data);

            await fetchPendingLeaves();

        } catch (error) {

            console.log(error);

            alert("Failed to reject leave");
        }
    };

    return (
        <>
            <ManagerNavbar />
        <div className="container mt-5">

            <div className="card shadow">

                <div className="card-body">

                    <div className="d-flex justify-content-between align-items-center mb-4">

                        <h2>
                            Manager Dashboard
                        </h2>

                        <button
                            className="btn btn-primary"
                            onClick={() =>
                                navigate("/history")
                            }
                        >
                            Leave History
                        </button>

                    </div>

                    <h5 className="text-muted mb-3">
                        Pending Leave Requests
                    </h5>

                    <div className="table-responsive">

                        <table className="table table-striped table-hover table-bordered align-middle">

                            <thead className="table-dark">

                            <tr>
                                <th>ID</th>
                                <th>Employee</th>
                                <th>Leave Type</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Reason</th>
                                <th>Action</th>
                            </tr>

                            </thead>

                            <tbody>

                            {leaves.length > 0 ? (

                                leaves.map((leave) => (

                                    <tr key={leave.id}>

                                        <td>{leave.id}</td>

                                        <td>
                                            {leave.employeeName}
                                        </td>

                                        <td>

                                        <span className="badge bg-info text-dark">
                                            {leave.leaveType}
                                        </span>

                                        </td>

                                        <td>
                                            {leave.startDate}
                                        </td>

                                        <td>
                                            {leave.endDate}
                                        </td>

                                        <td>
                                            {leave.reason}
                                        </td>

                                        <td>

                                            <button
                                                className="btn btn-success btn-sm me-2"
                                                onClick={() =>
                                                    approveLeave(
                                                        leave.id
                                                    )
                                                }
                                            >
                                                Approve
                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() =>
                                                    rejectLeave(
                                                        leave.id
                                                    )
                                                }
                                            >
                                                Reject
                                            </button>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="text-center text-muted"
                                    >
                                        No pending leaves
                                    </td>

                                </tr>

                            )}

                            </tbody>

                        </table>


                    </div>

                </div>

            </div>



        </div>
        </>
    );

}

export default ManagerDashboard;