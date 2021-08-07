import { KuromojiToken } from './KuromojiAnalyzer'
import { hasHiragana, hasJapanese, isKana, toRawKatakana } from './util'

export class TokensPatcher {

  public patch(tokens: KuromojiToken[]): KuromojiToken[] {
    // patch for token structure
    for (let cr = 0; cr < tokens.length; cr++) {
      const currentToken = tokens[cr]
      if (hasJapanese(currentToken.surfaceForm)) {
        if (!currentToken.reading) {
          currentToken.reading = (this.tokenIsAllKana(currentToken))
           ? toRawKatakana(currentToken.surfaceForm)
           : currentToken.surfaceForm
        } else if (hasHiragana(currentToken.reading)) {
          currentToken.reading = toRawKatakana(currentToken.reading)
        }
      } else {
        currentToken.reading = currentToken.surfaceForm
      }
    }

    this.patchForLongU(tokens)
    this.patchForTsu(tokens)
    return tokens
  }

  private patchForLongU(tokens: KuromojiToken[]) {
    // patch for 助動詞"う" after 動詞
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i]
      const prevToken = tokens[i - 1]
      const isU = token.surfaceForm === 'う' || token.surfaceForm === 'ウ'
      if (token.position && token.position === '助動詞' && isU) {
        if (i - 1 >= 0 && prevToken.position && prevToken.position === '動詞') {
          prevToken.surfaceForm += 'う'
          if (prevToken.pronunciation) {
            prevToken.pronunciation += 'ー'
          } else {
            prevToken.pronunciation = `${prevToken.reading}ー`
          }
          prevToken.reading += 'ウ'
          tokens.splice(i, 1)
          i--
        }
      }
    }
  }

  private patchForTsu(tokens: KuromojiToken[]) {
    // patch for "っ" at the tail of 動詞、形容詞
    for (let j = 0; j < tokens.length; j++) {
      const token = tokens[j]
      const nextToken = tokens[j + 1]
      if (token.position && (token.position === '動詞' || token.position === '形容詞') && token.surfaceForm.length > 1 && (token.surfaceForm[token.surfaceForm.length - 1] === 'っ' || token.surfaceForm[token.surfaceForm.length - 1] === 'ッ')) {
        if (j + 1 < tokens.length) {
          token.surfaceForm += nextToken.surfaceForm
          if (token.pronunciation) {
            token.pronunciation += nextToken.pronunciation
          } else {
            token.pronunciation = `${token.reading}${nextToken.reading}`
          }
          token.reading += nextToken.reading
          tokens.splice(j + 1, 1)
          j--
        }
      }
    }
  }

  private tokenIsAllKana(currentToken: KuromojiToken) {
    return currentToken.surfaceForm.split('').every(isKana)
  }
}