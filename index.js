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
const url = 'https://docs.newrelic.com/docs/style-guide/capitalization/product-capability-feature-usage/#when-to-use-title-case'

export default function retextCapitalization() {
  return (tree, file) => {
    const treeValue = (tree) => {
      return tree
    }

    search(tree, list, (match, index, parent, phrase) => {
      const actual = toString(match)
      let expected = schema[phrase]

      // The search function performs a fuzzy search on the string in question
      // ignoring casing, apostrophes, etc. This is a check too make sure
      // this isn't a false positive due to casing.
      const isFalsePositive = () => {
        let output = false

        let testSubject = Array.isArray(expected) ? expected : [expected]

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
      }

      // TODO: If "Observability" is a part of an accepted phrase like
      // "Instant Observability" don't throw an error.

      if (actual === 'Observability') {
        // Make a new array that includes the word before "Observability"
        // and the word "Observability itself". Store it in `contextOfActual`
        let contextOfActual = parent.children.map((item, index, array) => {
            if (item === match[0]) {
                return [array[index -2], array[index -1], item]
            } else {
                return false
            }
        }).filter(item => item)[0]

        if (toString(contextOfActual) === 'Instant Observability') {
          return null
        }
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
        {actual, expected, url}
      )
    })
  };
}
