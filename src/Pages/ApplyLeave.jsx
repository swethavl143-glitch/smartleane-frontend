import { useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
function ApplyLeave() {

    const [leaveType, setLeaveType] = useState("CASUAL");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [reason, setReason] = useState("");

    const handleSubmit = async () => {

        try {

            const response = await api.post(
                "/leave/apply",
                {
                    leaveType,
                    startDate,
                    endDate,
                    reason
                }
            );

            alert(response.data);

            setLeaveType("CASUAL");
            setStartDate("");
            setEndDate("");
            setReason("");

        } catch(error) {

            console.log("FULL ERROR:", error);

            if(error.response){
                console.log("Status:", error.response.status);
                console.log("Data:", error.response.data);
            }

            alert("Failed to apply leave");
        }
    };

    return (
        <>
            <Navbar />
        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="card shadow">

                        <div className="card-body">

                            <h2 className="text-center mb-4">
                                Apply Leave
                            </h2>

                            <div className="mb-3">

                                <label className="form-label">
                                    Leave Type
                                </label>

                                <select
                                    className="form-select"
                                    value={leaveType}
                                    onChange={(e) =>
                                        setLeaveType(
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="CASUAL">
                                        Casual Leave
                                    </option>

                                    <option value="SICK">
                                        Sick Leave
                                    </option>

                                    <option value="EARNED">
                                        Earned Leave
                                    </option>

                                </select>

                            </div>

                            <div className="mb-3">

                                <label className="form-label">
                                    Start Date
                                </label>

                                <input
                                    type="date"
                                    className="form-control"
                                    value={startDate}
                                    onChange={(e) =>
                                        setStartDate(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">
                                    End Date
                                </label>

                                <input
                                    type="date"
                                    className="form-control"
                                    value={endDate}
                                    onChange={(e) =>
                                        setEndDate(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                            <div className="mb-4">

                                <label className="form-label">
                                    Reason
                                </label>

                                <textarea
                                    className="form-control"
                                    rows="4"
                                    placeholder="Enter Reason"
                                    value={reason}
                                    onChange={(e) =>
                                        setReason(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                            <button
                                className="btn btn-primary w-100"
                                onClick={handleSubmit}
                            >
                                Apply Leave
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
        </>
    );
}

export default ApplyLeave;