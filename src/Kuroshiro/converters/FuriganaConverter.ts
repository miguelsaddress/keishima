import { KuromojiToken } from '../../analyzers/KuromojiAnalyzer'
import { ConvertOptions, Sillabary } from '../Kuroshiro'
import { RawRomajiConverter } from '../RawRomajiConverter'
import { toRawKatakana } from '../util'
import { Converter } from './Converter'
import { ElementType, Notation, TokenNotationsGenerator } from './TokenNotationsGenerator'

export class FuriganaConverter implements Converter {
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
        return this.toFurigana(notations, (n: Notation) => n.notation)
      case Sillabary.Katakana:
        return this.toFurigana(notations, (n: Notation) => toRawKatakana(n.notation))
      case Sillabary.Romaji:
        return this.toFuriganaRomaji(notations)
    }
  }

  private toFuriganaRomaji(notations: Notation[]): string {
    const rawRomajiConverter = new RawRomajiConverter()
    const { delimiterOpen, delimiterClose, romajiSystem } = this.options
    const pieces = notations.map(({ element, pronunciation }: Notation) => {
      const romajiPronunciation = rawRomajiConverter.convert(pronunciation, romajiSystem)
      return `${element}<rp>${delimiterOpen}</rp><rt>${romajiPronunciation}</rt><rp>${delimiterClose}</rp>`
    })
    return ['<ruby>', ...pieces, '</ruby>'].join('')
  }

  private toFurigana(notations: Notation[], notationConverter: (n: Notation) => string): string {
    const { delimiterOpen, delimiterClose } = this.options
    const pieces = notations.map((notation: Notation) => {
      return (notation.type !== ElementType.Kanji)
        ? notation.element
        : `<ruby>${notation.element}<rp>${delimiterOpen}</rp><rt>${notationConverter(notation)}</rt><rp>${delimiterClose}</rp></ruby>`
    })
    return pieces.join('')
  }
}