import { KuromojiParsedResponse } from '../../analyzers/KuromojiAnalyzer'
import { ConversionMode, ConvertOptions, Sillabary } from '../Kuroshiro'
import { RawRomajiConverter } from '../RawRomajiConverter'
import { getTextType, isKanji, isKatakana, TextType, toRawHiragana, toRawKatakana } from '../util'
import { Converter } from './Converter'

export class OkuriganaOrFuriganaConverter implements Converter {
  constructor(private options: ConvertOptions, private tokens: KuromojiParsedResponse[]) {}

  convert(): string {
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const notations: any[] = [] // [basic, basic_type[1=kanji,2=kana,3=others], notation, pronunciation]
    for (let i = 0; i < this.tokens.length; i++) {
      const currentToken = this.tokens[i]
      const strType: TextType = getTextType(currentToken.surface_form)
      switch (strType) {

      case TextType.PureKanji:
        notations.push([currentToken.surface_form, 1, toRawHiragana(currentToken.reading), currentToken.pronunciation || currentToken.reading])
        break
      case TextType.KanjiKanaMix:
        let pattern = ''
        let isLastTokenKanji = false
        const subs = [] // recognize kanjis and group them
        for (let c = 0; c < currentToken.surface_form.length; c++) {
          if (isKanji(currentToken.surface_form[c])) {
            if (!isLastTokenKanji) { // ignore successive kanji this.tokens (#10)
              isLastTokenKanji = true
              pattern += '(.+)'
              subs.push(currentToken.surface_form[c])
            }
            else {
              subs[subs.length - 1] += currentToken.surface_form[c]
            }
          }
          else {
            isLastTokenKanji = false
            subs.push(currentToken.surface_form[c])
            pattern += isKatakana(currentToken.surface_form[c]) ? toRawHiragana(currentToken.surface_form[c]) : currentToken.surface_form[c]
          }
        }
        const reg = new RegExp(`^${pattern}$`)
        const matches = reg.exec(toRawHiragana(currentToken.reading))
        if (matches) {
          let pickKanji = 1
          for (let c1 = 0; c1 < subs.length; c1++) {
            if (isKanji(subs[c1][0])) {
              notations.push([subs[c1], 1, matches[pickKanji], toRawKatakana(matches[pickKanji])])
              pickKanji += 1
            }
            else {
              notations.push([subs[c1], 2, toRawHiragana(subs[c1]), toRawKatakana(subs[c1])])
            }
          }
        }
        else {
          notations.push([currentToken.surface_form, 1, toRawHiragana(currentToken.reading), currentToken.pronunciation || currentToken.reading])
        }
        break
      case TextType.PureKana:
        for (let c2 = 0; c2 < currentToken.surface_form.length; c2++) {
          notations.push([currentToken.surface_form[c2], 2, toRawHiragana(currentToken.reading[c2]), (currentToken.pronunciation && currentToken.pronunciation[c2]) || currentToken.reading[c2]])
        }
        break
      case TextType.Others:
        for (let c3 = 0; c3 < currentToken.surface_form.length; c3++) {
          notations.push([currentToken.surface_form[c3], 3, currentToken.surface_form[c3], currentToken.surface_form[c3]])
        }
        break
      }
    }
    let result = ''
    switch (this.options.sillabary) {
    case Sillabary.Katakana:
      if (this.options.mode === ConversionMode.Okurigana) {
        for (let n0 = 0; n0 < notations.length; n0++) {
          if (notations[n0][1] !== 1) {
            result += notations[n0][0]
          }
          else {
            result += notations[n0][0] + this.options.delimiterOpen + toRawKatakana(notations[n0][2]) + this.options.delimiterClose
          }
        }
      }
      else { // furigana
        for (let n1 = 0; n1 < notations.length; n1++) {
          if (notations[n1][1] !== 1) {
            result += notations[n1][0]
          }
          else {
            result += `<ruby>${notations[n1][0]}<rp>${this.options.delimiterOpen}</rp><rt>${toRawKatakana(notations[n1][2])}</rt><rp>${this.options.delimiterClose}</rp></ruby>`
          }
        }
      }
      return result
    case Sillabary.Romaji:
      const rawRomajiConverter = new RawRomajiConverter()

      if (this.options.mode === ConversionMode.Okurigana) {
        for (let n2 = 0; n2 < notations.length; n2++) {
          if (notations[n2][1] !== 1) {
            result += notations[n2][0]
          }
          else {
            result += notations[n2][0] + this.options.delimiterOpen + rawRomajiConverter.convert(notations[n2][3], this.options.romajiSystem) + this.options.delimiterClose
          }
        }
      }
      else { // furigana
        result += '<ruby>'
        for (let n3 = 0; n3 < notations.length; n3++) {
          result += `${notations[n3][0]}<rp>${this.options.delimiterOpen}</rp><rt>${rawRomajiConverter.convert(notations[n3][3], this.options.romajiSystem)}</rt><rp>${this.options.delimiterClose}</rp>`
        }
        result += '</ruby>'
      }
      return result
    case Sillabary.Hiragana:
      if (this.options.mode === ConversionMode.Okurigana) {
        for (let n4 = 0; n4 < notations.length; n4++) {
          if (notations[n4][1] !== 1) {
            result += notations[n4][0]
          }
          else {
            result += notations[n4][0] + this.options.delimiterOpen + notations[n4][2] + this.options.delimiterClose
          }
        }
      }
      else { // furigana
        for (let n5 = 0; n5 < notations.length; n5++) {
          if (notations[n5][1] !== 1) {
            result += notations[n5][0]
          }
          else {
            result += `<ruby>${notations[n5][0]}<rp>${this.options.delimiterOpen}</rp><rt>${notations[n5][2]}</rt><rp>${this.options.delimiterClose}</rp></ruby>`
          }
        }
      }
      return result
    default:
      throw new Error('Invalid Target Syllabary.')
    }
  }
}