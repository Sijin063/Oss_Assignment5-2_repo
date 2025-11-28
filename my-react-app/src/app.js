import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function App() {
  const apiUrl = "https://690cb56ea6d92d83e84f0e0c.mockapi.io/Player";

  const [players, setPlayers] = useState([]);
  const [modalData, setModalData] = useState({
    id: "",
    name: "",
    species: "",
    job: "",
    ability: "",
    item: ""
  });

  // Fetch players
  useEffect(() => {
    fetchPlayers();
  }, []);

  async function fetchPlayers() {
    const res = await fetch(apiUrl);
    const data = await res.json();
    setPlayers(data);
  }

  // Handle input change
  function handleChange(e) {
    setModalData({
      ...modalData,
      [e.target.id]: e.target.value
    });
  }

  // Open Add modal
  function openAddModal() {
    setModalData({
      id: "",
      name: "",
      species: "",
      job: "",
      ability: "",
      item: ""
    });
    document.getElementById("playerModalLive").showModal();
  }

  // Open Edit modal
  async function openEditModal(id) {
    const res = await fetch(`${apiUrl}/${id}`);
    const player = await res.json();

    setModalData(player);

    document.getElementById("playerModalLive").showModal();
  }

  // Save player (Add or Edit)
  async function handleSubmit(e) {
    e.preventDefault();

    const method = modalData.id ? "PUT" : "POST";
    const url = modalData.id ? `${apiUrl}/${modalData.id}` : apiUrl;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(modalData)
    });

    fetchPlayers();
    document.getElementById("playerModalLive").close();
  }

  // Delete
  async function deletePlayer(id) {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
      fetchPlayers();
    }
  }

  return (
    <div className="container">
      <h1>Player Sheet</h1>

      <div className="text-end mb-3">
        <button className="btn btn-success" onClick={openAddModal}>
          ➕ Add Player
        </button>
      </div>

      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Species</th>
            <th>Job</th>
            <th>Ability</th>
            <th>Item</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {players.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.species}</td>
              <td>{p.job}</td>
              <td>{p.ability}</td>
              <td>{p.item}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => openEditModal(p.id)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="btn btn-danger btn-sm ms-1"
                  onClick={() => deletePlayer(p.id)}
                >
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <dialog id="playerModalLive" className="modal-dialog">
        <form method="dialog" onSubmit={handleSubmit} className="modal-container">
          <h3>{modalData.id ? "Edit Player" : "Add Player"}</h3>

          <input type="hidden" id="id" value={modalData.id} />

          <label>Name</label>
          <input id="name" className="form-control" value={modalData.name} onChange={handleChange} required />

          <label>Species</label>
          <input id="species" className="form-control" value={modalData.species} onChange={handleChange} required />

          <label>Job</label>
          <input id="job" className="form-control" value={modalData.job} onChange={handleChange} required />

          <label>Ability</label>
          <input id="ability" className="form-control" value={modalData.ability} onChange={handleChange} required />

          <label>Item</label>
          <input id="item" className="form-control" value={modalData.item} onChange={handleChange} required />

          <div className="modal-footer mt-3">
            <button type="button" className="btn btn-secondary" onClick={() => document.getElementById("playerModalLive").close()}>
              Close
            </button>
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </form>
      </dialog>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
