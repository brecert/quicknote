import twas from "twas";
import { html } from "ucontent";

const indexView = ({ notes }) => html`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <title>QuickNote</title>
      <meta name="description" content="A simple public notes page" />
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" href="/variables.css" />
      <link rel="stylesheet" href="/style.css" />
      <link rel="stylesheet" href="/milligram.css" />
    </head>
    <body class="index">
      <header>
        <h1>QuickNote</h1>
        <strong class="subtitle">All notes are public.</strong>
      </header>

      <main>
        <form action="/note" method="post">
          <h2>Note Form</h2>
          <label for="name">Note Name: </label>
          <input
            name="name"
            aria-label="the notes name"
            type="text"
            maxlength="200"
            required
          />
          <br />
          <label for="note">Note Contents: </label>
          <textarea
            name="note"
            aria-label="a new note"
            type="text"
            maxlength="5000"
            required
          />
          <br />
          <button type="submit">Add Note</button>
        </form>
        <ul class="notes">
          <h2>Notes</h2>
          ${notes.map(
            (note) =>
              html`
                <li>
                  <article class="note-container">
                    <details>
                      <summary>
                        <span class="name"><b>${note.name}</b></span>
                        <a
                          href=${`/note/${note.id}`}
                          class="float-right timestamp"
                          ><small
                            ><time
                              datetime=${new Date(note.timestamp).toISOString()}
                              >${twas(note.timestamp)}</time
                            ></small
                          ></a
                        >
                      </summary>
                      <p class="note">${note.note}</p>
                    </details>
                  </article>
                </li>
              `
          )}
        </ul>
      </main>
    </body>
  </html>
`;

export default indexView;
