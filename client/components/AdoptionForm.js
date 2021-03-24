import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import _ from "lodash"

import Error from "./Error"

const AdoptionForm = props => {
  const [newAdoption, setNewAdoption] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    homeStatus: ""
  })
  const [redirect, setRedirect] = useState(false)
  const [redirectId, setRedirectId] = useState(null)
  const [errors, setErrors] = useState([])

  const addNewApplication = async () => {
    let formPayload = newAdoption
    formPayload.petId = props.id
    try {
      const response = await fetch("/api/v1/application", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(formPayload)
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      } else {
        const body = await response.json()
        if (body) {
          setRedirect(true)
        }
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const isFormComplete = () => {
    let submitErrors = []
    const requiredFields = ["name", "phoneNumber", "email", "homeStatus"]
    // const dropDown = event.currentTarget
    requiredFields.forEach(field => {
      if (newAdoption[field].trim() === "") {
        submitErrors = {
          ...submitErrors,
          [field]: "is blank"
        }
      }
    })
    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }

  const handleChange = event => {
    setNewAdoption({
      ...newAdoption,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (isFormComplete()) {
      addNewApplication(newAdoption)
    }
  }

  if (redirect) {
    return <Redirect to="/adoptions" />
  }

  return (
    <form onSubmit={handleSubmit} className="adoption_app">
      <Error errors={errors} />
      <h1>Add a new Adoption Application</h1>
      <label htmlFor="name">
        Name
        <input id="name" type="text" name="name" onChange={handleChange} value={newAdoption.name} />
      </label>

      <label htmlFor="phoneNumber">
        Phone Number
        <input
          id="phoneNumber"
          type="text"
          name="phoneNumber"
          onChange={handleChange}
          value={newAdoption.phoneNumber}
        />
      </label>

      <label htmlFor="email">
        Email Address
        <input
          id="email"
          type="text"
          name="email"
          onChange={handleChange}
          value={newAdoption.email}
        />
      </label>

      <label htmlFor="homeStatus">
        Own or Rent?
        <select
          id="homeStatus"
          name="homeStatus"
          onChange={handleChange}
          value={newAdoption.homeStatus}
        >
          <option value=""></option>
          <option value="Own">Own</option>
          <option value="Rent">Rent</option>
        </select>
      </label>

      <input className="button round" type="submit" value="Apply" />
    </form>
  )
}

export default AdoptionForm
