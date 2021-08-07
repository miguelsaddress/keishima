import { KuromojiAnalyzer, KuromojiToken } from './KuromojiAnalyzer'
import { Converter } from './converters/Converter'
import { NullConverter } from './converters/NullConverter'
import { FuriganaConverter } from './converters/FuriganaConverter'
import { OkuriganaConverter } from './converters/OkuriganaConverter'
import { RomanizationSystem } from './converters/RawRomajiConverter'
import { TokensPatcher } from './TokensPatcher'
import { NormalConverter } from './converters/NormalConverter'
import { SpacedConverter } from './converters/SpacedConverter'

export enum Sillabary {
  Hiragana = 'hiragana',
  Katakana = 'katakana',
  Romaji = 'romaji'
}

export enum ConversionMode {
  Normal = 'normal',
  Spaced = 'spaced',
  Okurigana = 'okurigana',
  Furigana = 'furigana'
}

export type ConvertOptions = {
  sillabary: Sillabary
  mode: ConversionMode
  romajiSystem: RomanizationSystem
  delimiterOpen: string
  delimiterClose: string
}

export class Keishima {
  private analyzer: KuromojiAnalyzer

  constructor() {
    this.analyzer = new KuromojiAnalyzer()
  }

  async okurigana(str: string): Promise<string> {
    return this.convert(str, { mode: ConversionMode.Okurigana })
  }

  async furigana(str: string): Promise<string> {
    return this.convert(str, { mode: ConversionMode.Furigana })
  }

  /**
   * Convert given string to target syllabary with options available
  */
  async convert(str: string, conversionOptions?: Partial<ConvertOptions>): Promise<string> {
    const defaultOptions = {
      sillabary: Sillabary.Hiragana,
      mode: ConversionMode.Normal,
      romajiSystem: RomanizationSystem.Hepburn,
      delimiterOpen: '[',
      delimiterClose: ']'
    }

    const options = {
      ...defaultOptions,
      ...conversionOptions
    }

    const rawTokens: KuromojiToken[] = await this.analyzer.analyze(str)
    const tokens: KuromojiToken[] = new TokensPatcher().patch(rawTokens)

    const converter = this.getConverter(options)
    return converter.convert(tokens)
  }

  private getConverter(options: ConvertOptions): Converter {
    switch(options.mode) {
      case (ConversionMode.Normal):
        return new NormalConverter(options)
      case (ConversionMode.Spaced):
        return new SpacedConverter(options)
      case (ConversionMode.Okurigana):
        return new OkuriganaConverter(options)
      case (ConversionMode.Furigana):
        return new FuriganaConverter(options)
      default:
        return new NullConverter(options)
    }
  }
}
