import React from "react"
import { Link } from "react-router-dom"

const NavBar = () => {
  return (
    <div className="title-bar">
      <div className="top-bar-left">
        <ul className="menu">
          <li>
            <Link to="/pets">Home</Link>
          </li>
          <li>
            <Link to="/pets/Leeches">Leeches</Link>
          </li>
          <li>
            <Link to="/pets/Red%20Garras">Red Garras</Link>
          </li>
          <li>
            <Link to="/adoptions/new">Surrender Your Pet</Link>
          </li>
        </ul>
      </div>
      <div className="top-bar-right">
        <img className="logo" src="https://i.postimg.cc/pd6pngJD/logosmall.png"></img>
      </div>
    </div>
  )
}

export default NavBar
