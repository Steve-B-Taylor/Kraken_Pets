import pg from "pg"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/kraken_pets"
})

class Seeder {
  static async seed() {
    try {
      await pool.query(
        "INSERT INTO pet_types (type, img_url, description) VALUES ('Leeches', 'https://i.postimg.cc/8c3FJq1q/Leeches.jpg', 'Your perfect friend for those detox cleanse types'), ('Red Garras', 'https://i.postimg.cc/jS65tW7V/Red-Garras.png', 'The perfect pedicure pal, or doctor fish to cure your skin-borne diseases!');"
      )
      await pool.query(
        "INSERT INTO adoptable_pets (name, img_url, age, vaccination_status, adoption_story, adoption_status, type_id ) VALUES ('Stan', 'https://postimg.cc/Vrs4PBXj', 3, 'false', 'Stan latched a ride home with a hiker while on holiday in the jungles of Costa Rica.  He likes to go for long walks in stagnant pools.  His favorite food is O+.', 'available', '1');"
      )
      await pool.query(
        "INSERT INTO adoptable_pets (name, img_url, age, vaccination_status, adoption_story, adoption_status, type_id ) VALUES ('Dora', 'https://postimg.cc/06vdsd7V', 13, 'false', 'Dora grew up right here in town and comes to us as a resuce leech.  She was a key member of the medical team who performed reconstructive surgery on a high-profile client.', 'available', '1');"
      )
      await pool.query(
        "INSERT INTO adoptable_pets (name, img_url, age, vaccination_status, adoption_story, adoption_status, type_id ) VALUES ('Larietta', 'https://postimg.cc/1fp8QxMZ', 4, 'false', 'Larietta and her 288 siblings were born at a local beauty parlor where she spent the first half of her life dedicated to the beauty industry.  She specializes in corn removal and loves to listen to classic jazz.', 'available', 2);"
      )
      await pool.query(
        "INSERT INTO adoptable_pets (name, img_url, age, vaccination_status, adoption_story, adoption_status, type_id ) VALUES ('Garry', 'https://postimg.cc/ZBC9tCsf', 7, 'false', 'Garry has led a long life as a workhorse contributer as a traveling pedicurist on the fashion model circuit.  His delicate touch and precision is unparalled in the parasitic removal industry.  And the stories he could tell...', 'available', 2);"
      )

      const result = await pool.query("SELECT * FROM adoptable_pets;")

      console.log(result.rows)

      pool.end()
    } catch (error) {
      console.log(error)
      pool.end()
    }
  }
}

export default Seeder
