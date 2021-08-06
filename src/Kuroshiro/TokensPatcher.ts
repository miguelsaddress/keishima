import { KuromojiToken } from '../analyzers/KuromojiAnalyzer'
import { hasHiragana, hasJapanese, isKana, toRawKatakana } from './util'

export class TokensPatcher {
  constructor(private tokens: KuromojiToken[]) {}

  public patch(): KuromojiToken[] {
    const tokens = [...this.tokens]
    // patch for token structure
    for (let cr = 0; cr < tokens.length; cr++) {
      const currentToken = tokens[cr]
      if (hasJapanese(currentToken.surfaceForm)) {
        if (!currentToken.reading) {
          const itsAllKana = currentToken.surfaceForm.split('').every(isKana)
          if (itsAllKana) {
            currentToken.reading = toRawKatakana(currentToken.surfaceForm)
          }
          else {
            currentToken.reading = currentToken.surfaceForm
          }
        }
        else if (hasHiragana(currentToken.reading)) {
          currentToken.reading = toRawKatakana(currentToken.reading)
        }
      }
      else {
        currentToken.reading = currentToken.surfaceForm
      }
    }

    // patch for 助動詞"う" after 動詞
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].position && tokens[i].position === '助動詞' && (tokens[i].surfaceForm === 'う' || tokens[i].surfaceForm === 'ウ')) {
        if (i - 1 >= 0 && tokens[i - 1].position && tokens[i - 1].position === '動詞') {
          tokens[i - 1].surfaceForm += 'う'
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
      if (tokens[j].position && (tokens[j].position === '動詞' || tokens[j].position === '形容詞') && tokens[j].surfaceForm.length > 1 && (tokens[j].surfaceForm[tokens[j].surfaceForm.length - 1] === 'っ' || tokens[j].surfaceForm[tokens[j].surfaceForm.length - 1] === 'ッ')) {
        if (j + 1 < tokens.length) {
          tokens[j].surfaceForm += tokens[j + 1].surfaceForm
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