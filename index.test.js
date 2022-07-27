import { retext } from "retext";
import retextPos from "retext-pos";
import exceptions from "./exceptions.js";
import retextCapitalization from "./index.js";

test("Throw warning for capitalized words that aren't proper nouns", () => {
  retext()
    .use(retextPos)
    .use(retextCapitalization)
    .process(`Italy has the Best pizza And cars.`)
    .then((text) => {
      expect(text.messages[0].actual).toStrictEqual("Best");
      expect(text.messages[1].actual).toStrictEqual("And");
    })
    .catch((error) => console.error(error.message));
});

test("Ignores words containing digits", () => {
  retext()
    .use(retextPos)
    .use(retextCapitalization)
    .process(`It's 2:41pm in America - 10735481`)
    .then((text) => {
      expect(text.messages).toStrictEqual([]);
    })
    .catch((error) => console.error(error.message));
});

test("Ignores capitalized words that are proper nouns", () => {
  retext()
    .use(retextPos)
    .use(retextCapitalization)
    .process(`I love Ford trucks.`)
    .then((text) => {
      expect(text.messages).toStrictEqual([]);
    })
    .catch((error) => console.error(error.message));
});

test("Throws warnings for New Relic lower cased proper nouns", () => {
  retext()
    .use(retextPos)
    .use(retextCapitalization)
    .process(`I'm familiar with instant observability.`)
    .then((text) => {
      expect(text.messages[0].actual).toStrictEqual("instant observability");
    })
    .catch((error) => console.error(error.message));
});

test("Ignores capitalized non proper nouns at the beginning of a sentence", () => {
  retext()
    .use(retextPos)
    .use(retextCapitalization)
    .process(`Application performance monitoring`)
    .then((text) => {
      expect(text.messages).toStrictEqual([]);
    })
    .catch((error) => console.error(error.message));
});

test("Ignores words from the list of exceptions", () => {
  retext()
    .use(retextPos)
    .use(retextCapitalization)
    .process(exceptions[55])
    .then((text) => {
      expect(text.messages).toStrictEqual([]);
    })
    .catch((error) => console.error(error.message));
});
