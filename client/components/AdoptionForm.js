import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import _ from 'lodash'
import ErrorList from './ErrorList'


const AdoptionForm = (props) => {
  const [newAdoption, setNewAdoption] = useState({
    name = "",
    phoneNumber = "",
    email = "",
    homeStatus = "" 
    })
  const [redirect, setRedirect] = (false)
  const [redirectId, setRedirectId] = (null)

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
        throw(error)
        } 
           {
        const body = await response.json()
        if(body){
        setRedirectId(body.adoption.petId)
        setRedirect(true)
        }  
        }  
        } catch (error) {
        console.error(`Error in fetch: ${error.message}`)   
      }
  }

  const [errors, setErrors] = useState({})
 
  const isFormComplete = () => {
  let submitErrors = {}
  const requiredFields = ["name", "phoneNumber", "email", "homeStatus"]
  requiredFields.forEach((field) => {
    if (newAdoption[field] === "") {
      submitErrors = {
        ...submitErrors,
        [field]: "is blank"
      }
    }
  })
  setErrors(submitErrors)
  return _.isEmpty(submitErrors)
}

  const handleChange = (event) => {
    setNewAdoption({
      ...newAdoption,
      [event.currentTarget.name]: event.currentTarget.value
    })
    }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (isFormComplete())
    addNewApplication(newAdoption)
    }

  if (redirect) {
    return <Redirect to={`/pets/:type/${redirectId}`} />
  }

  return (
    <form onSubmit={handleSubmit} className="adoption_app">
      <ErrorList error={errors} />
<h1>Add a new Adoption Application</h1>
<label>
  <input 
  id="name"
  type="text"
  name="name"
  onChange={handleChange}
  value={newAdoption.name}
  />
</label>
<label>
  <input 
  id="phoneNumber"
  type="text"
  name="name"
  onChange={handleChange}
  value={newAdoption.phoneNumber}
  />
</label>
<label>
  <input 
  id="email"
  type="text"
  name="email"
  onChange={handleChange}
  value={newAdoption.email}
  />
</label>
<label>
<input 
  id="homeStatus"
  type="text"
  name="homeStatus"
  onChange={handleChange}
  value={newAdoption.homeStatus}
  />
</label>
<input type="submit" value="Apply" />
  </form>
    )
}

export default AdoptionForm

