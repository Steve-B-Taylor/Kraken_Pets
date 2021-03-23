import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


const AnimalTile = (props) => {
    return(
        <div>
            <img className = "images" src={props.imgUrl}></img> 
            <Link to={`#`}>{props.name}</Link>
            {props.age}
            {props.vaccinationStatus}
        </div>
    )
}
export default AnimalTile