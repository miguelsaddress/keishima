import { KuromojiParsedResponse } from '../../analyzers/KuromojiAnalyzer'
import { ConversionMode, ConvertOptions, Sillabary } from '../Kuroshiro'
import { RawRomajiConverter } from '../RawRomajiConverter'
import { hasJapanese, hasKanji, hasKatakana, isKanji, isKatakana, toRawHiragana } from '../util'
import { Converter } from './Converter'

export class NormalOrSpacedConverter implements Converter {
  constructor(private options: ConvertOptions, private tokens: KuromojiParsedResponse[]) {}

  public convert(): string {
    switch (this.options.sillabary) {
    case Sillabary.Katakana:
      if (this.options.mode === ConversionMode.Normal) {
        return this.tokens.map(token => token.reading).join('')
      }
      return this.tokens.map(token => token.reading).join(' ')
    case Sillabary.Romaji:
      const romajiConv = (token: KuromojiParsedResponse) => {
        let preToken
        if (hasJapanese(token.surface_form)) {
          preToken = token.pronunciation || token.reading
        }
        else {
          preToken = token.surface_form
        }
        const rawRomajiConverter = new RawRomajiConverter()
        return rawRomajiConverter.convert(preToken, this.options.romajiSystem!)
      }
      if (this.options.mode === ConversionMode.Normal) {
        return this.tokens.map(romajiConv).join('')
      }
      return this.tokens.map(romajiConv).join(' ')
    case Sillabary.Hiragana:
      for (let hi = 0; hi < this.tokens.length; hi++) {
        if (hasKanji(this.tokens[hi].surface_form)) {
          if (!hasKatakana(this.tokens[hi].surface_form)) {
            this.tokens[hi].reading = toRawHiragana(this.tokens[hi].reading)
          }
          else {
            // handle katakana-kanji-mixed tokens
            this.tokens[hi].reading = toRawHiragana(this.tokens[hi].reading)
            let tmp = ''
            let hpattern = ''
            for (let hc = 0; hc < this.tokens[hi].surface_form.length; hc++) {
              if (isKanji(this.tokens[hi].surface_form[hc])) {
                hpattern += '(.*)'
              }
              else {
                hpattern += isKatakana(this.tokens[hi].surface_form[hc]) ? toRawHiragana(this.tokens[hi].surface_form[hc]) : this.tokens[hi].surface_form[hc]
              }
            }
            const hreg = new RegExp(hpattern)
            const hmatches = hreg.exec(this.tokens[hi].reading)
            if (hmatches) {
              let pickKJ = 0
              for (let hc1 = 0; hc1 < this.tokens[hi].surface_form.length; hc1++) {
                if (isKanji(this.tokens[hi].surface_form[hc1])) {
                  tmp += hmatches[pickKJ + 1]
                  pickKJ++
                }
                else {
                  tmp += this.tokens[hi].surface_form[hc1]
                }
              }
              this.tokens[hi].reading = tmp
            }
          }
        }
        else {
          this.tokens[hi].reading = this.tokens[hi].surface_form
        }
      }
      if (this.options.mode === ConversionMode.Normal) {
        return this.tokens.map(token => token.reading).join('')
      }
      return this.tokens.map(token => token.reading).join(' ')
    default:
      throw new Error('Unknown option.to param')
    }

  }
}