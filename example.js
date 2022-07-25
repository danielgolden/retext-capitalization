import { retext } from "retext";
import retextPos from "retext-pos";
import retextCapitalization from "./index.js";

retext()
  .use(retextPos)
  .use(retextCapitalization)
  .process(`I know instant observability`)
  .then((text) => {
    console.error(text.messages);
  });
