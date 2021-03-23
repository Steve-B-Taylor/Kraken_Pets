import React from 'react'
import { Link } from 'react-router-dom'

const TypeTile = (props) => {
    const { type, description, imgUrl } = props.petType
    return (
        <div>
            <li><Link to={`/pets/${type}`}>{type}</Link></li>
            <li>{description}</li>
            <Link to={`/pets/${type}`}> <img className = "images" src={imgUrl}></img> </Link>

        </div >
    )
}

export default TypeTile