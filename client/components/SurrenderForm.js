import _ from "lodash"
import React, { useState } from "react"
import { Redirect } from "react-router-dom"

const SurrenderForm = props => {
  const [newSurrender, setNewSurrender] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    petName: "",
    petAge: "",
    petType: "",
    petImage: "",
    vaccinationStatus: ""
  })
  const [errors, setErrors] = useState([])
  const [redirect, setRedirect] = useState(false)

  const addNewSurrender = async () => {
    try {
      const response = await fetch("/api/v1/surrender", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(newSurrender)
      })
      if (!response.ok) {
        if (response.status === 422) {
          const data = await response.json()
          return setErrors(data.errors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
        }
      } else {
        const data = await response.Json()
        if (data) {
          setRedirect(true)
        }
      }
    } catch (error) {
      console.error(`Error in fetch: ${error}`)
    }
  }

  const handleInput = event => {
    setNewSurrender({
      ...newSurrender,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }
  const validateInput = () => {
    let submissionErrors = {}
    const requiredFields = [
      "name",
      "phoneNumber",
      "email",
      "petName",
      "petAge",
      "petType",
      "petImage",
      "vaccinationStatus"
    ]
    requiredFields.forEach(field => {
      if (newSurrender[field].trim() === "") {
        submissionErrors = { ...submissionErrors, [field]: `${_.capitalize(field)} is required` }
      }
    })
    setErrors(submissionErrors)
    return _.isEmpty(submissionErrors)
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (validateInput()) {
      addNewSurrender()
    }
  }

  if (redirect) {
    return <Redirect to="/adoptions" />
  }

  return (
    <div>
      <h1>Surrender Your Pet:</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Your Name:
          <input type="text" name="name" onChange={handleInput} value={newSurrender.name} />
        </label>

        <label>
          Phone:
          <input
            type="text"
            name="phoneNumber"
            onChange={handleInput}
            value={newSurrender.phoneNumber}
          />
        </label>

        <label>
          Email:
          <input type="text" name="email" onChange={handleInput} value={newSurrender.email} />
        </label>

        <label>
          Pets Name:
          <input type="text" name="petName" onChange={handleInput} value={newSurrender.petName} />
        </label>

        <label>
          Pets Age:
          <input type="text" name="petAge" onChange={handleInput} value={newSurrender.petAge} />
        </label>

        <label>
          Pet Type:
          <select defaultValue={newSurrender.petType} onChange={handleInput}>
            <option value={(newSurrender.petType = "")}></option>
            <option value={(newSurrender.petType = "Leeches")}>Leeches</option>
            <option value={(newSurrender.petType = "Red Garras")}>Red Garras</option>
          </select>
        </label>

        <label>
          Vaccinated?
          <select defaultValue={(newSurrender.vaccinationStatus = "")} onChange={handleInput}>
            <option value={(newSurrender.vaccinationStatus = "true")}>true</option>
            <option value={(newSurrender.vaccinationStatus = "false")}>false</option>
          </select>
        </label>

        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}
export default SurrenderForm
