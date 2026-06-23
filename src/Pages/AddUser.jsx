// src/Pages/AddUser.jsx

import { useState } from "react";
import api from "../Services/api";

function AddUser() {

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
                "/add-user",
                formData
            );

            alert(
                "User Added Successfully"
            );

            setFormData({
                name: "",
                email: "",
                password: "",
                role: "EMPLOYEE"
            });

        } catch(error) {

            console.log(error);

            alert("Failed");
        }
    };

    return (

        <div className="container mt-5">

            <div className="card p-4 shadow">

                <h2 className="mb-4">
                    Add User
                </h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="form-control mb-3"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="form-control mb-3"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="form-control mb-3"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <select
                        name="role"
                        className="form-control mb-3"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <option value="EMPLOYEE">
                            Employee
                        </option>

                        <option value="MANAGER">
                            Manager
                        </option>

                        <option value="ADMIN">
                            Admin
                        </option>
                    </select>

                    <button className="btn btn-primary">

                        Add User

                    </button>

                </form>

            </div>

        </div>
    );
}

export default AddUser;