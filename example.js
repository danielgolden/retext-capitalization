import { retext } from "retext";
import retextPos from "retext-pos";
import retextCapitalization from "./index.js";

retext()
  .use(retextPos)
  .use(retextCapitalization)
  .process(
    `The best NR1 feature is probably Dashboards or instant observability. 
    I really love new relic. I think Your New Dog Is Nice`
  )
  .then((text) => {
    console.error(text.messages);
  });
