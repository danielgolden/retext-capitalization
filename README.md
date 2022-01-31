# retext-capitalizations

A [retext](https://github.com/retextjs/retext) plugin to discourage the usage of emoji(s).

## Install

```sh
npm install retext-capitalizations
```

## Use

```js
import { retext } from "retext";
import retextCapitalization from "./index.js";

retext()
  .use(retextCapitalization)
  .process("This is some text ✨ with emojis 😂 sprinkled in 😏.")
  .then((text) => {
    console.error(text.messages);
  });
```

<!--
Yields:

```
  3:14-3:16  warning  Expected `1` space between sentences, not `2`  space  retext-sentence-spacing

⚠ 1 warning
``` -->
