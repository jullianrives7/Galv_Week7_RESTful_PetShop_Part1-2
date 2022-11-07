//node pg docs: https://node-postgres.com/
//pg express docs: https://expressjs.com/en/guide/database-integration.html#postgresql
//express docs: https://devdocs.io/express/
//pg docs: https://www.postgresql.org/docs/

const express = require("express");
const app = express();
const PORT = 3000;
const { Client } = require("pg");
app.use(express.json());

const connectionString =
  "postgresql://postgres:docker@127.0.0.1:5432/petshop_db";
const client = new Client({
  connectionString: connectionString,
});
client.connect();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/pets", (req, res) => {
  client
    .query("SELECT * FROM pets")
    .then((result) => {
      console.log(result.rows[0]);
      res.send(result.rows);
    })
    .catch((e) => console.error(e.stack));
});

app.post("/api/pets/", (req, res) => {
  client
    .query(
      `INSERT INTO pets (age, kind, name) VALUES (${req.body.age}, '${req.body.kind}', '${req.body.name}')`
    )
    .then((result) => {
      console.log("Added new pet to table.");
      res.send(req.body);
    })
    .catch((e) => console.error(e.stack));
});

app.get("/api/pets/:id", (req, res, next) => {
  //using async/await
  async function getPetAtID() {
    try {
      const result = await client.query(
        `SELECT * FROM pets WHERE id = ${req.params.id}`
      );
      if (result.rows.length > 0) {
        res.send(result.rows);
      } else {
        res.status(404).sendStatus(404);
      }
    } catch (e) {
      console.error(e.stack);
    }
  }
  getPetAtID();
});

app.patch("/api/pets/:id", (req, res) => {
  client
    .query(
      `UPDATE pets SET name = '${req.body.name}' WHERE id = ${req.params.id}`
    )
    .then((result) => {
      console.log(
        `Updated name in id:${req.params.id} row to ${req.body.name}.`
      );
      res.send(req.body);
    })
    .catch((e) => console.error(e.stack));
});

app.delete("/api/pets/:id", (req, res) => {
  client
    .query(`DELETE FROM pets WHERE id = '${req.params.id}'`)
    .then((result) => {
      console.log(`Deleted id:${req.params.id} row.`);
      res.send("Row successfully removed.");
    })
    .catch((e) => console.error(e.stack));
});

app.get("/api/boom", (req, res) => {
  res.status(500).sendStatus(500);
});

app.use((req, res) => {
  res.status(404).sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`Our app running on ${PORT}`);
});
