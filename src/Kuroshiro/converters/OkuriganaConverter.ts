import { KuromojiToken } from '../../analyzers/KuromojiAnalyzer'
import { ConvertOptions, Sillabary } from '../Kuroshiro'
import { RawRomajiConverter } from './RawRomajiConverter'
import { toRawKatakana } from '../util'
import { Converter } from './Converter'
import { ElementType, Notation, TokenNotationsGenerator } from './TokenNotationsGenerator'

export class OkuriganaConverter implements Converter {
  constructor(private options: ConvertOptions) {}

  convert(tokens: KuromojiToken[]): string {
    const tokenNotationsGenerator = new TokenNotationsGenerator()
    const notation: Notation[] = tokens.reduce((ns: Notation[], currentToken) => {
      return ns.concat(tokenNotationsGenerator.getForToken(currentToken))
    }, [])

    return this.convertFromNotations(notation)
  }

  private convertFromNotations(notations: Notation[]) {
    switch (this.options.sillabary) {
    case Sillabary.Hiragana:
      return this.toOkurigana(notations, (n: Notation) => n.notation)
    case Sillabary.Katakana:
      return this.toOkurigana(notations, (n: Notation) => toRawKatakana(n.notation))
    case Sillabary.Romaji:
      const rawRomajiConverter = new RawRomajiConverter()
      return this.toOkurigana(notations, (n: Notation) => {
        return rawRomajiConverter.convert(n.pronunciation, this.options.romajiSystem)
      })
    }
  }

  private toOkurigana(notations: Notation[], notationConverter: (n: Notation) => string): string {
    return notations.reduce((result: string, notation: Notation) => {
      result += (notation.type !== ElementType.Kanji)
        ? notation.element
        : notation.element + this.options.delimiterOpen + notationConverter(notation) + this.options.delimiterClose

      return result
    }, '')
  }
}