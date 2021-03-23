import pg from "pg"
import _ from "lodash"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/kraken_pets"
})

class PetType {
  constructor ( {id, type, description, imgUrl, img_url } ) {
    this.id = id
    this.type = type
    this.description = description
    this.imgUrl = imgUrl || img_url
  }

  static async findAll() {
    try {
      const client = await pool.connect()
      const result = await client.query("SELECT * FROM pet_types;")
      const animalTypes = result.rows.map(animal => new this(animal))
      client.release()
      return animalTypes
    } catch (error) {
      console.error(error)
      pool.end()
    }
  }

  static async findByType(type) {
    try {
      const client = await pool.connect()
      const result = await client.query("SELECT * FROM pet_types WHERE type = $1", [_.startCase(type)])
      const animalType = new this(result.rows[0])
      client.release()
      return animalType  
    } catch (error) {
      console.error(error)
      pool.end()
    }
  }
}

export default PetType