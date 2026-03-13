import React from "react";
export default function UserCard({ user }) {
  // passing props , { user} so automatica props.user.name , email , company.name happesns

  return (
    <div
      style={{
        textAlign: "center",
        border: "1px solid #ddd",
        padding: "12px",
        marginBottom: "10px",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      {" "}
      <p>
        {" "}
        <strong>Name:</strong> {user.name}{" "}
      </p>{" "}
      <p>
        {" "}
        <strong>Email:</strong> {user.email}{" "}
      </p>{" "}
      <p>
        {" "}
        <strong>Company:</strong> {user.company.name}{" "}
      </p>{" "}
    </div>
  );
}
