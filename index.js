import { visit } from "unist-util-visit";
import { is, convert } from "unist-util-is";
import { pointStart, pointEnd } from "unist-util-position";
import exceptions from "./exceptions.js";

import {matchCasing} from 'match-casing'
import {search} from 'nlcst-search'
import {toString} from 'nlcst-to-string'
import {quotation} from 'quotation'
import {schema} from './schema.js'

const list = Object.keys(schema)
const source = "retext-capitalization";
const url = 'https://github.com/danielgolden/retext-capitalization#readme'

export default function retextCapitalization() {
  return (tree, file) => {
    // Check all capitalized words against a list of execptions
    // Recursively walk the syntaxt tree of the text
    // visit(tree, "ParagraphNode", (node) => {
    //   const sentences = node.children;
    //   let ruleId = "";

    //   // for each sentence
    //   sentences.forEach((sentence, index) => {
    //     // for each sentence child
    //     console.log(sentence);
    //     if (is(sentence, "SentenceNode")) {
    //       // store all WordNodes in an array
    //       const wordNodes = sentence.children.filter((sentenceChild) => {
    //         return is(sentenceChild, "WordNode");
    //       });

    //       // ==============================
    //       // Expects captialized first word
    //       // ==============================

    //       const firstWordNode = wordNodes[0];
    //       const firstWord = firstWordNode.children[0].value;
    //       console.log(firstWord);
    //       const firstWordFirstChar = firstWord.charAt(0);
    //       const firstWordIsCaptilized =
    //         firstWordFirstChar === firstWordFirstChar.toUpperCase();
    //       const firstWordCapitalized =
    //         firstWord.charAt(0).toUpperCase() + firstWord.slice(1);

    //       let actual = firstWord;
    //       let expected = [firstWordCapitalized];

    //       if (!firstWordIsCaptilized) {
    //         Object.assign(
    //           file.message(
    //             `Expected the first word in the sentence to be capitalized. Like "${firstWordCapitalized}", not "${actual}"`,
    //             {
    //               start: pointStart(firstWordNode),
    //               end: pointEnd(firstWordNode),
    //             },
    //             [source, firstWord].join(":")
    //           ),
    //           {
    //             actual,
    //             expected,
    //             note: "",
    //             url: "https://one-core.datanerd.us/foundation/design/writing/capitalization/",
    //           }
    //         );
    //       }

    //       // ===========================================
    //       // Expects only proper nouns to be capitalized
    //       // ===========================================

    //       wordNodes.forEach((wordNode, index) => {
    //         // Skip the first word
    //         if (index > 0) {
    //           const word = wordNode.children[0].value;
    //           const wordFirstChar = word.charAt(0);
    //           const wordIsCaptialized =
    //             wordFirstChar === wordFirstChar.toUpperCase();
    //           const wordLowerCased =
    //             word.charAt(0).toLowerCase() + word.slice(1);
    //           const wordIsSetInAllCaps = word === word.toUpperCase();

    //           actual = word;
    //           expected = [wordLowerCased];

    //           // if it's captialized and _not_ set in all caps.
    //           // This way we avoid providing feedback on acronyms
    //           if (wordIsCaptialized && !wordIsSetInAllCaps) {
    //             // because for some reason the array doesn't have
    //             // the normal array methods by default 🤔
    //             const myExceptions = [...exceptions];

    //             // is the word in the list of exceptions
    //             const wordIsException = myExceptions.some(
    //               (exception) => word === exception
    //             );

    //             // if the word isn't included in the exceptions list
    //             if (!wordIsException) {
    //               Object.assign(
    //                 file.message(
    //                   `Unless "${actual}" is a proper noun, it shouldn't be capitalized ("${wordLowerCased}")`,
    //                   {
    //                     start: pointStart(wordNode),
    //                     end: pointEnd(wordNode),
    //                   },
    //                   [source, actual].join(":")
    //                 ),
    //                 {
    //                   actual,
    //                   expected,
    //                   note: "",
    //                   url: "https://one-core.datanerd.us/foundation/design/writing/capitalization/",
    //                 }
    //               );
    //               // return file;
    //             }
    //           }
    //         }
    //       });
    //     }
    //   });
    // });

    search(tree, list, (match, _, _1, phrase) => {
      const actual = toString(match)
      let expected = [schema[phrase]]

      // The search function performs a fuzzy search on the string in question
      // ignoring casing, apostrophes, etc. This is a check too make sure
      // this isn't a false positive due to casing.
      const isFalsePositive = () => {
        let output = false

        let testSubject = typeof expected[0] === 'string' ? expected : expected[0]

        return testSubject.some((expectation) => {
          return expectation === actual
        })
      }
      
      // if it's a false positive, stop everything
      if (isFalsePositive()) {
        return
      }

      // exected always needs to be an array, so ensure that it is
      if (typeof expected === 'string') {
        expected = [expected]
      } else if (Array.isArray(expected)) {
        expected = expected[0]
      }


      Object.assign(
        file.message(
          'Replace ' +
            quotation(actual, '`') +
            ' with ' +
            quotation(expected, '`'),
          {start: pointStart(match[0]), end: pointEnd(match[match.length - 1])},
          [source, phrase.replace(/\s+/g, '-').toLowerCase()].join(':')
        ),
        {actual, expected: [...expected], url}
      )
    })
  };
}
