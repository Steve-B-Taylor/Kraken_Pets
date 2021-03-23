import express from "express"
import PetType from '../../../models/PetType.js'

const petsRouter = new express.Router()

petsRouter.get("/", async (req, res) => {
  try {
    const pets = await PetType.findAll()
    return res.status(201).json({ pets: pets })
  } catch (error) {
    console.error(error)
    return res.status(500).json({error})
  }
})

petsRouter.get("/:type", async (req, res) => {
  try {
    const pet = await PetType.findByType(req.params.type)
    return res.status(200).json({ pet })
  } catch (error) {
    console.error(error)
    return res.status(500).json({errors})
  }
})

export default petsRouter
