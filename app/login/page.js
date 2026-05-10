"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(
                "https://goal-tracker-api.onrender.com/api/v1/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );

            const data = await res.json();

            console.log(data);

            // LOGIN FAILED
            if (!res.ok) {
                alert(data.msg || "Login Failed");
                return;
            }

            // SAVE TOKEN
            localStorage.setItem("token", data.token);

            alert("Login Successful!");

            router.push("/goals");

        } catch (err) {
            console.log(err);
            alert("Something went wrong");
        }
    };

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow mx-auto" style={{ maxWidth: "400px" }}>
                <h2 className="text-center mb-4">Login</h2>

                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        className="form-control mb-3"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="form-control mb-3"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="btn btn-success w-100">
                        Login
                    </button>
                </form>

                <p className="text-center mt-3">
                    No account? <a href="/register">Register</a>
                </p>
            </div>
        </div>
    );
}