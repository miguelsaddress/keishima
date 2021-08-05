import { KuromojiParsedResponse } from '../analyzers/KuromojiAnalyzer'
import { hasHiragana, hasJapanese, isKana, toRawKatakana } from './util'

export class TokensPatcher {
  constructor(private tokens: KuromojiParsedResponse[]) {}

  public patch(): KuromojiParsedResponse[] {
    const tokens = [...this.tokens]
    // patch for token structure
    for (let cr = 0; cr < tokens.length; cr++) {
      const currentToken = tokens[cr]
      if (hasJapanese(currentToken.surface_form)) {
        if (!currentToken.reading) {
          const itsAllKana = currentToken.surface_form.split('').every(isKana)
          if (itsAllKana) {
            currentToken.reading = toRawKatakana(currentToken.surface_form)
          }
          else {
            currentToken.reading = currentToken.surface_form
          }
        }
        else if (hasHiragana(currentToken.reading)) {
          currentToken.reading = toRawKatakana(currentToken.reading)
        }
      }
      else {
        currentToken.reading = currentToken.surface_form
      }
    }

    // patch for 助動詞"う" after 動詞
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].pos && tokens[i].pos === '助動詞' && (tokens[i].surface_form === 'う' || tokens[i].surface_form === 'ウ')) {
        if (i - 1 >= 0 && tokens[i - 1].pos && tokens[i - 1].pos === '動詞') {
          tokens[i - 1].surface_form += 'う'
          if (tokens[i - 1].pronunciation) {
            tokens[i - 1].pronunciation += 'ー'
          }
          else {
            tokens[i - 1].pronunciation = `${tokens[i - 1].reading}ー`
          }
          tokens[i - 1].reading += 'ウ'
          tokens.splice(i, 1)
          i--
        }
      }
    }

    // patch for "っ" at the tail of 動詞、形容詞
    for (let j = 0; j < tokens.length; j++) {
      if (tokens[j].pos && (tokens[j].pos === '動詞' || tokens[j].pos === '形容詞') && tokens[j].surface_form.length > 1 && (tokens[j].surface_form[tokens[j].surface_form.length - 1] === 'っ' || tokens[j].surface_form[tokens[j].surface_form.length - 1] === 'ッ')) {
        if (j + 1 < tokens.length) {
          tokens[j].surface_form += tokens[j + 1].surface_form
          if (tokens[j].pronunciation) {
            tokens[j].pronunciation += tokens[j + 1].pronunciation
          }
          else {
            tokens[j].pronunciation = `${tokens[j].reading}${tokens[j + 1].reading}`
          }
          tokens[j].reading += tokens[j + 1].reading
          tokens.splice(j + 1, 1)
          j--
        }
      }
    }

    return tokens
  }
}