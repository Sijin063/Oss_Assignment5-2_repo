import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const apiUrl = "https://690cb56ea6d92d83e84f0e0c.mockapi.io/Player";

export default function PlayerDetail() {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    fetch(`${apiUrl}/${id}`)
      .then(res => res.json())
      .then(setPlayer);
  }, [id]);

  if (!player) return <p>Loading...</p>;

  return (
    <div className="card">
      <div className="card-body">
        <h3>{player.name}</h3>
        <p><b>Species:</b> {player.species}</p>
        <p><b>Job:</b> {player.job}</p>
        <p><b>Ability:</b> {player.ability}</p>
        <p><b>Item:</b> {player.item}</p>

        <Link to="/" className="btn btn-secondary mt-3">Back</Link>
      </div>
    </div>
  );
}
