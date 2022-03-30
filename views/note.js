import twas from "twas";
import Note from "./_note.js";
import { html } from "ucontent";

const indexView = ({ notes }) => {
  notes.map((note) => (note.time = new Date(note.timestamp)));
  const firstNote = notes[0];
  return html`
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
        <meta property="twitter:description" content=${notes[0].note} />
        <meta property="og:title" content=${notes[0].name} />
        <meta property="og:description" content=${notes[0].note} />
        <meta
          property="og:site_name"
          content=${notes[0].time.toLocaleDateString()}
        />
      </head>
      <body>
        <main>
          <section class="notes large">
            ${notes.map((note) => Note({ note }))}
          </section>
        </main>
      </body>
    </html>
  `;
};

export default indexView;
