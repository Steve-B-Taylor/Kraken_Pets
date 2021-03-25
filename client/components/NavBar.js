import React from "react"
import { Link } from "react-router-dom"

const NavBar = () => {
  return (
    <div className = 'top-bar'>
      <ul className = "menu">
        <li><Link to="/pets">Home</Link></li>
        <li><Link to="/pets/Leeches">Leeches</Link></li>
        <li><Link to="/pets/Red%20Garras">Red Garras</Link></li>
        <li><Link to="/adoptions/new">Surrender Your Pet</Link></li>
      </ul>
    </div>
  )
}

export default NavBar
