import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const apiUrl = "https://690cb56ea6d92d83e84f0e0c.mockapi.io/Player";

export default function PlayerList() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(setPlayers);
  }, []);

  async function deletePlayer(id) {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
      setPlayers(players.filter(p => p.id !== id));
    }
  }

  return (
    <table className="table table-striped">
      <thead className="table-dark">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Job</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {players.map(p => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>
              <Link to={`/detail/${p.id}`}>{p.name}</Link>
            </td>
            <td>{p.job}</td>
            <td>
              <Link to={`/update/${p.id}`} className="btn btn-warning btn-sm me-1">Edit</Link>
              <button className="btn btn-danger btn-sm" onClick={() => deletePlayer(p.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
