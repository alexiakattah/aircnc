import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import api from "../../services/api";
import './styles.css'
import socketio from 'socket.io-client'

export default function Dashboard() {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    const user_id = localStorage.getItem("user");
    const socket = socketio('http://192.168.2.105:3333', {
      query: { user_id }
    })
    
    socket.on('bookin_request', data =>{
      console.log(data)
    })
  
  }, []);

  useEffect(() => {
    async function loadSpots() {
      const user_id = localStorage.getItem("user");
      const response = await api.get("/dashboard", {
        headers: { user_id }
      });
      setSpots(response.data);
    }
    loadSpots();
  }, []);

  return (
    <>
      <ul className="spot-list">
        {spots.map(spot => (
          <li key={spot._id}>
            <header style={{
              backgroundImage:`url(${spot.thumbnail_url})`
            }} />
            <strong>{spot.company}</strong>
            <span>{spot.price ? `R$${spot.price},00/dia` : `GRATUITO`}</span>
          </li>
        ))}
      </ul>

      <Link to="/new">
        <button className="btn">Cadastrar novo spot</button> 
      </Link>
    </>
  );
}
