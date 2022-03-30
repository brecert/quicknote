import twas from "twas";
import { html } from "ucontent";

export default ({ note }) => html`
  <article class="note-container">
    <p class="info">
      <span class="name"><b>${note.name}</b></span>
      <span class="float-right timestamp"
        ><small
          ><time datetime=${note.time.toISOString()}
            >${note.time.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}</time
          ></small
        ></span
      >
    </p>
    <p class="note">${note.note}</p>
  </article>
`;
