// src/Pages/Register.jsx

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../Services/api";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "EMPLOYEE"
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post(
                "/auth/register",
                formData
            );

            alert("Registration Successful");

            navigate("/");

        } catch (error) {

            console.log(error);

            alert("Registration Failed");
        }
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center vh-100"
            style={{
                background:
                    "linear-gradient(135deg,#667eea,#764ba2)"
            }}
        >
            <div className="card p-4 shadow" style={{ width: "400px" }}>

                <h2 className="text-center mb-4">
                    Register
                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label>Name</label>

                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label>Email</label>

                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label>Password</label>

                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label>Role</label>

                        <select
                            name="role"
                            className="form-control"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="EMPLOYEE">
                                Employee
                            </option>

                            <option value="MANAGER">
                                Manager
                            </option>
                        </select>
                    </div>

                    <button
                        className="btn btn-success w-100"
                    >
                        Register
                    </button>

                </form>

                <p className="mt-3 text-center">

                    Already have an account?

                    <Link to="/">
                        {" "}Login
                    </Link>

                </p>

            </div>
        </div>
    );
}

export default Register;