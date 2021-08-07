import { KuromojiToken } from '../KuromojiAnalyzer'
import { getTextType, isKanji, isKatakana, TextType, toRawHiragana, toRawKatakana } from '../util'

export enum ElementType {
  Kanji = 1,
  Kana = 2,
  Others = 3
}

export type Notation = {
  element: string
  type: ElementType
  notation: string
  pronunciation: string
}

export class TokenNotationsGenerator {

  public getForToken(currentToken: KuromojiToken): Notation[] {
    const strType: TextType = getTextType(currentToken.surfaceForm)
    switch (strType) {
    case TextType.PureKanji:
      return this.getForPureKanji(currentToken)
    case TextType.KanjiKanaMix:
      return this.getForKanjiKanaMix(currentToken)
    case TextType.PureKana:
      return this.getForPureKana(currentToken)
    case TextType.Others:
      return this.getForOthers(currentToken)
    }
  }

  private getForPureKanji(currentToken: KuromojiToken): Notation[] {
    return [
      {
        element: currentToken.surfaceForm,
        type: ElementType.Kanji,
        notation: toRawHiragana(currentToken.reading),
        pronunciation: currentToken.pronunciation || currentToken.reading
      }
    ]
  }

  private getForKanjiKanaMix(currentToken: KuromojiToken): Notation[] {
    const { surfaceForm, reading, pronunciation } = currentToken
    const { subs, matches } = this.recognizeAndGroupKanji(currentToken)

    if (!matches) {
      return [
        {
          element: surfaceForm,
          type: ElementType.Kanji,
          notation: toRawHiragana(reading),
          pronunciation: pronunciation || reading
        }
      ]
    }

    let pickKanji = 1
    return subs.map((currentChar: string) => {
      // return isKanji(currentChar[0])
      return isKanji(currentChar)
        ? {
          element: currentChar,
          type: ElementType.Kanji,
          notation: matches[pickKanji],
          pronunciation: toRawKatakana(matches[pickKanji++])
        }
        : {
          element: currentChar,
          type: ElementType.Kana,
          notation: toRawHiragana(currentChar),
          pronunciation: toRawKatakana(currentChar)
        }
    })
  }

  private recognizeAndGroupKanji({ surfaceForm, reading }: KuromojiToken): { subs: string[]; matches: RegExpExecArray | null } {
    const subs = []
    let pattern = ''
    let isLastTokenKanji = false
    for (let c = 0; c < surfaceForm.length; c++) {
      const currentChar = surfaceForm[c]
      if (isKanji(currentChar)) {
        if (!isLastTokenKanji) { // ignore successive kanji tokens (#10)
          isLastTokenKanji = true
          pattern += '(.+)'
          subs.push(currentChar)
        } else {
          subs[subs.length - 1] += currentChar
        }
      } else {
        isLastTokenKanji = false
        subs.push(currentChar)
        pattern += isKatakana(currentChar) ? toRawHiragana(currentChar) : currentChar
      }
    }

    const reg = new RegExp(`^${pattern}$`)
    const matches = reg.exec(toRawHiragana(reading))

    return { subs, matches }
  }

  private getForPureKana(currentToken: KuromojiToken): Notation[] {
    const { surfaceForm, reading, pronunciation } = currentToken
    return surfaceForm.split('').map((_: string, index: number) => {
      return {
        element: surfaceForm[index],
        type: ElementType.Kana,
        notation: toRawHiragana(reading[index]),
        pronunciation: (pronunciation && pronunciation[index]) || reading[index]
      }
    })
  }

  private getForOthers({ surfaceForm }: KuromojiToken): Notation[] {
    return surfaceForm.split('').map((_: string, index: number) => {
      return {
        element: surfaceForm[index],
        type: ElementType.Others,
        notation: surfaceForm[index],
        pronunciation: surfaceForm[index]
      }
    })
  }
}