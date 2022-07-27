import { retext } from "retext";
import retextPos from "retext-pos";
import retextCapitalization from "./index.js";

retext()
  .use(retextPos)
  .use(retextCapitalization)
  .process(
    `Prod_Americas - 10735481, Dev_Americas - 10735482, Prod_EU - 10735483, Dev_EU - 10735484`
  )
  .then((text) => {
    console.error(text.messages);
  });
