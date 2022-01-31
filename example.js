import { retext } from "retext";
import retextCapitalization from "./index.js";

retext()
  .use(retextCapitalization)
  .process(
    "this is some text ✨ with emojis 😂 sprinkled in 😏. What is the NerdGraph Plural of emoji anyway 🧐? 🤷🏽"
  )
  .then((text) => {
    console.error(text.messages);
  });
