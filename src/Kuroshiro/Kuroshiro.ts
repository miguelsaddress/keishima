import { KuromojiAnalyzer, KuromojiParsedResponse } from '../analyzers/KuromojiAnalyzer'
import { Converter } from './converters/Converter'
import { NormalOrSpacedConverter } from './converters/NormalOrSpacedConverter'
import { NullConverter } from './converters/NullConverter'
import { OkuriganaOrFuriganaConverter } from './converters/OkuriganaOrFuriganaConverter'
import { RomanizationSystem } from './RawRomajiConverter'
import { TokensPatcher } from './TokensPatcher'

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

export class Kuroshiro {
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

    const rawTokens: KuromojiParsedResponse[] = await this.analyzer.analyze(str)
    const tokens: KuromojiParsedResponse[] = new TokensPatcher(rawTokens).patch()

    const converter = this.getConverter(options, tokens)
    return converter.convert()
  }

  private getConverter(options: ConvertOptions, tokens: KuromojiParsedResponse[]): Converter {
    if (options.mode === ConversionMode.Normal || options.mode === ConversionMode.Spaced) {
      return new NormalOrSpacedConverter(options, tokens)
    }
    else if (options.mode === ConversionMode.Okurigana || options.mode === ConversionMode.Furigana) {
      return new OkuriganaOrFuriganaConverter(options, tokens)
    }
    return new NullConverter(options, tokens)
  }
}
