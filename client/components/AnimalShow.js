import React, { useState, useEffect } from "react"
import AdoptionForm from "./AdoptionForm.js"
import SuccessTile from "./SuccessTile.js"

const AnimalShow = props => {
  const [animal, setAnimal] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [afterSubmission, setAfterSubmission] = useState(false)

  const getAnimal = async () => {
    try {
      const animalId = props.match.params.id
      const animalType = props.match.params.type
      const response = await fetch(`/api/v1/pets/${animalType}/${animalId}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const responseBody = await response.json()
      setAnimal(responseBody.pet)
    } catch (err) {
      console.error(`Error in Fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    getAnimal()
  }, [])

  let vaccinated
  let vaccinatedSupplemental
  if (animal.vaccinationStatus) {
    vaccinated = "Yes"
  } else {
    vaccinated = "No"
  }
  if (props.match.params.type == "Leeches") {
    vaccinatedSupplemental = ` (If you're vaccinated, then ${animal.name} will be vaccinated too!)`
  }

  const showAdoptionForm = event => {
    event.preventDefault()
    setShowForm(true)
  }

  const handleWhatToShow = () => {
    setAfterSubmission(true)
  }

  let formDisplay = ""
  if (showForm) {
    formDisplay = <AdoptionForm id={props.match.params.id} handleWhatToShow={handleWhatToShow} />
  }

  let whatToShow
  if (afterSubmission) {
    whatToShow = <SuccessTile />
  } else {
    whatToShow = (
      <div>
        <button onClick={showAdoptionForm} className="button round">
          Adopt Me!
        </button>
        {formDisplay}
      </div>
    )
  }

  return (
    <div>
      <h1>{animal.name}'s Page</h1>
      <img className="images" src={animal.imgUrl}></img>
      <ul className="no-bullet">
        <li>Age: {animal.age} months old</li>
        <li>
          {animal.name}'s story: {animal.adoptionStory}
        </li>
        <li>
          Vaccination Status: {vaccinated} {vaccinatedSupplemental}
        </li>
      </ul>
      {whatToShow}
    </div>
  )
}

export default AnimalShow
