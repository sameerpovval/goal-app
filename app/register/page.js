"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    // frontend validation
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(
        "https://goal-tracker-api.onrender.com/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      console.log(data);

      // check success
      if (res.ok) {
        alert("Registration Successful!");
        router.push("/login");
      } else {
        alert(data.msg || "Registration Failed");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <body className="bg-dark">


      <div className="container mt-5" style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >


        <div style={{ background: "#898894", height: "400px", width: "400px", }}>
          <div style={{ margin: "10px", marginTop: "100px" }}>


            <form onSubmit={handleRegister} className="m-4">

              <input
                type="email"
                placeholder="Email"
                className="form-control mb-3 border-0"

                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="Password"
                className="form-control mb-3 border-0"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </form>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", color: "white", margin: "20px" }}>
            <div>remember me </div>
            <div> forget password </div>
          </div>
          <div className="p-4">
            <button style={{ background: "green", width: "100%", padding: "20px" }}>
              Login
            </button>
          </div>

        </div>






        {/* <div
        className="card p-4 shadow mx-auto"
        style={{
          maxWidth: "400px",
          borderRadius: "15px",
          background:"black",
        }}
      >
        <h2 className="text-center mb-4 text-white">Register</h2>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Name"
            className="form-control mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="form-control mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="form-control mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn btn-primary w-100">
            Register
          </button>
        </form>

        <p className="text-center mt-3">
          Already have account? <a href="/login">Login</a>
        </p>
      </div> */}
      </div>
    </body>
  );
}