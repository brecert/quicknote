import Knex from "knex";
import ana from "restana";
import sirv from "sirv";
import bodyParser from "body-parser";

import { html, render } from "ucontent";

import indexView from "./views/index.js";
import noteView from "./views/note.js";

const assets = sirv("public", {
  dev: true,
  maxAge: 31536000, // 1Y
  immutable: true,
});

const app = ana();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(assets);

const knex = Knex({
  client: "sqlite3",
  connection: {
    filename: "./.data/sqlite.db",
  },
  useNullAsDefault: true,
});

const redirect = (res, location) => {
  res.writeHead(302, { Location: location });
  res.end(`redirecting to ${location}`);
};

async function main() {
  // await knex.schema.dropTable("notes")
  if (!(await knex.schema.hasTable("notes"))) {
    await knex.schema.createTable("notes", function (table) {
      table.increments("id");
      table.string("note");
      table.string("name");
      table.integer("timestamp");
    });
  }

  app.get("/note/:id", async (req, res) => {
    const note = await knex("notes").where("id", req.params.id).first();
    render(res, noteView({ notes: [note] })).end();

    // res.send(noteView({ notes: [note] }), 200, {
    //   "Content-Type": "text/html; charset=utf-8",
    // });
  });

  app.post("/note", (req, res) => {
    if (req.body.name.length > 200) {
      throw `name length ${req.body.name.length} is greater than the maximum of 200`;
    }

    if (req.body.note.length > 5000) {
      throw `note length ${req.body.note.length} is greater than the maximum of 5000`;
    }

    knex("notes")
      .insert({
        name: req.body.name,
        note: req.body.note,
        timestamp: Date.now(),
      })
      .then((_) => redirect(res, "/"));
  });

  app.get("/notes", async (req, res) => {
    res.send(await knex("notes"));
  });

  app.get("/notes/:id", async (req, res) => {
    const note = await knex("notes").where("id", req.params.id).first();
    if (!note) {
      res.send(Error(`note ${req.params.id} does not exist`));
    }
    res.send(note);
  });

  app.get("/", async (req, res) => {
    const notes = await knex("notes");
    render(res, indexView({ notes: notes.reverse() })).end();
    // res.send(indexView({ notes: notes.reverse() }), 200, {
    //   "Content-Type": "text/html; charset=utf-8",
    // });
  });

  app
    .start()
    .then((server) => console.log(`listening on ${server.address().port}`));
}

main();
