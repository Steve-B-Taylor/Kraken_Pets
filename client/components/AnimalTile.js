import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const AnimalTile = props => {
  let vaccinated
  if (props.vaccinationStatus) {
    vaccinated = "Yes"
  } else {
    vaccinated = "No"
  }

  return (
    <div>
      <Link to={`/pets/${props.type}/${props.id}`}>
        <img className="images" src={props.imgUrl}></img>
      </Link>
      <p>
        <Link to={`/pets/${props.type}/${props.id}`}>{props.name}</Link>
      </p>
      <p>Age: {props.age} months</p>
      <p>Vaccinated: {vaccinated}</p>
    </div>
  )
}
export default AnimalTile
