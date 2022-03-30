import twas from "twas";

const indexView = (html, { notes }) => html`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <title>QuickNote</title>
      <meta name="description" content="A cool thing made with Glitch" />
      <link
        id="favicon"
        rel="icon"
        href="https://glitch.com/edit/favicon-app.ico"
        type="image/x-icon"
      />
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" href="/normalize.css" />
      <link rel="stylesheet" href="/variables.css" />
      <link rel="stylesheet" href="/style.css" />
      <link rel="stylesheet" href="/milligram.css" />
    </head>
    <body>
      <header>
        <h1>QuickNote</h1>
        <strong class="subtitle">All notes are public.</strong>
      </header>

      <main>
        <section>
          <form action="/note" method="post">
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
        </section>
        <hr />
        <section class="notes">
          <h2>Notes: ${notes.length}</h2>
          ${notes.map(
            note =>
              html`
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
              `
          )}
        </section>
      </main>
      <footer>
        <hr />
        Made with <a href="https://glitch.com">Glitch</a>!
      </footer>

      <div
        class="glitchButton"
        style="position:fixed;top:20px;right:20px;"
      ></div>
      <script src="https://button.glitch.me/button.js"></script>
    </body>
  </html>
`;

export default indexView;
