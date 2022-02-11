import { retext } from "retext";
import retextCapitalization from "./index.js";

retext()
  .use(retextCapitalization)
  .process("Check out new relic.")
  .then((text) => {
    console.error(text.messages);
  });
