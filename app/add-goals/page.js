"use client";
import { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function AddGoal() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        "https://goal-tracker-api.onrender.com/api/v1/goals",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            description,
          }),
        }
      );

      const data = await res.json();

      console.log(data);

      if (res.ok) {
        Swal.fire({
          title: "Success!",
          text: "Goal added successfully",
          icon: "success",
          confirmButtonText: "OK",
        });

        router.push("/goals");

        setTitle("");
        setDescription("");
      } else {
        Swal.fire({
          title: "Error!",
          text: data.msg || "Something went wrong",
          icon: "error",
        });
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        title: "Error!",
        text: "Failed to connect server",
        icon: "error",
      });
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center mb-3">Add New Goal</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter goal title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Add Goal
          </button>
        </form>
      </div>
    </div>
  );
}