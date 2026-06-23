import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {

        console.log("Login button clicked");

        try {

            const response = await api.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );

            console.log("Response:", response.data);

            localStorage.setItem(
                "token",
                response.data.token
            );

            const role = response.data.role;

            if(role === "EMPLOYEE"){
                navigate("/employee");
            }
            else if(role === "MANAGER"){
                navigate("/manager");
            }
            else if(role === "ADMIN"){
                navigate("/admin");
            }

            alert("Login Successful");
            

        } catch (error) {

            console.log("Error:", error);

            if(error.response){
                console.log(error.response.data);
            }

            alert("Login Failed");
        }
    };

    return (
        <div
            className="container-fluid vh-100 d-flex justify-content-center align-items-center"
            style={{
                background:
                    "linear-gradient(to right, #667eea, #764ba2)"
            }}
        >

            <div
                className="card shadow p-4"
                style={{
                    width: "400px",
                    borderRadius: "15px"
                }}
            >

                <div className="text-center mb-4">

                    <h1 className="text-primary">
                        SmartLeave
                    </h1>

                    <p className="text-muted">
                        Leave Management System
                    </p>

                </div>

                <h4 className="text-center mb-4">
                    Login
                </h4>

                <div className="mb-3">

                    <label className="form-label">
                        Email
                    </label>

                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                </div>

                <div className="mb-4">

                    <label className="form-label">
                        Password
                    </label>

                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                </div>

                <button
                    className="btn btn-primary w-100"
                    onClick={handleLogin}
                >
                    Login
                </button>

            </div>

        </div>
    );
}

export default Login;