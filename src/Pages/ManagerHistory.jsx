import { useEffect, useState } from "react";
import api from "../services/api";
import ManagerNavbar from "../Components/ManagerNavbar.jsx";

function ManagerHistory() {

    const [leaves, setLeaves] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [status, setStatus] = useState("ALL");

    useEffect(() => {
        // eslint-disable-next-line react-hooks/immutability
        fetchHistory();
    }, [page]);

    const fetchHistory = async () => {

        try {

            const response = await api.get(
                `/manager/history?page=${page}&size=5`
            );


            setLeaves(response.data.content);
            // eslint-disable-next-line no-undef
            setTotalPages(response.data.totalPages);

        } catch(error) {

            console.log(error);

            alert("Failed to load history");
        }
    };

    return (
        <>
            <ManagerNavbar />
        <div className="container mt-5">

            <div className="card shadow">

                <div className="card-body">

                    <h2 className="text-center mb-4">
                        Manager Leave History
                    </h2>

                    <div className="table-responsive">

                        <table className="table table-striped table-hover table-bordered align-middle">

                            <thead className="table-dark">

                            <tr>
                                <th>ID</th>
                                <th>Employee</th>
                                <th>Leave Type</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Status</th>
                                <th>Remarks</th>
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

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="text-center text-muted"
                                    >
                                        No leave history found
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

export default ManagerHistory;