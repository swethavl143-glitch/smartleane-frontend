import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
function MyLeaves() {

    const [leaves, setLeaves] = useState([]);
    const [page, setPage] = useState(0);
    const [status, setStatus] = useState("ALL");

    const fetchLeaves = async () => {

        try {

            let response;

            if (status === "ALL") {

                response = await api.get(
                    `/leave/myleaves?page=${page}&size=5`
                );

            } else {

                response = await api.get(
                    `/leave/my-leaves/status?status=${status}&page=${page}&size=5`
                );
            }

            setLeaves(response.data.content);

        } catch (error) {

            console.log(error);

            alert("Failed to load leaves");
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, [page, status]);

    const cancelLeave = async (id) => {

        try {

            const response = await api.put(
                `/leave/cancel/${id}`
            );

            alert(response.data);

            fetchLeaves();

        } catch (error) {

            console.log(error);

            alert("Failed to cancel leave");
        }
    };

    return (
        <>
            <Navbar />
        <div className="container mt-5">

            <div className="card shadow">

                <div className="card-body">

                    <h2 className="text-center mb-4">
                        My Leaves
                    </h2>
                    <div className="mb-3">

                        <label className="form-label">
                            Filter By Status
                        </label>

                        <select
                            className="form-select"
                            value={status}
                            onChange={(e) => {

                                setStatus(e.target.value);

                                setPage(0);
                            }}
                        >

                            <option value="ALL">
                                All
                            </option>

                            <option value="PENDING">
                                Pending
                            </option>

                            <option value="APPROVED">
                                Approved
                            </option>

                            <option value="REJECTED">
                                Rejected
                            </option>

                            <option value="CANCELLED">
                                Cancelled
                            </option>

                        </select>

                    </div>

                    <div className="table-responsive">

                        <table className="table table-striped table-hover table-bordered align-middle">

                            <thead className="table-dark">

                            <tr>
                                <th>ID</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Reason</th>
                                <th>Status</th>
                                <th>Manager Remarks</th>
                                <th>Action</th>
                            </tr>

                            </thead>

                            <tbody>

                            {leaves.length > 0 ? (

                                leaves.map((leave) => (

                                    <tr key={leave.id}>

                                        <td>{leave.id}</td>

                                        <td>{leave.startDate}</td>

                                        <td>{leave.endDate}</td>

                                        <td>{leave.reason}</td>

                                        <td>

                                            {leave.status === "APPROVED" && (
                                                <span className="badge bg-success">
                                                    APPROVED
                                                </span>
                                            )}

                                            {leave.status === "REJECTED" && (
                                                <span className="badge bg-danger">
                                                    REJECTED
                                                </span>
                                            )}

                                            {leave.status === "PENDING" && (
                                                <span className="badge bg-warning text-dark">
                                                    PENDING
                                                </span>
                                            )}

                                            {leave.status === "CANCELLED" && (
                                                <span className="badge bg-secondary">
                                                    CANCELLED
                                                </span>
                                            )}

                                        </td>

                                        <td>

                                            {leave.managerRemarks ? (

                                                <span className="text-primary fw-semibold">
                                                    {leave.managerRemarks}
                                                </span>

                                            ) : (

                                                <span className="text-muted">
                                                    -
                                                </span>

                                            )}

                                        </td>

                                        <td>

                                            {leave.status === "PENDING" ? (

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() =>
                                                        cancelLeave(
                                                            leave.id
                                                        )
                                                    }
                                                >
                                                    Cancel
                                                </button>

                                            ) : (

                                                <span className="text-muted">
                                                    -
                                                </span>

                                            )}

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="text-center text-muted"
                                    >
                                        No leave requests found
                                    </td>

                                </tr>

                            )}

                            </tbody>

                        </table>

                    </div>
                    <div className="mt-3">

                        <button
                            className="btn btn-secondary me-2"
                            disabled={page === 0}
                            onClick={() => setPage(page - 1)}
                        >
                            Previous
                        </button>

                        <button
                            className="btn btn-primary"
                            onClick={() => setPage(page + 1)}
                        >
                            Next
                        </button>

                    </div>

                </div>

            </div>

        </div>
        </>
    );
}

export default MyLeaves;