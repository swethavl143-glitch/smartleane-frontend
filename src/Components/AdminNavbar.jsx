import { Link, useNavigate } from "react-router-dom";

function AdminNavbar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");
        navigate("/");
    };

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-danger">

            <div className="container">

                <Link
                    className="navbar-brand fw-bold"
                    to="/admin"
                >
                    SmartLeave Admin
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#adminNavbar"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="adminNavbar"
                >

                    <ul className="navbar-nav me-auto">

                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to="/admin"
                            >
                                Dashboard
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to="/admin/add-user"
                            >
                                Add User
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to="/admin/users"
                            >
                                Manage Users
                            </Link>
                        </li>

                    </ul>

                    <button
                        className="btn btn-outline-light"
                        onClick={logout}
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>
    );
}

export default AdminNavbar;