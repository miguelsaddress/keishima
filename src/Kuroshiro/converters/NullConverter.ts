import { KuromojiToken } from '../../analyzers/KuromojiAnalyzer'
import { ConvertOptions } from '../Kuroshiro'
import { Converter } from './Converter'

export class NullConverter implements Converter {
  constructor(private options: ConvertOptions) {}

  public convert(_: KuromojiToken[]): string {
    return ''
  }
}