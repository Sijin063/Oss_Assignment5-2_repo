import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import PlayerList from "./components/PlayerList";
import PlayerDetail from "./components/PlayerDetail";
import PlayerUpdate from "./components/PlayerUpdate";
import PlayerForm from "./components/PlayerForm";

export default function App() {
  return (
    <div className="container">
      <h1>Player Sheet</h1>

      <nav className="mb-4 mt-3">
        <Link to="/" className="btn btn-primary me-3">List  </Link>
        <Link to="/create" className="btn btn-success">Create</Link>
      </nav>


      <Routes>
        <Route path="/" element={<PlayerList />} />
        <Route path="/list" element={<PlayerList />} />
        <Route path="/detail/:id" element={<PlayerDetail />} />
        <Route path="/update/:id" element={<PlayerUpdate />} />
        <Route path="/create" element={<PlayerForm />} />
      </Routes>
    </div>
  );
}
