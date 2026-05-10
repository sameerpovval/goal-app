"use client";

import { useEffect, useState } from "react";

export default function Goals() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("https://goal-tracker-api.onrender.com/api/v1/goals", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("API Response:", data);

        // Check response structure
        if (Array.isArray(data)) {
          setGoals(data);
        } else if (Array.isArray(data.goals)) {
          setGoals(data.goals);
        } else if (Array.isArray(data.data)) {
          setGoals(data.data);
        } else {
          setGoals([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">My Goals</h2>

        <a href="/add-goals" className="btn btn-primary">
          Add Goal
        </a>
      </div>

      <div className="row">
        {goals.length > 0 ? (
          goals.map((goal) => (
            <div className="col-md-4 mb-4" key={goal._id}>
              <div className="card shadow border-0 h-100">
                <div className="card-body">
                  <h5 className="card-title fw-bold">
                    {goal.title}
                  </h5>

                  <p className="card-text text-muted">
                    {goal.description}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center mt-5">
            <h5>No Goals Found</h5>
          </div>
        )}
      </div>
    </div>
  );
}