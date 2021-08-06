import { KuromojiToken } from '../../analyzers/KuromojiAnalyzer'
import { ConversionMode, ConvertOptions, Sillabary } from '../Kuroshiro'
import { RawRomajiConverter } from '../RawRomajiConverter'
import { hasJapanese, hasKanji, hasKatakana, isKanji, isKatakana, toRawHiragana } from '../util'
import { Converter } from './Converter'

export class NormalOrSpacedConverter implements Converter {
  private rawRomajiConverter: RawRomajiConverter
  private targetSillabary: Sillabary
  private conversionMode: ConversionMode

  constructor(private options: ConvertOptions) {
    this.rawRomajiConverter = new RawRomajiConverter()
    this.targetSillabary = options.sillabary
    this.conversionMode = options.mode
  }

  public convert(tokens: KuromojiToken[]): string {
    switch (this.targetSillabary) {
    case Sillabary.Katakana:
      return this.convertKatakana(tokens)
    case Sillabary.Romaji:
      return this.convertRomaji(tokens)
    case Sillabary.Hiragana:
      return this.convertHiragana(tokens)
    }
  }

  private joinKana(mappedTokens: string[]): string {
    if (this.conversionMode === ConversionMode.Normal) {
      return mappedTokens.join('')
    }
    return mappedTokens.join(' ')
  }

  private convertKatakana(tokens: KuromojiToken[]): string {
    return this.joinKana(tokens.map(token => token.reading))
  }

  private convertRomaji(tokens: KuromojiToken[]): string {
    const romajiConv = (token: KuromojiToken) => {
      let preToken = hasJapanese(token.surfaceForm)
        ? token.pronunciation || token.reading
        : token.surfaceForm

      return this.rawRomajiConverter.convert(preToken, this.options.romajiSystem!)
    }
    if (this.conversionMode === ConversionMode.Normal) {
      return tokens.map(romajiConv).join('')
    }
    return tokens.map(romajiConv).join(' ')
  }

  private convertHiragana(tokens: KuromojiToken[]): string {
    const convertedTokens = tokens.map(token => {
      const reading = hasKanji(token.surfaceForm)
        ? this.getReadingForKanaMixedWithKanji(token)
        : token.surfaceForm

      return { ...token, reading }
    })

    return this.joinKana(convertedTokens.map(token => token.reading))
  }

  private getReadingForKanaMixedWithKanji(currentToken: KuromojiToken): string {
    if (!hasKatakana(currentToken.surfaceForm)) {
      return toRawHiragana(currentToken.reading)
    }

    // handle katakana-kanji-mixed tokens
    const hiraganaReading = toRawHiragana(currentToken.reading)
    return this.replaceKanjiWithReading(currentToken.surfaceForm, hiraganaReading)
  }

  private getKanjiMatches(surfaceForm: string, tokenReading: string): RegExpExecArray | null {
    // from 
    // surfaceForm: ブラウン管
    // tokenReading: ぶらうんかん 
    // results in regex: ブラウン(.*)
    // matches [ 'ぶらうんかん', 'かん', index: 0, input: 'ぶらうんかん', groups: undefined ]
    const regexPattern = surfaceForm
      .split('')
      .map((piece: string) => {
        if (isKanji(piece)) {
          return '(.*)'
        }
        if (isKatakana(piece)) {
          return toRawHiragana(piece)
        }
        return piece
      }).join('')

    const regex = new RegExp(regexPattern)
    return regex.exec(tokenReading)
  }

  private replaceKanjiWithReading(surfaceForm: string, tokenReading: string): string {
    const kanjiMatches = this.getKanjiMatches(surfaceForm, tokenReading)

    if (!kanjiMatches) {
      return tokenReading
    }

    let kanjiMatchToUse = 1

    return surfaceForm.split('').map((currentChar: string) => {
      if (isKanji(currentChar)) {
        return kanjiMatches[kanjiMatchToUse++]
      }
      return currentChar
    }).join('')
  }
}