import React from "react"
import { Link } from "react-router-dom"

const NavBar = () => {
  return (
    <div className = 'navBar'>
      <span>
        <Link to="/pets">Home</Link>
      </span>
      <span>
        <Link to="/pets/Leeches">Leeches</Link>
      </span>
      <span>
        <Link to="/pets/Red%20Garras">Red Garras</Link>
      </span>
      <span>
        <Link to="/adoptions/new">Surrender Your Pet</Link>
      </span>
    </div>
  )
}

export default NavBar
