import React from 'react'
import { Link } from 'react-router-dom'

const TypeTile = (props) => {
    const { type, description, img_url} = props.petType
    return (
        <div>
            <li><Link to={`/pets/${type}`}>{type}</Link></li>
            <li>{description}</li>
            <li><Link to={`/pets/${type}`}>{img_url}</Link></li>
        </div>
    )
}

export default TypeTile