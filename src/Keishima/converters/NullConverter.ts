import { KuromojiToken } from '../KuromojiAnalyzer'
import { ConvertOptions } from '../Keishima'
import { Converter } from './Converter'

export class NullConverter implements Converter {
  constructor(private options: ConvertOptions) {}

  public convert(_: KuromojiToken[]): string {
    return ''
  }
}