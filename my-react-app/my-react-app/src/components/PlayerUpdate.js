import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const apiUrl = "https://690cb56ea6d92d83e84f0e0c.mockapi.io/Player";

export default function PlayerUpdate() {
  const { id } = useParams();
  const [player, setPlayer] = useState({});
  const [count, setCount] = useState(0);
  const nameRef = useRef();

  useEffect(() => {
    fetch(`${apiUrl}/${id}`)
      .then(res => res.json())
      .then(setPlayer);
  }, [id]);

  async function handleChange(e) {
    const updated = { ...player, [e.target.name]: e.target.value };

    // validation
    if (nameRef.current.value === "") {
      alert("Name is required");
      nameRef.current.focus();
      return;
    }

    setPlayer(updated);
    setCount(count + 1);

    await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated)
    });
  }

  return (
    <div>
      <h3>Edit Player</h3>
      <p>🔄 수정 횟수: {count}</p>

      <input name="name" ref={nameRef} value={player.name || ""} onChange={handleChange} className="form-control" placeholder="Name" />
      <input name="species" value={player.species || ""} onChange={handleChange} className="form-control mt-2" />
      <input name="job" value={player.job || ""} onChange={handleChange} className="form-control mt-2" />
      <input name="ability" value={player.ability || ""} onChange={handleChange} className="form-control mt-2" />
      <input name="item" value={player.item || ""} onChange={handleChange} className="form-control mt-2" />
    </div>
  );
}
