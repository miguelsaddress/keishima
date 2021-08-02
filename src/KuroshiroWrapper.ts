const Kuroshiro = require('kuroshiro')
import { KuromojiAnalyzer } from './analyzers/KuromojiAnalyzer'

type ConvertOptions = {
  to?: 'hiragana' | 'katakana' | 'romaji'
  mode?: 'normal' | 'spaced' | 'okurigana' | 'furigana'
  romajiSystem?: 'nippon' | 'passport' | 'hepburn'
  delimiter_start?: string
  delimiter_end?: string
}

export class KuroshiroWrapper {
  private kuroshiro
  private analyzer

  private constructor() {
    this.kuroshiro = new Kuroshiro.default()
    this.analyzer = new KuromojiAnalyzer()
  }

  private async init(): Promise<this> {
    await this.kuroshiro.init(this.analyzer)
    return this
  }

  public static async create(): Promise<KuroshiroWrapper> {
    const instance = new KuroshiroWrapper()
    await instance.init()
    return instance
  }

  public async okurigana(str: string): Promise<string> {
    return this.convert(str, { mode: 'okurigana'})
  }

  public async furigana(str: string): Promise<string> {
    return this.convert(str, { mode: 'furigana' })
  }

  private async convert(str: string, convertOptions: ConvertOptions = {}): Promise<string> {
    const options = {
      to: 'hiragana',
      mode: 'normal',
      romajiSystem: 'hepburn',
      delimiter_start: '[',
      delimiter_end: ']',
      ...convertOptions
    }

    return this.kuroshiro.convert(str, options)
  }

}
