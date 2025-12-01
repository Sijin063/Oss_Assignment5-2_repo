import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const apiUrl = "https://690cb56ea6d92d83e84f0e0c.mockapi.io/Player";

export default function PlayerForm() {
  const [data, setData] = useState({});
  const nameRef = useRef();
  const nav = useNavigate();

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // useRef validation
    if (!nameRef.current.value) {
      alert("Name is required");
      nameRef.current.focus();
      return;
    }

    await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    nav("/");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Player</h3>

      <input name="name" ref={nameRef} onChange={handleChange} className="form-control" placeholder="Name" />
      <input name="species" onChange={handleChange} className="form-control mt-2" placeholder="Species" />
      <input name="job" onChange={handleChange} className="form-control mt-2" placeholder="Job" />
      <input name="ability" onChange={handleChange} className="form-control mt-2" placeholder="Ability" />
      <input name="item" onChange={handleChange} className="form-control mt-2" placeholder="Item" />

      <button className="btn btn-success mt-3">Add</button>
    </form>
  );
}
