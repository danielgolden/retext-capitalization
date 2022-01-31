import { retext } from "retext";
import retextCapitalization from "./index.js";

retext()
  .use(retextCapitalization)
  .process("i want to watch a movie about Mars.")
  .then((text) => {
    console.error(text.messages);
  });
