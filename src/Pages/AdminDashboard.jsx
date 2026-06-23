import { useEffect, useState } from "react";
import api from "../Services/api";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../Components/AdminNavbar.jsx";
function AdminDashboard() {

    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // eslint-disable-next-line react-hooks/immutability
        fetchStats();
        // eslint-disable-next-line react-hooks/immutability
        fetchUsers();
    }, []);
    const logout = () => {

        localStorage.removeItem("token");

        navigate("/");
    };

    const fetchStats = async () => {

        try {

            const response =
                await api.get("/admin/dashboard");

            setStats(response.data);

        } catch(error) {

            console.log(error);
        }
    };

    const fetchUsers = async () => {

        try {

            const response =
                await api.get("/admin/users");

            setUsers(response.data);

        } catch(error) {

            console.log(error);

            alert("Failed to load users");
        }
    };

    const changeRole = async (id, role) => {

        try {

            const response =
                await api.put(
                    `/admin/users/${id}/role?role=${role}`
                );

            alert(response.data);

            fetchUsers();

        } catch(error) {

            console.log(error);

            alert("Failed to update role");
        }
    };

    const deleteUser = async (id) => {

        if(!window.confirm("Delete this user?")){
            return;
        }

        try {

            const response =
                await api.delete(
                    `/admin/users/${id}`
                );

            alert(response.data);

            fetchUsers();

        } catch(error) {

            console.log(error);

            alert("Failed to delete user");
        }
    };

    if(!stats){
        return <h2>Loading...</h2>;
    }

    return (
        <>
            <AdminNavbar />
        <div className="container mt-5">

            <h1 className="text-center mb-4">
                Admin Dashboard
            </h1>

            {/* Dashboard Statistics */}

            <div className="row g-4 mb-5">

                <div className="col-md-3">

                    <div className="card shadow border-primary">

                        <div className="card-body text-center">

                            <h5>Total Employees</h5>

                            <h2>{stats.totalEmployees}</h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card shadow border-success">

                        <div className="card-body text-center">

                            <h5>Total Managers</h5>

                            <h2>{stats.totalManagers}</h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card shadow border-info">

                        <div className="card-body text-center">

                            <h5>Total Leaves</h5>

                            <h2>{stats.totalLeaves}</h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card shadow border-warning">

                        <div className="card-body text-center">

                            <h5>Pending Leaves</h5>

                            <h2>{stats.pendingLeaves}</h2>

                        </div>

                    </div>

                </div>

            </div>

            <div className="row g-4 mb-5">

                <div className="col-md-4">

                    <div className="card shadow border-success">

                        <div className="card-body text-center">

                            <h5>Approved Leaves</h5>

                            <h2>{stats.approvedLeaves}</h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card shadow border-danger">

                        <div className="card-body text-center">

                            <h5>Rejected Leaves</h5>

                            <h2>{stats.rejectedLeaves}</h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card shadow border-secondary">

                        <div className="card-body text-center">

                            <h5>Cancelled Leaves</h5>

                            <h2>{stats.cancelledLeaves}</h2>

                        </div>

                    </div>

                </div>

            </div>

            {/* User Management */}

            <div className="card shadow">

                <div className="card-body">

                    <h2 className="mb-4">
                        User Management
                    </h2>

                    <div className="table-responsive">

                        <table className="table table-striped table-hover table-bordered align-middle">

                            <thead className="table-dark">

                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Change Role</th>
                                <th>Delete</th>
                            </tr>

                            </thead>

                            <tbody>

                            {users.map((user) => (

                                <tr key={user.id}>

                                    <td>{user.id}</td>

                                    <td>{user.name}</td>

                                    <td>{user.email}</td>

                                    <td>

                                    <span
                                        className={
                                            user.role === "ADMIN"
                                                ? "badge bg-danger"
                                                : user.role === "MANAGER"
                                                    ? "badge bg-success"
                                                    : "badge bg-primary"
                                        }
                                    >
                                        {user.role}
                                    </span>

                                    </td>

                                    <td>

                                        <select
                                            className="form-select"
                                            value={user.role}
                                            onChange={(e) =>
                                                changeRole(
                                                    user.id,
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="EMPLOYEE">
                                                EMPLOYEE
                                            </option>

                                            <option value="MANAGER">
                                                MANAGER
                                            </option>

                                            <option value="ADMIN">
                                                ADMIN
                                            </option>

                                        </select>

                                    </td>

                                    <td>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() =>
                                                deleteUser(user.id)
                                            }
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>
        </div>
            </>
    );
}

export default AdminDashboard;